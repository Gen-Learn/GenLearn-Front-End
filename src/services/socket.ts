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

  if (!socket || !socket.connected) {
    const token = localStorage.getItem("accessToken") || localStorage.getItem("token");
    const apiBase = (import.meta.env.VITE_API_BASE_URL as string) || "http://localhost:3000";
    const url = `${apiBase.replace(/\/+$/, "")}/generation`;
    const socketPath = "/socket.io";

    console.log("[Socket] Initializing connection to:", url);

    socket = io(url, {
      path: socketPath,
      transports: ["websocket"],
      auth: token ? { token } : undefined,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
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
  }

  console.log(`[Socket] Joining job: ${jobId}`);
  socket.emit("joinJob", { jobId });

  socket.off("joinedJob");
  socket.off("jobCompleted");
  socket.off("jobFailed");

  socket.on("joinedJob", (payload: JobEventPayload) => {
    console.log("[Socket] joinedJob event:", payload);
    if (currentCallbacks?.onJoined) {
      currentCallbacks.onJoined(payload);
    }
  });

  socket.on("jobCompleted", (payload: JobEventPayload) => {
    console.log("[Socket] jobCompleted event:", payload);
    if (currentCallbacks?.onCompleted) {
      currentCallbacks.onCompleted(payload);
    }
  });

  socket.on("jobFailed", (payload: JobEventPayload) => {
    console.log("[Socket] jobFailed event:", payload);
    if (currentCallbacks?.onFailed) {
      currentCallbacks.onFailed(payload);
    }
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
