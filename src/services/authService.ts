import axiosInstance from "./axios";
import { AuthResponse, AuthTokens, RegisterPayload, LoginPayload, ForgotPasswordPayload, ResetPasswordPayload,BackendAuthResponse } from "../types/authModel";
import {getCurrentUser} from "./userService";
// ── Helpers ───────────────────────────────────────────────────────────────────

const saveTokens = (accessToken: string) => {
  localStorage.setItem("accessToken", accessToken);
};

export const clearTokens = () => {
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
    const { accessToken, refreshToken } = data.data;
    saveTokens(accessToken);
    return {
      user: null,
      tokens: { access: accessToken, refresh: refreshToken ?? "" },
    };
  },

  /**
   * POST /api/v1/auth/login
   */
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post<BackendAuthResponse>(
      "/api/v1/auth/login",
      payload,{
        "withCredentials":true
      }
    
    );
    const { accessToken, refreshToken, user } = data.data;
    saveTokens(accessToken);

    const currentUser =
      user ?? (await getCurrentUser());

    return {
      user: currentUser ?? null,
      tokens: { access: accessToken, refresh: refreshToken ?? "" },
    };
  },

  /**
   * POST /api/v1/auth/logout
   */
logout: async (): Promise<void> => {
  await axiosInstance.post("/api/v1/auth/logout");
  clearTokens();
},

  /**
   * POST /api/v1/auth/refresh
   */
refresh: async (): Promise<AuthTokens> => {
  const { data } = await axiosInstance.post<BackendAuthResponse>("/api/v1/auth/refresh");
  const { accessToken } = data.data;
  return { access: accessToken, refresh: "" };
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
