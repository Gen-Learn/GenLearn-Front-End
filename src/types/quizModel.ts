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

export interface Quiz {
  id: string;
  scope: "lecture" | "section";
  createdAt: string;
  questions: QuizQuestion[];
}