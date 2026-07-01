export interface OnboardingQuestion {
  id: string;
  title: string;
  description: string;
  type: "single_select" | "multi_select";
  required: boolean;
  options: string[];
}

export interface OnboardingQuestionsResponse {
  statusCode: number;
  data: {
    questions: OnboardingQuestion[];
  };
}

export interface OnboardingSubmitPayload {
  skipped: boolean;
  occupation?: string;
  interests?: string[];
  learningGoal?: string;
  experienceLevel?: string;
  preferredLearningStyle?: string[];
  weeklyLearningGoal?: string;
}

export interface OnboardingSubmitResponse {
  statusCode: number;
  message: string;
  data: {
    onboardingStatus: "completed" | "skipped";
  };
}

export interface OnboardingFormData {
  occupation: string;
  interests: string[];
  learningGoal: string;
  experienceLevel: string;
  preferredLearningStyle: string[];
  weeklyLearningGoal: string;
}
