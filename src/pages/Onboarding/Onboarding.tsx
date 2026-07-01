import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router";
import { Loader2, ArrowLeft, CheckCircle, Zap, ChevronDown, ChevronUp } from "lucide-react";
import Button from "../../components/ui/Button";
import { useAuth } from "../../contexts/AuthContext";
import { useOnboardingQuestions } from "../../hooks/useOnboarding";
import onboardingService from "../../services/onboardingService";
import { OnboardingFormData } from "../../types/onboardingModel";

function Onboarding() {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const { questions, isLoading, error } = useOnboardingQuestions();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<OnboardingFormData>>({
    occupation: "",
    interests: [],
    learningGoal: "",
    experienceLevel: "",
    preferredLearningStyle: [],
    weeklyLearningGoal: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [expandedOptions, setExpandedOptions] = useState<Record<number, boolean>>({});

  // Redirect if user is not in pending onboarding status
  useEffect(() => {
    if (user && user.onboardingStatus !== "pending") {
      navigate("/");
    }
  }, [user?.onboardingStatus, navigate, user]);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleSingleSelect = (value: string) => {
    const questionId = currentQuestion.id as keyof OnboardingFormData;
    setFormData((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleMultiSelect = (value: string) => {
    const questionId = currentQuestion.id as keyof OnboardingFormData;
    const currentValues = (formData[questionId] as string[]) || [];
    const isSelected = currentValues.includes(value);

    setFormData((prev) => ({
      ...prev,
      [questionId]: isSelected
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value],
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setSubmitError(null);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setSubmitError(null);
    }
  };

  const handleSkip = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await onboardingService.submitOnboarding({ skipped: true });
      // Refresh user data to update onboardingStatus in context
      await refreshUser();
      // Force navigation and clear any redirect hooks
      navigate("/", { replace: true });
    } catch (err: unknown) {
      if (err instanceof Error) {
        const axiosError = err as {
          response?: { data?: { detail?: string; message?: string } };
        };
        const errorMessage =
          axiosError.response?.data?.message ||
          axiosError.response?.data?.detail ||
          err.message ||
          "Failed to skip onboarding";
        setSubmitError(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await onboardingService.submitOnboarding({
        skipped: false,
        ...formData,
      });
      // Refresh user data to update onboardingStatus in context
      await refreshUser();
      // Force navigation and clear any redirect hooks
      navigate("/", { replace: true });
    } catch (err: unknown) {
      if (err instanceof Error) {
        const axiosError = err as {
          response?: { data?: { detail?: string; message?: string } };
        };
        const errorMessage =
          axiosError.response?.data?.message ||
          axiosError.response?.data?.detail ||
          err.message ||
          "Failed to submit onboarding";
        setSubmitError(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-500/10 to-secondary-500/10 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative w-16 h-16 mb-4 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-primary-100" />
            <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin" />
          </div>
          <p className="text-gray-600 font-medium">Loading onboarding...</p>
        </div>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-500/10 to-secondary-500/10 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 text-red-500">
            <p className="text-lg font-semibold">Unable to Load Onboarding</p>
            <p className="text-sm text-gray-600 mt-2">{error || "No questions available"}</p>
          </div>
          <Button onClick={() => navigate("/")} className="w-full">
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500/10 to-secondary-500/10 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <button
            onClick={handleSkip}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6 font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isSubmitting ? "Skipping..." : "Skip for now"}</span>
          </button>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-500 flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Personalize Your Learning</h1>
          </div>
          <p className="text-gray-600 mb-6">
            Help us understand your learning goals and preferences to recommend the best content
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentStep + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-primary-600">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          {/* Question Title */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentQuestion?.title}</h2>
            <p className="text-gray-600">{currentQuestion?.description}</p>
          </div>

          {/* Error Message */}
          {submitError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
              {submitError}
            </div>
          )}

          {/* Options */}
          {currentQuestion && (
            <div className="space-y-3 mb-8">
              {currentQuestion.type === "single_select" ? (
                // Radio Buttons
                currentQuestion.options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-primary-300 hover:bg-primary-50/30 transition-all"
                  >
                    <input
                      type="radio"
                      name={currentQuestion.id}
                      value={option}
                      checked={formData[currentQuestion.id as keyof OnboardingFormData] === option}
                      onChange={() => handleSingleSelect(option)}
                      className="w-5 h-5 text-primary-600 cursor-pointer"
                    />
                    <span className="ml-3 text-gray-700 font-medium">{option}</span>
                  </label>
                ))
              ) : (
                // Checkboxes or Collapsible for many options
                <div className="space-y-3">
                  {currentQuestion.options.length > 8 ? (
                    <div>
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedOptions((prev) => ({
                            ...prev,
                            [currentStep]: !prev[currentStep],
                          }))
                        }
                        className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-gray-200 hover:border-primary-300 transition-all"
                      >
                        <span className="font-medium text-gray-700">
                          {((formData[currentQuestion.id as keyof OnboardingFormData] as string[]) ||
                            []).length > 0
                            ? `${(
                                (formData[
                                  currentQuestion.id as keyof OnboardingFormData
                                ] as string[]) || []
                              ).length} selected`
                            : "Select options"}
                        </span>
                        {expandedOptions[currentStep] ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      {expandedOptions[currentStep] && (
                        <div className="mt-2 space-y-2 max-h-96 overflow-y-auto">
                          {currentQuestion.options.map((option) => (
                            <label
                              key={option}
                              className="flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-primary-50/30 transition-all"
                            >
                              <input
                                type="checkbox"
                                value={option}
                                checked={(
                                  (formData[
                                    currentQuestion.id as keyof OnboardingFormData
                                  ] as string[]) || []
                                ).includes(option)}
                                onChange={() => handleMultiSelect(option)}
                                className="w-4 h-4 text-primary-600 rounded cursor-pointer"
                              />
                              <span className="ml-3 text-gray-700 text-sm">{option}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    // Show all options
                    currentQuestion.options.map((option) => (
                      <label
                        key={option}
                        className="flex items-center p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-primary-300 hover:bg-primary-50/30 transition-all"
                      >
                        <input
                          type="checkbox"
                          value={option}
                          checked={(
                            (formData[
                              currentQuestion.id as keyof OnboardingFormData
                            ] as string[]) || []
                          ).includes(option)}
                          onChange={() => handleMultiSelect(option)}
                          className="w-5 h-5 text-primary-600 rounded cursor-pointer"
                        />
                        <span className="ml-3 text-gray-700 font-medium">{option}</span>
                      </label>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 0 || isSubmitting}
              variant="secondary"
              className="flex-1"
            >
              Previous
            </Button>

            {currentStep === questions.length - 1 ? (
              <Button onClick={handleSubmit} disabled={isSubmitting} className="flex-1">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Complete Onboarding
                  </>
                )}
              </Button>
            ) : (
              <Button onClick={handleNext} className="flex-1">
                Next
              </Button>
            )}
          </div>
        </div>

        {/* Skip Button */}
        <div className="text-center">
          <button
            onClick={handleSkip}
            disabled={isSubmitting}
            className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Skipping..." : "Skip Onboarding"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
