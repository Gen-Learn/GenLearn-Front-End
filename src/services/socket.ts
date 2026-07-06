import { io, Socket } from "socket.io-client";

export type JobEventPayload = {
  jobId?: string;
  status?: string;
  filename?: string;
  fileName?: string;
  downloadUrl?: string;
  message?: string;
  [key: string]: any;
};

type Callbacks = {
  jobStatusUpdated?: (payload: JobEventPayload) => void;
  onJoined?: (payload: JobEventPayload) => void;
  onCompleted?: (payload: JobEventPayload) => void;
  onFailed?: (payload: JobEventPayload) => void;
};

let socket: Socket | null = null;
let currentCallbacks: Callbacks | null = null;
let currentJobId: string | null = null;

export const connectToGenerationSocket = (jobId: string, callbacks: Callbacks = {}) => {
  if (!jobId) return null;

  currentCallbacks = callbacks;
  currentJobId = jobId;

  const isNewSocket = !socket;

  if (!socket) {
    const apiBase = (import.meta.env.VITE_API_BASE_URL as string) || "http://localhost:3000";
    const url = `${apiBase.replace(/\/+$/, "")}/generation`;

    console.log("[Socket] Initializing connection to:", url);

    socket = io(url, {
      path: "/socket.io",
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("[Socket] Connected to generation server");
      if (currentJobId) {
        socket!.emit("joinJob", { jobId: currentJobId });
      }
    });

    socket.on("connect_error", (err) => {
      console.error("[Socket] Connection error:", err);
    });

    socket.on("disconnect", (reason) => {
      console.log("[Socket] Disconnected:", reason);
    });

    socket.io.on("reconnect_attempt", (attempt) => {
      console.log("[Socket] Reconnect attempt:", attempt);
    });
  }

  // If we're reusing an already-connected socket for a *new* job, join immediately.
  // If it's a fresh socket, the "connect" handler above will do the join once it's live.
  if (!isNewSocket && socket.connected) {
    console.log(`[Socket] Joining job: ${jobId}`);
    socket.emit("joinJob", { jobId });
  }

  // Re-bind job-specific listeners so stale closures from a previous job don't linger
  socket.off("joinedJob");
  socket.off("jobCompleted");
  socket.off("jobFailed");

  socket.on("joinedJob", (payload: JobEventPayload) => {
    console.log('[Socket] on Joined:', payload.status?.toLowerCase(), payload);
    currentCallbacks?.onJoined?.(payload);

  });
  socket.on("jobStatusUpdated", (payload: JobEventPayload) => {
    currentCallbacks?.jobStatusUpdated?.(payload);
    console.log('[Socket] Job status updated:',  payload.status?.toLowerCase(), payload);
    
  });
  socket.on("jobCompleted", (payload: JobEventPayload) => {
    currentCallbacks?.onCompleted?.(payload);
    console.log('[Socket] on Completed:', payload.status?.toLowerCase(), payload);
  });

  socket.on("jobFailed", (payload: JobEventPayload) => {
    currentCallbacks?.onFailed?.(payload);
    console.log('[Socket] on Failed:', payload.status?.toLowerCase(), payload);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    try {
      console.log("[Socket] Disconnecting socket");
      socket.off("joinedJob");
      socket.off("jobCompleted");
      socket.off("jobFailed");
      socket.disconnect();
    } catch (e) {
      // ignore
    }
    socket = null;
    currentCallbacks = null;
    currentJobId = null;
  }
};