export default interface Course {
  id: string;
  name: string;
  description: string;
  numsOfSections: number;
  status: string;
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
  lectures: Lecture[];
  quizzes?: QuizReference[];
}
export interface Lecture {
  id: string;
  name: string;
  url: string;
  scripts: Script[];
  quizzes?: QuizReference[];
}
export interface Script {
  id: string;
  language: string;
  content: string;
}
