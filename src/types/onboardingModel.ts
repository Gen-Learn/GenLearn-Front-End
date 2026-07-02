export interface OnboardingQuestionShowIf {
  questionId: string;
  value: string;
}

export interface OnboardingQuestion {
  id: string;
  title: string;
  description: string;
  type: "single_select" | "multi_select";
  required: boolean;
  options: string[];
  showIf?: OnboardingQuestionShowIf;
}

export interface OnboardingQuestionsResponse {
  statusCode: number;
  data: {
    questions: OnboardingQuestion[];
  };
}

export interface OnboardingSubmitPayload {
  skipped: boolean;
  userType?: string;
  fieldOfStudy?: string;
  medicalField?: string;
  researchField?: string;
  engineeringField?: string;
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

// Generic form data shape — values keyed by question id.
// Using an index signature because the set of conditional
// field-of-study keys (fieldOfStudy / medicalField / researchField /
// engineeringField) depends on the userType answer.
export interface OnboardingFormData {
  userType: string;
  fieldOfStudy: string;
  medicalField: string;
  researchField: string;
  engineeringField: string;
  interests: string[];
  learningGoal: string;
  experienceLevel: string;
  preferredLearningStyle: string[];
  weeklyLearningGoal: string;
  [key: string]: string | string[];
}