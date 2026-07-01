import axiosInstance from "./axios";
import {
  OnboardingQuestionsResponse,
  OnboardingSubmitPayload,
  OnboardingSubmitResponse,
} from "../types/onboardingModel";

const onboardingService = {
  /**
   * GET /api/v1/onboarding/questions
   * Fetches static onboarding questions for the user
   */
  getQuestions: async (): Promise<OnboardingQuestionsResponse> => {
    const { data } = await axiosInstance.get<OnboardingQuestionsResponse>(
      "/api/v1/onboarding/questions"
    );
    return data;
  },

  /**
   * POST /api/v1/onboarding
   * Submits onboarding answers or skips onboarding
   */
  submitOnboarding: async (
    payload: OnboardingSubmitPayload
  ): Promise<OnboardingSubmitResponse> => {
    const { data } = await axiosInstance.post<OnboardingSubmitResponse>(
      "/api/v1/onboarding",
      payload
    );
    return data;
  },
};

export default onboardingService;
