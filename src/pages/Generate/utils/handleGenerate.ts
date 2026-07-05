import { useState, useCallback } from 'react';
import { submitGenerateJob, buildGeneratedFileUrl } from '@/services/generateService';
import { useNotification } from '@/contexts/NotificationContext';
import { useGenerationSocket, type SocketStatus } from '@/hooks/useGenerationSocket';

// Local phase before a jobId exists — the socket hook takes over
// (and drives `processingStage`) as soon as a jobId is assigned.
type UploadPhase = 'idle' | 'uploading' | 'error';

// The single unified status the whole page renders off of.
export type ProcessingStage = UploadPhase | SocketStatus;

const handleGenerate = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [courseId, setCourseId] = useState<string | null>(null);
  const [courseName, setCourseName] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadPhase, setUploadPhase] = useState<UploadPhase>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [jobId, setJobId] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { addNotification, setCourseID } = useNotification();

  const getErrorMessage = (err: unknown) => {
    if (err instanceof Error) return err.message;
    return 'An unexpected error occurred.';
  };

  // All websocket wiring lives here. Once jobId is set, the hook's `status`
  // becomes the single source of truth for processingStage — no separate
  // connectionStatus/jobStatus states to keep in sync.
  const { status: socketStatus } = useGenerationSocket({
    jobId,
    onCompleted: (payload) => {
      if (payload?.downloadUrl) {
        setDownloadUrl(payload.downloadUrl);
      } else if (payload?.fileName) {
        setDownloadUrl(buildGeneratedFileUrl(String(payload.fileName)));
      }
      setCourseId(payload?.courseId || null);
      setCourseName(payload?.courseName || null);
      setCourseID(payload?.courseId || null);
      addNotification({
        title: 'Generation complete',
        message: 'Your course generation is finished and ready to download.',
        courseId: payload?.courseId,
      });
    },
    onFailed: (payload) => {
      if (payload?.message) setError(String(payload.message));
    },
  });

  // Before a jobId exists, we're in the local upload phase.
  // Once a jobId is set, the socket's status drives everything.
  const processingStage: ProcessingStage = jobId ? socketStatus : uploadPhase;

  // **********************************************************************Handle job generation
  const handleGenerateCourse = useCallback(async (selectedFile: File) => {
    setFile(selectedFile);
    setError(null);
    setDownloadUrl(null);
    setJobId(null);
    setUploadProgress(0);
    setUploadPhase('uploading');

    try {
      const data = await submitGenerateJob([selectedFile], setUploadProgress);
      const responseData = data?.data ?? data;
      const id = responseData?.jobId;

      if (!id) throw new Error('No job ID returned from the server.');

      setJobId(id.toString());
    } catch (err) {
      setError(getErrorMessage(err));
      setUploadPhase('error');
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      handleGenerateCourse(droppedFile);
    }
  }, [handleGenerateCourse]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) handleGenerateCourse(selectedFile);
    e.target.value = '';
  }, [handleGenerateCourse]);

  const resetUpload = () => {
    setFile(null);
    setUploadPhase('idle');
    setUploadProgress(0);
    setJobId(null);
    setDownloadUrl(null);
    setError(null);
  };

  const retryUpload = () => {
    if (file) handleGenerateCourse(file);
  };

  return {
    resetUpload,
    retryUpload,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileSelect,
    isDragOver,
    file,
    processingStage,
    uploadProgress,
    jobId,
    downloadUrl,
    error,
    courseId,
    courseName,
  };
};

export default handleGenerate;