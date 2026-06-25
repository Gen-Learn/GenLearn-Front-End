import axiosInstance from "./axios";

const domain = import.meta.env.VITE_API_BASE_URL;

export const getQuiz = async (quizId: string) => {
  const response = await axiosInstance.get(`${domain}/api/v1/quizzes/${quizId}`);
  return response.data;
}