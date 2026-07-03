import { useEffect, useRef, useState } from 'react';
import {
  connectToGenerationSocket,
  disconnectSocket,
  JobEventPayload,
} from '@/services/socket';

export type SocketConnectionStatus =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'reconnecting'
  | 'error';

interface UseGenerationSocketArgs {
  jobId: string | null;
  onJoined?: (payload: JobEventPayload) => void;
  onCompleted?: (payload: JobEventPayload) => void;
  onFailed?: (payload: JobEventPayload) => void;
}

export function useGenerationSocket({
  jobId,
  onJoined,
  onCompleted,
  onFailed,
}: UseGenerationSocketArgs) {
  const [connectionStatus, setConnectionStatus] = useState<SocketConnectionStatus>('idle');

  // Keep latest callbacks in refs so the effect only re-runs when jobId changes,
  // not on every render of the parent component.
  const onJoinedRef = useRef(onJoined);
  const onCompletedRef = useRef(onCompleted);
  const onFailedRef = useRef(onFailed);

  useEffect(() => { onJoinedRef.current = onJoined; }, [onJoined]);
  useEffect(() => { onCompletedRef.current = onCompleted; }, [onCompleted]);
  useEffect(() => { onFailedRef.current = onFailed; }, [onFailed]);

  useEffect(() => {
    if (!jobId) {
      setConnectionStatus('idle');
      return;
    }

    setConnectionStatus('connecting');

    const socket = connectToGenerationSocket(jobId, {
      onJoined: (payload) => {
        setConnectionStatus('connected');
        onJoinedRef.current?.(payload);
      },
      onCompleted: (payload) => {
        onCompletedRef.current?.(payload);
      },
      onFailed: (payload) => {
        onFailedRef.current?.(payload);
      },
    });

    if (!socket) {
      setConnectionStatus('error');
      return;
    }

    const handleConnect = () => setConnectionStatus('connected');
    const handleDisconnect = () => setConnectionStatus('reconnecting');
    const handleError = () => setConnectionStatus('error');

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('connect_error', handleError);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('connect_error', handleError);
      disconnectSocket();
      setConnectionStatus('idle');
    };
  }, [jobId]);

  return { connectionStatus };
}