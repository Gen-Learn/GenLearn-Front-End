// services/courcesService.ts
import axiosInstance from "./axios";
import Course from "../types/coursesModel";

interface GetCoursesParams {
  page?: number;
  limit?: number;
  recent?: boolean;
}

interface CoursesResponse {
  data: {
    courses: Course[];
  };
}

export const getCourses = async (
  params: GetCoursesParams = {},
): Promise<Course[]> => {
  const response = await axiosInstance.get<CoursesResponse>(
    "/api/v1/courses",
    { params },
  );

  return response.data.data.courses;
};