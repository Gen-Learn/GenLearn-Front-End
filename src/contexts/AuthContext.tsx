import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import authService from "../services/authService";
import { getCurrentUser } from "../services/userService";
import {
  LoginPayload,
  RegisterPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
} from "../types/authModel";
import { User } from "../types/userModel";

// ── Context shape ─────────────────────────────────────────────────────────────

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  register: (payload: RegisterPayload) => Promise<void>;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (payload: ForgotPasswordPayload) => Promise<void>;
  resetPassword: (payload: ResetPasswordPayload) => Promise<void>;
  refreshUser: () => Promise<void>;
  clearError: () => void;
}

// ── Context ───────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ── Provider ──────────────────────────────────────────────────────────────────

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Rehydrate session on app load by asking the SERVER who we are — this is
  // the only source of truth now. The accessToken cookie (httpOnly) is sent
  // automatically by the browser; there's nothing in localStorage to read.
  // If there's no valid cookie, getCurrentUser() resolves to null and we
  // simply stay logged out. The axios response interceptor handles silently
  // refreshing an expired accessToken (via the refreshToken cookie) before
  // this ever has to fail outright.
  useEffect(() => {
    let isMounted = true;

    const rehydrate = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (isMounted) {
          setUser(currentUser);
          setIsLoading(false);
        }
      } catch (err) {
        // User not authenticated - just stay logged out
        // Don't redirect here; let the axios interceptor handle it only if needed
        if (isMounted) {
          setUser(null);
          setIsLoading(false);
        }
      }
    };

    rehydrate();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      const axiosError = err as {
        response?: { data?: { detail?: string; message?: string } };
      };
      const message =
        axiosError.response?.data?.detail ||
        axiosError.response?.data?.message ||
        err.message ||
        "Something went wrong.";
      setError(message);
    } else {
      setError("An unexpected error occurred.");
    }
  };

  const clearError = () => setError(null);

  const register = async (payload: RegisterPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authService.register(payload);
      setUser(data.user);
    } catch (err) {
      handleError(err);
      throw err; // re-throw so the form can react if needed
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (payload: LoginPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const { user } = await authService.login(payload);
      setUser(user);
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.logout();
    } catch {
    } finally {
      setUser(null);
      setIsLoading(false);
      queryClient.clear();
    }
  };

  const forgotPassword = async (payload: ForgotPasswordPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.forgotPassword(payload);
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (payload: ResetPasswordPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.resetPassword(payload);
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      console.error("Failed to refresh user:", err);
      // Don't throw - just silently fail and keep existing user data
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        // The ONE place "am I signed in" is decided, app-wide. True only
        // after the server confirms a valid session via the httpOnly cookie.
        isAuthenticated: !!user,
        isLoading,
        error,
        setError,
        register,
        login,
        logout,
        forgotPassword,
        resetPassword,
        refreshUser,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ── Hook ──────────────────────────────────────────────────────────────────────

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return context;
};

export default AuthContext;