import axiosInstance from "./axios";
import {
  AuthResponse,
  RegisterPayload,
  LoginPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  VerifyEmailPayload,
  ResendVerificationEmailPayload,
  BackendAuthResponse,
} from "../types/authModel"
import { getCurrentUser } from "./userService";

// ── Auth Service ──────────────────────────────────────────────────────────────
// Zero localStorage usage. accessToken/refreshToken live exclusively in
// httpOnly cookies set by the server via `Set-Cookie` — JS never reads or
// writes them. The signed-in user is held only in React state (AuthContext),
// re-derived from the server via getCurrentUser() whenever needed.

const authService = {
  /**
   * POST /api/v1/auth/register
   * Server sets accessToken/refreshToken as httpOnly cookies on the response.
   */
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post<BackendAuthResponse>(
      "/api/v1/auth/register",
      payload,
    );
    const resData = data.data as any;
    const user = resData.user ?? null;
    const tokens =
      resData.tokens ??
      (resData.accessToken
        ? { accessToken: resData.accessToken, refreshToken: resData.refreshToken }
        : null);
    return { user, tokens };
  },

  /**
   * POST /api/v1/auth/login
   * Server sets accessToken/refreshToken as httpOnly cookies on the response.
   */
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post<BackendAuthResponse>(
      "/api/v1/auth/login",
      payload,
    );
    const resData = data.data as any;
    const tokens =
      resData.tokens ??
      (resData.accessToken
        ? { accessToken: resData.accessToken, refreshToken: resData.refreshToken }
        : null);
    const currentUser =await getCurrentUser();
    return { user: currentUser ?? null, tokens };
  },

  /**
   * POST /api/v1/auth/logout
   * Server clears the auth cookies (Set-Cookie with Max-Age=0).
   */
  logout: async (): Promise<void> => {
    await axiosInstance.post("/api/v1/auth/logout");
  },

  /**
   * POST /api/v1/auth/refresh
   * Server reads the refreshToken cookie, rotates it, and sets a new
   * accessToken cookie on the response. Triggered from the axios response
   * interceptor on 401 — nothing for the client to store here.
   */
  refresh: async (): Promise<void> => {
    await axiosInstance.post<BackendAuthResponse>("/api/v1/auth/refresh");
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

  /**
   * POST /api/v1/auth/verify-email
   * Verifies user email using userId and token from email link
   */
  verifyEmail: async (payload: VerifyEmailPayload): Promise<void> => {
    await axiosInstance.post("/api/v1/auth/verify-email", payload);
  },

  /**
   * POST /api/v1/auth/resend-verification-email
   * Resends verification email to user
   */
  resendVerificationEmail: async (
    payload: ResendVerificationEmailPayload
  ): Promise<void> => {
    await axiosInstance.post(
      "/api/v1/auth/resend-verification-email",
      payload
    );
  },
};

export default authService;