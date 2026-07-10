import axiosInstance from "./axios";
import Course from "../types/coursesModel";

interface CourseResponse {
  data: {
    course: Course;
  };
}

export const getSingleCource = async (id: string): Promise<Course> => {
  const response = await axiosInstance.get<CourseResponse>(
    `/api/v1/courses/${id}`
  );

  return response.data.data.course;
};