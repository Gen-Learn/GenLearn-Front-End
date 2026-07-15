import axiosInstance from "./axios";
import Course from "../types/coursesModel";

interface GetCoursesParams {
  page?: number;
  limit?: number;
  recent?: boolean;
}

interface CoursesResponse {
  data: {
    total: number;
    courses: Course[];
  };
}

export interface GetCoursesResult {
  courses: Course[];
  total: number;
}

export const getCourses = async (
  params: GetCoursesParams = {},
): Promise<GetCoursesResult> => {
  const response = await axiosInstance.get<CoursesResponse>(
    "/api/v1/courses",
    { params },
  );

  return {
    courses: response.data.data.courses,
    total: response.data.data.total,
  };
};