import { useQuery } from "@tanstack/react-query";
import { getQuiz } from "../../services/quizService";

export const useGetQuiz = (quizId: string) => {
  return useQuery({
    queryKey: [ "quiz", quizId ],

    queryFn: () => getQuiz(quizId),

    enabled: !!quizId,

    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,

    retry: 2,

    refetchOnWindowFocus: false,
  });
};