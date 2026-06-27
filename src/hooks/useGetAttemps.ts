import { useCallback, useEffect, useState } from "react";
import { getQuizAttempts } from "../services/quizService";
import type { QuizAttempt } from "../types/quizModel";

export const useGetAttemps = (quizId: string | null) => {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAttempts = useCallback(async () => {
    if (!quizId) {
      setAttempts([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fetchedAttempts = await getQuizAttempts(quizId);
      setAttempts(fetchedAttempts);
    } catch {
      setAttempts([]);
      setError("Failed to load quiz attempts");
    } finally {
      setLoading(false);
    }
  }, [quizId]);

  useEffect(() => {
    void loadAttempts();
  }, [loadAttempts]);

  return { attempts, loading, error, loadAttempts };
};