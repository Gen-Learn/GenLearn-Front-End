import { useState, useCallback, useRef } from 'react';
import { submitGenerateJob } from '@/services/generateService';
import { connectSocket } from '@/services/socket';
import { useNotification } from '@/contexts/NotificationContext';
import { useGenerationSocket, type SocketStatus } from '@/hooks/mutations/useGenerationSocket';

// Local phase before a jobId exists — the socket hook takes over
// (and drives `processingStage`) as soon as a jobId is assigned.
type UploadPhase = 'idle' | 'uploading' | 'error';

// The single unified status the whole page renders off of.
export type ProcessingStage = UploadPhase | SocketStatus;

const handleGenerate = () => {
  const [ isDragOver, setIsDragOver ] = useState(false);
  const [ courseId, setCourseid ] = useState<string | null>(null);
  const [ courseName, setCourseName ] = useState<string | null>(null);
  const [ file, setFile ] = useState<File | null>(null);
  const [ uploadPhase, setUploadPhase ] = useState<UploadPhase>('idle');
  const [ jobId, setJobId ] = useState<string | null>(null);
  const [ error, setError ] = useState<string | null>(null);

  // Monotonically increasing key that forces the socket hook to re-join
  // the same job when the user clicks "Retry" after a socket-level failure.
  const [ connectionAttempt, setConnectionAttempt ] = useState(0);

  // Guard against concurrent generation attempts.
  const generatingRef = useRef(false);

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
    connectionAttempt,
    onCompleted: (payload) => {
      setCourseName(payload?.courseName || null);
      setCourseID(payload?.courseId || null);
      setCourseid(payload?.courseId || null);
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
    if (generatingRef.current) return;
    generatingRef.current = true;

    setFile(selectedFile);
    setError(null);
    setUploadPhase('uploading');

    connectSocket();

    try {
      const data = await submitGenerateJob([ selectedFile ]);
      const responseData = data?.data ?? data;
      const id = responseData?.jobId;

      if (!id) throw new Error('No job ID returned from the server.');

      setJobId(id.toString());
    } catch (err) {
      setError(getErrorMessage(err));
      setUploadPhase('error');
    } finally {
      generatingRef.current = false;
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
    const droppedFile = e.dataTransfer.files[ 0 ];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      handleGenerateCourse(droppedFile);
    }
  }, [ handleGenerateCourse ]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[ 0 ];
    if (selectedFile) handleGenerateCourse(selectedFile);
    e.target.value = '';
  }, [ handleGenerateCourse ]);

  const resetUpload = () => {
    setFile(null);
    setUploadPhase('idle');
    setJobId(null);
    setError(null);
    setConnectionAttempt(0);
  };

  const retryUpload = () => {
    setError(null);

    if (jobId) {
      // The job was already created on the server — don't re-upload.
      // Just reconnect the socket to the existing job by bumping the
      // connection attempt counter, which forces the socket hook to
      // tear down and re-join.
      setUploadPhase('uploading');
      setConnectionAttempt((n) => n + 1);
      return;
    }

    // No jobId yet — the upload itself failed. Re-upload the file.
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
    jobId,
    error,
    courseId,
    courseName,
  };
};

export default handleGenerate;
