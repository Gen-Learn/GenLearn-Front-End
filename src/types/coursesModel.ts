export default interface Course {
  id: string;
  name: string;
  description: string;
  numsOfSections: number;
  status: string;
  courseDurationInMinutes: number;
  progress: number;
  createdAt: string;
  updatedAt: string;
  sections: Section[];
}

export interface QuizReference {
  id: string;
}

export interface Section {
  id: string;
  name: string;
  title?: string;
  lectures: Lecture[];
  quizzes?: QuizReference[];
  quiz?: SectionQuiz;
}

export interface Lecture {
  id: string;
  name: string;
  title?: string;
  url: string;
  duration?: string;
  completed?: boolean;
  durationInMinutes?: number;
  scripts: Script[];
  quizzes?: QuizReference[];
}

export interface SectionQuiz {
  id: string;
  title: string;
  questions: number;
  passed?: boolean;
  locked?: boolean;
}

export interface Script {
  id: string;
  language: string;
  content: string;
}
