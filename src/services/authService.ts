import axiosInstance from "./axios";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
  resetMethod: "email";
}

export interface ResetPasswordPayload {
  userId: string;
  resetPasswordToken: string;
  newPassword: string;
}
// Actual backend response shape
interface BackendAuthResponse {
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken?: string; // optional — not returned by login currently
    user?: User; // optional — not returned by login currently
  };
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface User {
  id: number | string;
  name: string;
  email: string;
}

export interface AuthResponse {
  user: User | null;
  tokens: AuthTokens;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const saveTokens = (accessToken: string, refreshToken?: string) => {
  localStorage.setItem("accessToken", accessToken);
  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }
};

const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};

// ── Auth Service ──────────────────────────────────────────────────────────────

const authService = {
  /**
   * POST /api/v1/auth/register
   */
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post<BackendAuthResponse>(
      "/api/v1/auth/register",
      payload,
    );
    const { accessToken, refreshToken, user } = data.data;
    saveTokens(accessToken, refreshToken);
    return {
      user: user ?? null,
      tokens: { access: accessToken, refresh: refreshToken ?? "" },
    };
  },

  /**
   * POST /api/v1/auth/login
   */
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post<BackendAuthResponse>(
      "/api/v1/auth/login",
      payload,
    );
    const { accessToken, refreshToken, user } = data.data;
    saveTokens(accessToken, refreshToken);
    return {
      user: user ?? null,
      tokens: { access: accessToken, refresh: refreshToken ?? "" },
    };
  },

  /**
   * POST /api/v1/auth/logout
   */
  logout: async (): Promise<void> => {
    const refreshToken = localStorage.getItem("refreshToken");
    await axiosInstance.post("/api/v1/auth/logout", { refresh: refreshToken });
    clearTokens();
  },

  /**
   * POST /api/v1/auth/refresh
   */
  refresh: async (): Promise<AuthTokens> => {
    const refreshToken = localStorage.getItem("refreshToken");
    const { data } = await axiosInstance.post<BackendAuthResponse>(
      "/api/v1/auth/refresh",
      { refresh: refreshToken },
    );
    const { accessToken } = data.data;
    saveTokens(accessToken);
    return { access: accessToken, refresh: refreshToken ?? "" };
  },

  /**
   * POST /api/v1/auth/forgot-password
   */
  forgotPassword: async (payload: ForgotPasswordPayload): Promise<void> => {
    await axiosInstance.post("/api/v1/auth/forgot-password", payload);
  },

  /**
   * POST /api/v1/auth/reset-password
   */
  resetPassword: async (payload: ResetPasswordPayload): Promise<void> => {
    await axiosInstance.post("/api/v1/auth/reset-password", payload);
  },
};

export default authService;
