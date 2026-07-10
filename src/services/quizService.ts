import axiosInstance from "./axios";
import type {
  Quiz,
  QuizAttempt,
  QuizSubmitPayload,
  QuizSubmissionResponse,
} from "../types/quizModel";

export const getQuiz = async (quizId: string): Promise<Quiz> => {
  const response = await axiosInstance.get(`/api/v1/quizzes/${quizId}`);
  return response.data;
};

export const getQuizAttempts = async (
  quizId: string
): Promise<QuizAttempt[]> => {
  const response = await axiosInstance.get(
    `/api/v1/quizzes/${quizId}/attempts`
  );

  return response.data;
};

export const submitQuiz = async (
  quizId: string,
  payload: QuizSubmitPayload
): Promise<QuizSubmissionResponse> => {
  const response = await axiosInstance.post(
    `/api/v1/quizzes/${quizId}/submit`,
    payload
  );

  return response.data;
};