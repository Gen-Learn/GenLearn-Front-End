import axiosInstance from "./axios";

const domain = import.meta.env.VITE_API_BASE_URL;

export const getSingleCource = async (id: string) => {
  const response = await axiosInstance.get(`${domain}/api/v1/courses/${id}`);
  return response.data;
};