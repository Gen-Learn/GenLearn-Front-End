import { useCallback, useState } from "react";
import { submitQuiz } from "../services/quizService";
import type { QuizSubmitPayload, QuizSubmissionResponse } from "../types/quizModel";

export const useSubmitQuiz = (quizId: string | null) => {
  const [data, setData] = useState<QuizSubmissionResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = useCallback(async (payload: QuizSubmitPayload) => {
    if (!quizId) return null;

    setLoading(true);
    setError(null);

    try {
      const result = await submitQuiz(quizId, payload);
      setData(result);
      return result;
    } catch (err) {
      const submissionError = err as Error;
      setError(submissionError);
      throw submissionError;
    } finally {
      setLoading(false);
    }
  }, [quizId]);

  return { data, error, loading, submit };
};