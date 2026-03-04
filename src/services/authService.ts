import axiosInstance from "./axios";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  password2: string; // confirm password — adjust field name to match your backend
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string; // the token sent to the user's email
  password: string;
  password2: string; // confirm password — adjust field name to match your backend
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface User {
  id: number | string;
  username: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const saveTokens = (tokens: AuthTokens) => {
  localStorage.setItem("accessToken", tokens.access);
  localStorage.setItem("refreshToken", tokens.refresh);
};

const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// ── Auth Service ──────────────────────────────────────────────────────────────

const authService = {
  /**
   * POST /api/v1/auth/register
   */
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post<AuthResponse>(
      "/api/v1/auth/register",
      payload,
    );
    saveTokens(data.tokens);
    return data;
  },

  /**
   * POST /api/v1/auth/login
   */
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post<AuthResponse>(
      "/api/v1/auth/login",
      payload,
    );
    saveTokens(data.tokens);
    return data;
  },

  /**
   * POST /api/v1/auth/logout
   * Sends the refresh token so the backend can blacklist it.
   */
  logout: async (): Promise<void> => {
    const refreshToken = localStorage.getItem("refreshToken");
    await axiosInstance.post("/api/v1/auth/logout", { refresh: refreshToken });
    clearTokens();
  },

  /**
   * POST /api/v1/auth/refresh
   * Manually refresh the access token (also called automatically by the interceptor).
   */
  refresh: async (): Promise<AuthTokens> => {
    const refreshToken = localStorage.getItem("refreshToken");
    const { data } = await axiosInstance.post<AuthTokens>(
      "/api/v1/auth/refresh",
      { refresh: refreshToken },
    );
    saveTokens(data);
    return data;
  },

  /**
   * POST /api/v1/auth/forgot-password
   * Sends a password-reset email to the user.
   */
  forgotPassword: async (payload: ForgotPasswordPayload): Promise<void> => {
    await axiosInstance.post("/api/v1/auth/forgot-password", payload);
  },

  /**
   * POST /api/v1/auth/reset-password
   * Resets the password using the token from the email.
   */
  resetPassword: async (payload: ResetPasswordPayload): Promise<void> => {
    await axiosInstance.post("/api/v1/auth/reset-password", payload);
  },
};

export default authService;
