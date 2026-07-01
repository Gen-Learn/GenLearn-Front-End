import { useState, useEffect } from "react";
import onboardingService from "../services/onboardingService";
import { OnboardingQuestion } from "../types/onboardingModel";

interface UseOnboardingQuestionsReturn {
  questions: OnboardingQuestion[];
  isLoading: boolean;
  error: string | null;
}

export const useOnboardingQuestions = (): UseOnboardingQuestionsReturn => {
  const [questions, setQuestions] = useState<OnboardingQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await onboardingService.getQuestions();
        setQuestions(response.data.questions);
      } catch (err: unknown) {
        if (err instanceof Error) {
          const axiosError = err as {
            response?: { data?: { detail?: string; message?: string } };
          };
          const errorMessage =
            axiosError.response?.data?.message ||
            axiosError.response?.data?.detail ||
            err.message ||
            "Failed to load onboarding questions";
          setError(errorMessage);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return { questions, isLoading, error };
};
