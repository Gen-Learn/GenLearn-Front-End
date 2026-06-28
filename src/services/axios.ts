import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // sends/receives httpOnly accessToken + refreshToken cookies
});

// No request interceptor attaching `Authorization: Bearer <token>` — there is
// no token in JS to attach. The browser sends the accessToken cookie on every
// request to this baseURL automatically because of `withCredentials: true`.

const isRefreshRequest = (config?: AxiosRequestConfig) =>
  config?.url?.includes("/api/v1/auth/refresh");

const clearAuthState = () => {
  // Nothing in localStorage to remove — the refreshToken cookie being
  // missing/invalid/expired IS the logged-out state. Just redirect.
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(null);
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

    // The refresh call itself failed -> refreshToken cookie is
    // missing/invalid/expired. Nothing more to try.
    if (isRefreshRequest(originalRequest)) {
      clearAuthState();
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue this request until the in-flight refresh finishes, then
        // just retry it — the new accessToken cookie is already in place.
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Server reads the refreshToken cookie and responds with a fresh
        // accessToken cookie via Set-Cookie. Nothing in the body to store.
        await axiosInstance.post("/api/v1/auth/refresh");
        processQueue(null);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        clearAuthState();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;