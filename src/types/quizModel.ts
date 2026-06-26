export interface QuizOption {
  id: string;
  optionText: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: "mcq";
  options: QuizOption[];
}

export interface QuizSubmissionAnswer {
  questionId: string;
  question?: string;
  selectedOptionId: string | null;
  selectedOptionText?: string | null;
  isCorrect?: boolean;
  correctOption?: QuizOption;
  explanation?: string;
}

export interface QuizAttempt {
  attemptId: string;
  attemptNumber: number;
  score: number;
  totalQuestions: number;
  percentage: number;
  createdAt: string;
  answers: QuizSubmissionAnswer[];
}

export interface QuizSubmissionResponse {
  attemptId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  answers: QuizSubmissionAnswer[];
}

export interface QuizSubmitPayload {
  answers: Array<{
    questionId: string;
    selectedOptionId: string;
  }>;
}

export interface Quiz {
  id: string;
  scope: "lecture" | "section";
  createdAt: string;
  questions: QuizQuestion[];
}