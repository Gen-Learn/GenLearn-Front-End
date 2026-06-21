import React, { useEffect, useState } from "react";
import { Upload, FileText, X, CheckCircle2, Loader2, AlertCircle, RefreshCw, Sparkles } from "lucide-react";
import axiosInstance from "../../services/axios";
import { buildGeneratedFileUrl } from "../../services/generateService";
import { connectToGenerationSocket, disconnectSocket } from "../../services/socket";
import { useNotification } from "@/contexts/NotificationContext";
import { Link } from "react-router-dom";
type UploadedFileEntry = {
  id: number;
  file: File;
  name: string;
  size: string;
};

const statusLabel = (status: string | null) => {
  if (!status) return "Not started";
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Math.round(bytes / Math.pow(k, i))} ${sizes[i]}`;
};

/**
 * Submits all files to /api/v1/generate/test via axiosInstance so it
 * inherits the base URL and Authorization interceptor automatically.
 */
async function submitToGenerateEndpoint(
  files: File[],
  onProgress: (pct: number) => void
): Promise<unknown> {
  const formData = new FormData();
  files.forEach((file) => formData.append("file", file));

  const { data } = await axiosInstance.post("/api/v1/generate/test", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      if (e.total) {
        onProgress(Math.round((e.loaded / e.total) * 95));
      }
    },
  });

  onProgress(100);
  return data;
}

export default function Generate() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileEntry[]>([]);
  const [jobId, setJobId] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Real-time job updates via WebSocket (socket.io)
  const { addNotification } = useNotification();

  React.useEffect(() => {
    if (!jobId) return;

    const socket = connectToGenerationSocket(jobId, {
      onJoined: (payload) => {
        // optional: update status from server payload
        const status = payload?.status || payload?.jobStatus;
        if (status) setJobStatus(String(status).toLowerCase());
      },
      onCompleted: (payload) => {
        const remoteUrl = payload?.downloadUrl || payload?.downloadUrl || payload?.fileName || payload?.filename || payload?.fileName;
        setJobStatus("completed");
        if (remoteUrl) setDownloadUrl(remoteUrl as string);
        else if (payload?.fileName) setDownloadUrl(buildGeneratedFileUrl(String(payload.fileName)));

        addNotification({
          title: "Generation complete",
          message: "Your course generation is finished and ready to download.",
          courseId: payload?.downloadUrl as string | undefined,
        });
      },
      onFailed: (payload) => {
        setJobStatus("failed");
        if (payload?.message) setError(String(payload.message));
      },
    });

    return () => {
      disconnectSocket();
    };
  }, [jobId, addNotification]);

  const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) return error.message;
    return "An unexpected error occurred.";
  };

  // ─── Drag & drop ─────────────────────────────────────────────────────────────
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(Array.from(e.dataTransfer.files));
  };
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(Array.from(e.target.files || []));
    e.target.value = "";
  };

  const handleFiles = (files: File[]) => {
    const newEntries: UploadedFileEntry[] = files.map((file, index) => ({
      id: Date.now() + index,
      file,
      name: file.name,
      size: formatFileSize(file.size),
    }));
    setUploadedFiles((prev) => [...prev, ...newEntries]);
  };

  const removeFile = (id: number) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // ─── Generate ────────────────────────────────────────────────────────────────
  const handleGenerateCourse = async () => {
    if (uploadedFiles.length === 0) {
      setError("Please add at least one file before generating.");
      return;
    }

    setError(null);
    setIsSubmitting(true);
    setUploadProgress(0);
    setDownloadUrl(null);
    setJobStatus(null);
    setJobId(null);

    try {
      const data = await submitToGenerateEndpoint(
        uploadedFiles.map((e) => e.file),
        setUploadProgress
      ) as Record<string, unknown>;

      // Response: { statusCode: 202, data: { jobId, status, resourceId } }
      const responseData = (data as any)?.data ?? data;
      const id = responseData?.jobId;
      const status = responseData?.status;

      if (!id) throw new Error("No job ID returned from the server.");

      setJobId(id.toString());
      setJobStatus(status ? status.toString().toLowerCase() : "pending");
    } catch (err) {
      setError(getErrorMessage(err));
      setUploadProgress(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearAll = () => {
    setJobId(null);
    setJobStatus(null);
    setDownloadUrl(null);
    setError(null);
    setUploadProgress(0);
  };

  const isJobDone = jobStatus ? ["completed", "done", "success"].includes(jobStatus) : false;
  const isJobFailed = jobStatus ? ["failed", "error", "cancelled"].includes(jobStatus) : false;
  const isJobRunning = jobStatus && !isJobDone && !isJobFailed;

  return (
    <div className="min-h-screen bg-gray-50 max-w-4xl mx-auto">
      {/* ── Header ── */}
      <div className="px-6 py-5">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-gray-900 leading-none">
              Course Generator
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Upload documents · AI builds your course
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">

        {/* ── Drop zone ── */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative rounded-2xl border-2 border-dashed transition-all duration-200
            ${isDragging
              ? "border-violet-500 bg-violet-50 scale-[1.01]"
              : "border-gray-200 bg-white hover:border-violet-300 hover:bg-violet-50/40"
            }
          `}
        >
          <label className="flex flex-col items-center gap-3 py-12 px-6 cursor-pointer">
            <div className={`
              w-14 h-14 rounded-2xl flex items-center justify-center transition-colors
              ${isDragging ? "bg-violet-100" : "bg-gray-100"}
            `}>
              <Upload className={`w-6 h-6 transition-colors ${isDragging ? "text-violet-600" : "text-gray-500"}`} />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-800">Drop your files here</p>
              <p className="text-xs text-gray-500 mt-1">
                or{" "}
                <span className="text-violet-600 font-medium">browse to upload</span>
                {" "}· PDF, DOCX, TXT
              </p>
            </div>
            <input
              type="file"
              multiple
              onChange={handleFileInput}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
            />
          </label>
        </div>

        {/* ── File list ── */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-700">Files</h2>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5">
                <CheckCircle2 className="w-3 h-3" />
                {uploadedFiles.length} ready
              </span>
            </div>
            <div className="space-y-2">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="bg-white border border-emerald-100 rounded-xl p-3.5 flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                    <p className="text-xs text-gray-400">{file.size}</p>
                  </div>
                  <button
                    onClick={() => removeFile(file.id)}
                    disabled={isSubmitting}
                    className="text-gray-300 hover:text-gray-500 transition-colors p-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Remove file"
                  >
                    <X size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Generate button ── */}
        <div className="pt-2 space-y-3">
          <button
            type="button"
            onClick={handleGenerateCourse}
            disabled={isSubmitting || uploadedFiles.length === 0}
            className={`
              w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl
              text-sm font-semibold text-white transition-all duration-200
              ${uploadedFiles.length > 0 && !isSubmitting
                ? "bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-90 shadow-sm hover:shadow-md active:scale-[0.99]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {uploadProgress < 100 ? "Uploading…" : "Generating…"}
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Course
              </>
            )}
          </button>

          {/* Upload progress bar */}
          {isSubmitting && (
            <div className="space-y-1.5">
              <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-400">
                  {uploadProgress < 95
                    ? "Uploading files to server…"
                    : uploadProgress < 100
                    ? "Finalizing upload…"
                    : "Files received — generating course…"}
                </p>
                <p className="text-xs font-medium text-gray-500 tabular-nums">
                  {uploadProgress}%
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── Error ── */}
        {error && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* ── Job status card ── */}
        {(jobId || jobStatus || downloadUrl) && (
          <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
            {jobStatus && (
              <div className="flex items-center justify-between">
                {downloadUrl && (
              <Link
                to={downloadUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Open Generated Course
              </Link>
            )}
                <span className={`
                  inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full
                  ${isJobDone ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : ""}
                  ${isJobFailed ? "bg-red-50 text-red-700 border border-red-200" : ""}
                  ${isJobRunning ? "bg-violet-50 text-violet-700 border border-violet-200" : ""}
                `}>
                  {isJobRunning && <Loader2 className="w-3 h-3 animate-spin" />}
                  {isJobDone && <CheckCircle2 className="w-3 h-3" />}
                  {isJobFailed && <AlertCircle className="w-3 h-3" />}
                  {statusLabel(jobStatus)}
                </span>
              </div>
            )}

            {jobId && (
              <div>
                <p className="text-xs font-mono text-gray-600 bg-gray-50 rounded-lg px-3 py-2 break-all text-center">
                  course is being generated wait a moment, we will notify you when it's ready
                </p>
              </div>
            )}
            <div className="flex gap-2 pt-1">

              <button
                type="button"
                onClick={clearAll}
                className="flex-1 inline-flex justify-center items-center text-xs font-medium text-gray-500 border border-gray-200 bg-white hover:bg-gray-50 rounded-lg py-2 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
