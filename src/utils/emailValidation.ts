/**
 * Email validation utility with comprehensive checks
 */

// More comprehensive email regex (RFC 5322 simplified)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Common typo domains
const COMMON_TYPOS: Record<string, string> = {
  "gmial.com": "gmail.com",
  "gmai.com": "gmail.com",
  "yahooo.com": "yahoo.com",
  "yaho.com": "yahoo.com",
  "outlok.com": "outlook.com",
  "hotmial.com": "hotmail.com",
  "protonmial.com": "protonmail.com",
};

export interface EmailValidationResult {
  isValid: boolean;
  error?: string;
  suggestion?: string;
  severity: "error" | "warning" | "success";
}

export const validateEmail = (email: string): EmailValidationResult => {
  const trimmedEmail = email.trim();

  // Empty email
  if (!trimmedEmail) {
    return {
      isValid: false,
      error: "Email is required",
      severity: "error",
    };
  }

  // Check basic format
  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return {
      isValid: false,
      error: "Please enter a valid email address",
      severity: "error",
    };
  }

  // Check for spaces
  if (trimmedEmail.includes(" ")) {
    return {
      isValid: false,
      error: "Email cannot contain spaces",
      severity: "error",
    };
  }

  // Check for multiple @ symbols
  if ((trimmedEmail.match(/@/g) || []).length > 1) {
    return {
      isValid: false,
      error: "Email cannot contain multiple @ symbols",
      severity: "error",
    };
  }

  const [localPart, domain] = trimmedEmail.split("@");

  // Check local part length (before @)
  if (localPart.length === 0 || localPart.length > 64) {
    return {
      isValid: false,
      error: "Email local part must be 1-64 characters",
      severity: "error",
    };
  }

  // Check domain length
  if (domain.length === 0 || domain.length > 255) {
    return {
      isValid: false,
      error: "Email domain must be 1-255 characters",
      severity: "error",
    };
  }

  // Check for consecutive dots
  if (trimmedEmail.includes("..")) {
    return {
      isValid: false,
      error: "Email cannot contain consecutive dots",
      severity: "error",
    };
  }

  // Check if domain starts or ends with dot
  if (domain.startsWith(".") || domain.endsWith(".")) {
    return {
      isValid: false,
      error: "Email domain cannot start or end with a dot",
      severity: "error",
    };
  }

  // Check for common typos
  const typoSuggestion = COMMON_TYPOS[domain.toLowerCase()];
  if (typoSuggestion) {
    return {
      isValid: true,
      severity: "warning",
      suggestion: `${localPart}@${typoSuggestion}`,
      error: `Did you mean ${localPart}@${typoSuggestion}?`,
    };
  }

  // Valid email
  return {
    isValid: true,
    severity: "success",
  };
};

/**
 * Check if email domain has common providers
 * Helps identify if user is using legitimate email service
 */
export const isCommonEmailProvider = (email: string): boolean => {
  const domain = email.split("@")[1]?.toLowerCase() || "";
  const commonProviders = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "mail.com",
    "protonmail.com",
    "icloud.com",
    "aol.com",
    "yandex.com",
    "gmx.com",
  ];
  return commonProviders.includes(domain);
};

/**
 * Check for disposable/temporary email services
 * Prevents spam and throwaway accounts
 */
export const isDisposableEmail = (email: string): boolean => {
  const domain = email.split("@")[1]?.toLowerCase() || "";
  const disposableDomains = [
    "tempmail.com",
    "throwaway.email",
    "mailinator.com",
    "guerrillamail.com",
    "10minutemail.com",
    "temp-mail.org",
    "yopmail.com",
  ];
  return disposableDomains.includes(domain);
};
