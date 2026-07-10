// services/courcesService.ts

import axiosInstance from "./axios";
import Course from "../types/coursesModel";

interface CoursesResponse {
  data: {
    courses: Course[];
  };
}

export const getCourses = async (): Promise<Course[]> => {
  const response = await axiosInstance.get<CoursesResponse>(
    "/api/v1/courses"
  );

  return response.data.data.courses;
};