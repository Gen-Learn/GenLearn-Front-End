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

export const connectToGenerationSocket = (jobId: string, callbacks: Callbacks = {}) => {
  if (!jobId) return null;

  // Reuse existing socket if already connected
  if (socket && socket.connected) {
    socket.emit("joinJob", { jobId });
    return socket;
  }

  const token = localStorage.getItem("accessToken") || localStorage.getItem("token");
  const url = (import.meta.env.VITE_GENERATION_SOCKET_URL as string) || "http://localhost:3000/generation";

  socket = io(url, {
    path: "/socket.io",
    transports: ["websocket"],
    auth: token ? { token } : undefined,
    // If your server requires a namespace instead of a path, adapt accordingly.
  });

  socket.on("connect", () => {
    socket?.emit("joinJob", { jobId });
  });

  socket.on("joinedJob", (payload: JobEventPayload) => callbacks.onJoined?.(payload));
  socket.on("jobCompleted", (payload: JobEventPayload) => callbacks.onCompleted?.(payload));
  socket.on("jobFailed", (payload: JobEventPayload) => callbacks.onFailed?.(payload));

  socket.on("connect_error", (err) => {
    // Keep a console message for debugging; components should handle UX.
    // eslint-disable-next-line no-console
    console.error("Generation socket connect_error:", err);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    try {
      socket.disconnect();
    } catch (e) {
      // ignore
    }
    socket = null;
  }
};
