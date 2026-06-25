import axiosInstance from "./axios";

const domain = import.meta.env.VITE_API_BASE_URL;

export const getLecture =async (lectureId: string) => {
  const response = await axiosInstance.get(`${domain}/api/v1/lectures/${lectureId}`);
  return response.data;
}