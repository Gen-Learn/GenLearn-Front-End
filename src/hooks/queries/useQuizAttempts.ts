import { useQuery } from "@tanstack/react-query";
import { getQuizAttempts } from "../../services/quizService";

export const useQuizAttempts = (quizId: string) => {
  return useQuery({
    queryKey: [ "quiz-attempts", quizId ],

    queryFn: () => getQuizAttempts(quizId),

    enabled: !!quizId,

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,

    retry: 2,

    refetchOnWindowFocus: false,
  });
};