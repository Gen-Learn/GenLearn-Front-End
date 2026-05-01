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
export interface Section {
  id: string;
  name: string;
  lectures: Lecture[];
}
export interface Lecture {
  id: string;
  name: string;
  url: string;
  scripts: Script[];
}
export interface Script {
  id: string;
  language: string;
  content: string;
}
