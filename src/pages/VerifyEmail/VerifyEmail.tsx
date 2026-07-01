import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle, Mail, Loader2, ArrowLeft, Zap, RefreshCw } from "lucide-react";
import { Link } from "react-router";
import Button from "../../components/ui/Button";
import authService from "../../services/authService";

type VerificationStatus = "loading" | "success" | "error" | "idle";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<VerificationStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");

  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  // Verify email on component mount if userId and token are present
  useEffect(() => {
    const verifyEmail = async () => {
      if (!userId || !token) {
        setStatus("error");
        setError("Invalid verification link. Missing userId or token.");
        return;
      }

      setStatus("loading");
      try {
        await authService.verifyEmail({ userId, token });
        setStatus("success");
        setError(null);
      } catch (err: unknown) {
        setStatus("error");
        if (err instanceof Error) {
          const axiosError = err as {
            response?: { data?: { detail?: string; message?: string } };
          };
          const errorMessage =
            axiosError.response?.data?.message ||
            axiosError.response?.data?.detail ||
            err.message ||
            "Failed to verify email. Please try again.";
          setError(errorMessage);
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      }
    };

    verifyEmail();
  }, [userId, token]);

  // Handle resend verification email
  const handleResendEmail = async () => {
    if (!userEmail) {
      setError("Please enter your email address.");
      return;
    }

    setResendLoading(true);
    setError(null);
    try {
      await authService.resendVerificationEmail({ email: userEmail });
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 5000); // Hide message after 5 seconds
    } catch (err: unknown) {
      if (err instanceof Error) {
        const axiosError = err as {
          response?: { data?: { detail?: string; message?: string } };
        };
        const errorMessage =
          axiosError.response?.data?.message ||
          axiosError.response?.data?.detail ||
          err.message ||
          "Failed to resend verification email.";
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setResendLoading(false);
    }
  };

  const handleContinue = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary-500 to-secondary-500 p-12 flex-col justify-between">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 grid-pattern" />
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-white relative z-10">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold">GenLearn</span>
        </Link>

        {/* Illustration */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="w-80 h-80 relative">
            {/* Orbiting circles */}
            <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-spin-slow" />
            <div
              className="absolute inset-8 rounded-full border-2 border-white/30 animate-spin-slow"
              style={{ animationDirection: "reverse" }}
            />
            <div className="absolute inset-16 rounded-full border-2 border-dashed border-white/20 animate-spin-slow" />

            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl">
                <Mail className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Floating elements */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 rounded-full bg-white/40 animate-float"
                style={{
                  top: `${20 + i * 10}%`,
                  left: `${10 + i * 15}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="relative z-10 text-white">
          <p className="text-xl font-medium mb-2">"Secure your account"</p>
          <p className="text-white/70">Verify your email to access all GenLearn features</p>
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Back button - Mobile only */}
          <Link to="/" className="lg:hidden inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          {/* Loading state */}
          {status === "loading" && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 rounded-full border-4 border-primary-100" />
                    <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Verifying Email</h1>
                <p className="text-gray-600">Please wait while we verify your email address...</p>
              </div>
            </div>
          )}

          {/* Success state */}
          {status === "success" && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <CheckCircle className="w-20 h-20 text-green-500" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Verified</h1>
                <p className="text-gray-600 mb-6">
                  Great! Your email has been verified successfully. You can now access all features of GenLearn.
                </p>
              </div>

              <Button onClick={handleContinue} className="w-full">
                Continue to Login
              </Button>

              <p className="text-center text-gray-600">
                Already logged in?{" "}
                <Link to="/" className="font-semibold text-primary-600 hover:text-primary-700">
                  Go to home
                </Link>
              </p>
            </div>
          )}

          {/* Error state */}
          {status === "error" && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <XCircle className="w-20 h-20 text-red-500" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Verification Failed</h1>
                <p className="text-gray-600 mb-6">{error}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:border-primary-300 focus:ring-2 focus:ring-primary-500/20 transition-all"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleResendEmail}
                  disabled={resendLoading}
                  className="w-full"
                  variant="secondary"
                >
                  {resendLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-5 h-5" />
                      Resend Verification Email
                    </>
                  )}
                </Button>

                {resendSuccess && (
                  <div className="p-4 rounded-xl bg-green-50 border border-green-100 text-green-600 text-sm">
                    ✓ Verification email has been sent successfully. Please check your inbox.
                  </div>
                )}
              </div>

              <Button onClick={() => navigate("/login")} className="w-full" variant="secondary">
                Back to Login
              </Button>
            </div>
          )}

          {/* Idle state - no params */}
          {status === "idle" && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <Mail className="w-20 h-20 text-gray-400" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Verification</h1>
                <p className="text-gray-600 mb-6">
                  Click the link in your verification email to verify your account.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="email-idle" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="email-idle"
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:border-primary-300 focus:ring-2 focus:ring-primary-500/20 transition-all"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleResendEmail}
                  disabled={resendLoading}
                  className="w-full"
                >
                  {resendLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Send Verification Email
                    </>
                  )}
                </Button>

                {resendSuccess && (
                  <div className="p-4 rounded-xl bg-green-50 border border-green-100 text-green-600 text-sm">
                    ✓ Verification email has been sent successfully. Please check your inbox.
                  </div>
                )}
              </div>

              <Button onClick={() => navigate("/login")} variant="secondary" className="w-full">
                Back to Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
