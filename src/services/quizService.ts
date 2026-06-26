import axiosInstance from "./axios";
import type { QuizAttempt, QuizSubmitPayload, QuizSubmissionResponse } from "../types/quizModel";

const domain = import.meta.env.VITE_API_BASE_URL;

export const getQuiz = async (quizId: string) => {
  const response = await axiosInstance.get(`${domain}/api/v1/quizzes/${quizId}`);
  return response.data?.data ?? response.data;
};

export const submitQuiz = async (
  quizId: string,
  payload: QuizSubmitPayload,
): Promise<QuizSubmissionResponse> => {
  const response = await axiosInstance.post(
    `${domain}/api/v1/quizzes/${quizId}/submit`,
    payload,
  );
  return response.data?.data ?? response.data;
};

export const getQuizAttempts = async (quizId: string): Promise<QuizAttempt[]> => {
  const response = await axiosInstance.get(
    `${domain}/api/v1/quizzes/${quizId}/attempts`,
  );
  return response.data?.data ?? response.data;
};