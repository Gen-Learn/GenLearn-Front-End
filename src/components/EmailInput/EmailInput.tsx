import { useState, useEffect } from "react";
import { Mail, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import {
  validateEmail,
  isDisposableEmail,
  isCommonEmailProvider,
} from "../../pages/SignUp/utils/emailValidation";

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  onValidationChange?: (isValid: boolean) => void;
  placeholder?: string;
  label?: string;
  showValidationFeedback?: boolean;
  checkDisposable?: boolean;
  required?: boolean;
  disabled?: boolean;
}
 type ValidationResult = {
  isValid: boolean;
  error?: string;
  suggestion?: string;
  severity: "error" | "warning" | "success";
};
export const EmailInput = ({
  value,
  onChange,
  onValidationChange,
  placeholder = "your@email.com",
  label = "Email address",
  showValidationFeedback = true,
  checkDisposable = true,
  required = true,
  disabled = false,
}: EmailInputProps) => {
  const [validation, setValidation] = useState<ValidationResult>({
    isValid: false,
    error: "",
    suggestion: "",
    severity: "error" as const,
  });
  const [touched, setTouched] = useState(false);

  // Validate email whenever it changes
  useEffect(() => {
    const result = validateEmail(value);

    // Check for disposable emails
    let finalResult = { ...result };
    if (result.isValid && checkDisposable && isDisposableEmail(value)) {
      finalResult = {
        isValid: false,
        error: "This email provider is not supported",
        severity: "error" as const,
      };
    }

    setValidation(finalResult);
    onValidationChange?.(finalResult.isValid && touched);
  }, [value, checkDisposable, touched]);

  const showError = touched && !validation.isValid;
  const showSuggestion = touched && validation.suggestion;
  const showSuccess = touched && validation.isValid;

  const handleSuggestedEmail = (suggested: string) => {
    onChange(suggested);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor="email-input" className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          id="email-input"
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setTouched(true)}
          onFocus={() => setTouched(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full pl-12 pr-12 py-3 rounded-2xl border-2 transition-all focus:outline-none ${
            showError
              ? "border-red-300 bg-red-50 focus:ring-2 focus:ring-red-500/20"
              : showSuccess
                ? "border-green-300 bg-green-50 focus:ring-2 focus:ring-green-500/20"
                : showSuggestion
                  ? "border-orange-300 bg-orange-50 focus:ring-2 focus:ring-orange-500/20"
                  : "border-gray-200 focus:border-primary-300 focus:ring-2 focus:ring-primary-500/20"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        />

        {/* Validation Icon */}
        {touched && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {showError ? (
              <XCircle className="w-5 h-5 text-red-500" />
            ) : showSuccess ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : showSuggestion ? (
              <AlertCircle className="w-5 h-5 text-orange-500" />
            ) : null}
          </div>
        )}
      </div>

      {/* Feedback Messages */}
      {showValidationFeedback && touched && (
        <div className="space-y-2">
          {/* Error Message */}
          {showError && (
            <p className="text-sm text-red-600 flex items-center gap-2">
              <span>✕</span>
              {validation.error}
            </p>
          )}

          {/* Suggestion */}
          {showSuggestion && (
            <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50 border border-orange-200">
              <p className="text-sm text-orange-700">{validation.error}</p>
              <button
                type="button"
                onClick={() => handleSuggestedEmail(validation.suggestion!)}
                className="text-xs font-medium text-orange-600 hover:text-orange-700 px-2 py-1 rounded hover:bg-orange-100 transition-colors"
              >
                Use suggestion
              </button>
            </div>
          )}

          {/* Success Message */}
          {showSuccess && !showSuggestion && (
            <p className="text-sm text-green-600 flex items-center gap-2">
              <span>✓</span>
              Email looks good! You'll receive a verification email.
            </p>
          )}

          {/* Info about disposable emails */}
          {checkDisposable && value && !isCommonEmailProvider(value) && validation.isValid && !isDisposableEmail(value) && (
            <p className="text-xs text-gray-500">
              ℹ️ Make sure to use a personal or work email you can access.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default EmailInput;
