import { User } from "./userModel";
export interface AuthResponse {
  user: User | null;
  tokens: AuthTokens;
}

export interface BackendAuthResponse {
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
  refresh: string ;
}

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

export interface VerifyEmailPayload {
  userId: string;
  token: string;
}

export interface ResendVerificationEmailPayload {
  email: string;
}