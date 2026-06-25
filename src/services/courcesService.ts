import axiosInstance from "./axios";

const domain = import.meta.env.VITE_API_BASE_URL;

export const getCourses = async () => {
  const response = await axiosInstance.get(`${domain}/api/v1/courses`);

  return response;
};