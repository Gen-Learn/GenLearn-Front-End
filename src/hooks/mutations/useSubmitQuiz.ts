import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitQuiz } from "../../services/quizService";
import type {
  QuizSubmitPayload,
  QuizSubmissionResponse,
} from "../../types/quizModel";

export const useSubmitQuiz = (quizId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    QuizSubmissionResponse,
    Error,
    QuizSubmitPayload
  >({
    mutationFn: (payload) => submitQuiz(quizId, payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ "quiz-attempts", quizId ],
      });

      await queryClient.invalidateQueries({
        queryKey: [ "quiz", quizId ],
      });
    },
  });
};