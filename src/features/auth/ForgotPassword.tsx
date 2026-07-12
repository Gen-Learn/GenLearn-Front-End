import img from "@/assets/images/forgotpassword.png";
import { Mail, Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from "react-router";
import { useState ,useEffect} from "react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/ui/Button";
function ForgotPassword() {
  const { forgotPassword, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      await forgotPassword({ email, resetMethod: "email" });
      setSent(true);
    } catch {
      setSent(false);
      // error set in context
    }
  };
  useEffect(()=>{
    clearError();
  },[])
 if (sent) {
    return (
      <div className="min-h-screen bg-[#FAFAFC] flex items-center justify-center p-8">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h1>
          <p className="text-gray-600 mb-8">
            We've sent a password reset link to <strong>{email}</strong>. Click the link to reset your password.
          </p>
          <div className="space-y-3">
            <Link to="/login" className="block">
              <Button className="w-full">Back to Sign In</Button>
            </Link>
            <button
              onClick={() => setSent(false)}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Didn't receive the email? Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        {/* Back link */}
        <Link to="/login" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot your password?</h1>
          <p className="text-gray-600">No worries, we'll send you reset instructions</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:border-primary-300 focus:ring-2 focus:ring-primary-500/20 transition-all"
              />
            </div>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              'Reset password'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
export default ForgotPassword;
