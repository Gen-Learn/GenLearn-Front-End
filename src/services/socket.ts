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
let jobIsTerminal = false; // true once jobCompleted or jobFailed fires

/**
 * Returns the Socket.IO URL derived from the environment.
 */
const getSocketUrl = () => {
  const apiBase = (import.meta.env.VITE_API_BASE_URL as string) || "http://localhost:3000";
  return `${apiBase.replace(/\/+$/, "")}/generation`;
};

/**
 * Ensures a live Socket.IO connection exists without joining any job yet.
 * Safe to call multiple times — if already connected, it's a no-op.
 * Returns the socket instance.
 */
export const connectSocket = (): Socket => {
  if (socket) return socket;

  const url = getSocketUrl();
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
    // Only join if we have a job AND it hasn't finished yet.
    // After jobCompleted/jobFailed the socket may reconnect (auto-reconnect
    // or network flap) — re-joining a terminal job would cause the backend
    // to restart processing and create a duplicate course.
    if (currentJobId && currentCallbacks && !jobIsTerminal) {
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

  return socket;
};

/**
 * Binds job-specific callbacks and joins a job on the (already-connected)
 * socket.  If the socket isn't connected yet, the join is deferred to the
 * "connect" handler above.
 */
export const joinJob = (jobId: string, callbacks: Callbacks = {}): Socket | null => {
  if (!jobId) return null;

  currentCallbacks = callbacks;
  currentJobId = jobId;
  jobIsTerminal = false;

  const sock = connectSocket();

  // Re-bind job-specific listeners so stale closures from a previous job don't linger
  sock.off("joinedJob");
  sock.off("jobCompleted");
  sock.off("jobFailed");
  sock.off("jobStatusUpdated");

  sock.on("joinedJob", (payload: JobEventPayload) => {
    console.log('[Socket] on Joined:', payload.status?.toLowerCase(), payload);
    currentCallbacks?.onJoined?.(payload);
  });
  sock.on("jobStatusUpdated", (payload: JobEventPayload) => {
    currentCallbacks?.jobStatusUpdated?.(payload);
    console.log('[Socket] Job status updated:', payload.status?.toLowerCase(), payload);
  });
  sock.on("jobCompleted", (payload: JobEventPayload) => {
    jobIsTerminal = true;
    currentCallbacks?.onCompleted?.(payload);
    console.log('[Socket] on Completed:', payload.status?.toLowerCase(), payload);
  });
  sock.on("jobFailed", (payload: JobEventPayload) => {
    jobIsTerminal = true;
    currentCallbacks?.onFailed?.(payload);
    console.log('[Socket] on Failed:', payload.status?.toLowerCase(), payload);
  });

  // If already connected, join immediately; otherwise the "connect" handler will do it
  if (sock.connected) {
    console.log(`[Socket] Joining job: ${jobId}`);
    sock.emit("joinJob", { jobId });
  }

  return sock;
};

/**
 * Legacy entry-point kept for backward compatibility.
 * Prefer `connectSocket()` + `joinJob()` when you need the socket before
 * the upload finishes.
 */
export const connectToGenerationSocket = (jobId: string, callbacks: Callbacks = {}): Socket | null => {
  return joinJob(jobId, callbacks);
};

export const disconnectSocket = () => {
  if (socket) {
    try {
      console.log("[Socket] Disconnecting socket");
      socket.off("joinedJob");
      socket.off("jobCompleted");
      socket.off("jobFailed");
      socket.off("jobStatusUpdated");
      socket.disconnect();
    } catch (e) {
      // ignore
    }
    socket = null;
    currentCallbacks = null;
    currentJobId = null;
    jobIsTerminal = false;
  }
};
