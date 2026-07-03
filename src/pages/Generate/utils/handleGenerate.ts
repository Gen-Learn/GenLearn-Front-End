import { useState, useCallback } from 'react';
import { submitGenerateJob, buildGeneratedFileUrl } from '@/services/generateService';
import { useNotification } from '@/contexts/NotificationContext';
import { useGenerationSocket } from '../hooks/useGenerationSocket';

type ProcessingStage = 'idle' | 'uploading' | 'generating' | 'complete' | 'failed';

const handleGenerate = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [processingStage, setProcessingStage] = useState<ProcessingStage>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [jobId, setJobId] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { addNotification } = useNotification();

  const getErrorMessage = (err: unknown) => {
    if (err instanceof Error) return err.message;
    return 'An unexpected error occurred.';
  };

  // All websocket wiring now lives in one place instead of a useEffect in the page component.
  const { connectionStatus } = useGenerationSocket({
    jobId,
    onJoined: (payload) => {
      const status = payload?.status || payload?.jobStatus;
      if (status) setJobStatus(String(status).toLowerCase());
    },
    onCompleted: (payload) => {
      setJobStatus('completed');
      if (payload?.downloadUrl) {
        setDownloadUrl(payload.downloadUrl);
      } else if (payload?.fileName) {
        setDownloadUrl(buildGeneratedFileUrl(String(payload.fileName)));
      }

      addNotification({
        title: 'Generation complete',
        message: 'Your course generation is finished and ready to download.',
        courseId: payload?.downloadUrl,
      });

      setProcessingStage('complete');
    },
    onFailed: (payload) => {
      setJobStatus('failed');
      if (payload?.message) setError(String(payload.message));
      setProcessingStage('failed');
    },
  });

  const handleGenerateCourse = useCallback(async (selectedFile: File) => {
    setFile(selectedFile);
    setError(null);
    setDownloadUrl(null);
    setJobStatus(null);
    setJobId(null);
    setUploadProgress(0);
    setProcessingStage('uploading');

    try {
      const data = await submitGenerateJob([selectedFile], setUploadProgress);
      const responseData = data?.data ?? data;
      const id = responseData?.jobId;
      const status = responseData?.status;

      if (!id) throw new Error('No job ID returned from the server.');

      setJobId(id.toString());
      setJobStatus(status ? status.toString().toLowerCase() : 'pending');
      setProcessingStage('generating');
    } catch (err) {
      setError(getErrorMessage(err));
      setProcessingStage('failed');
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
    setProcessingStage('idle');
    setUploadProgress(0);
    setJobId(null);
    setJobStatus(null);
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
    jobStatus,
    downloadUrl,
    error,
    connectionStatus, // NEW — expose to the page for UI feedback
  };
};

export default handleGenerate;