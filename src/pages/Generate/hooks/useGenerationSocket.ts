import { useEffect, useRef, useState } from 'react';
import {
  connectToGenerationSocket,
  disconnectSocket,
  JobEventPayload,
} from '@/services/socket';

// Single source of truth for "what's happening right now" — covers both
// the socket transport state and the job's processing stage, since the UI
// only ever needs to render one status at a time, never both independently.
export type SocketStatus =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'reconnecting'
  | 'error'
  | 'extracting'
  | 'generating'
  | 'rendering'
  | 'completed';

const JOB_STATUS_TO_STAGE: Record<string, SocketStatus> = {
  extracting: 'extracting',
  generating: 'generating',
  rendering: 'rendering',
};

interface UseGenerationSocketArgs {
  jobId: string | null;
  onJoined?: (payload: JobEventPayload) => void;
  onCompleted?: (payload: JobEventPayload) => void;
  onFailed?: (payload: JobEventPayload) => void;
  onStatusUpdate?: (payload: JobEventPayload) => void;
}

export function useGenerationSocket({
  jobId,
  onJoined,
  onCompleted,
  onFailed,
  onStatusUpdate,
}: UseGenerationSocketArgs) {
  const [status, setStatus] = useState<SocketStatus>('idle');

  // Keep latest callbacks available inside the socket handlers without
  // having to re-run the connection effect every time a parent re-renders.
  const callbacksRef = useRef({ onJoined, onCompleted, onFailed, onStatusUpdate });
  useEffect(() => {
    callbacksRef.current = { onJoined, onCompleted, onFailed, onStatusUpdate };
  }, [onJoined, onCompleted, onFailed, onStatusUpdate]);

  useEffect(() => {
    if (!jobId) {
      setStatus('idle');
      return;
    }

    setStatus('connecting');

    const socket = connectToGenerationSocket(jobId, {
      onJoined: (payload) => {
        setStatus('connected');
        callbacksRef.current.onJoined?.(payload);
      },
      jobStatusUpdated: (payload) => {
        const jobStatus = payload.status?.toLowerCase() ?? '';
        setStatus(JOB_STATUS_TO_STAGE[jobStatus] ?? 'generating');
        callbacksRef.current.onStatusUpdate?.(payload);
      },
      onCompleted: (payload) => {
        setStatus('completed');
        callbacksRef.current.onCompleted?.(payload);
      },
      onFailed: (payload) => {
        setStatus('error');
        callbacksRef.current.onFailed?.(payload);
      },
    });

    if (!socket) {
      setStatus('error');
      return;
    }

    const handleConnect = () => setStatus('connected');
    const handleDisconnect = () => setStatus('reconnecting');
    const handleError = () => setStatus('error');

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('connect_error', handleError);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('connect_error', handleError);
      disconnectSocket();
      setStatus('idle');
    };
  }, [jobId]);

  return { status };
}