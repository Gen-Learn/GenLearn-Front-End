import { useCallback, useEffect, useMemo, useState } from "react";
import { getQuiz } from "../services/quizService";
import type { Quiz, QuizAttempt } from "../types/quizModel";

type QuizView = "quiz" | "prompt" | "review";

export const useQuiz = (quizId: string, attempts: QuizAttempt[]) => {
  // --- Fetching state (from useGetQuiz) ---
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!quizId) {
      setQuiz(null);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchQuiz = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getQuiz(quizId);
        setQuiz(data);
      } catch (err) {
        setQuiz(null);
        setError("Failed to fetch quiz");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  // --- Session state (from useQuizSession) ---
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [view, setView] = useState<QuizView>("quiz");
  const [reviewAnswerIndex, setReviewAnswerIndex] = useState(0);

  const resetState = useCallback(() => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setReviewAnswerIndex(0);
    setView("quiz");
  }, []);

  useEffect(() => {
    resetState();
  }, [quizId, resetState]);

  const answeredCount = useMemo(() => Object.keys(selectedAnswers).length, [selectedAnswers]);

  const currentQuestion = quiz?.questions?.[currentQuestionIndex] ?? null;
  const totalQuestions = quiz?.questions?.length ?? 0;
  const isLastQuestion = totalQuestions > 0 && currentQuestionIndex === totalQuestions - 1;
  const allQuestionsAnswered = totalQuestions > 0 && answeredCount === totalQuestions;
  const latestAttempt = attempts[attempts.length - 1] ?? null;
  const currentReviewAnswer = latestAttempt?.answers?.[reviewAnswerIndex] ?? null;
  const isLastReviewAnswer =
    !!latestAttempt && reviewAnswerIndex === latestAttempt.answers.length - 1;

  const handleStartQuiz = useCallback(() => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setReviewAnswerIndex(0);
    setView("quiz");
  }, []);

  const handleReviewLatestAttempt = useCallback(() => {
    setReviewAnswerIndex(0);
    setView("review");
  }, []);

  const handleSelectAnswer = useCallback((questionId: string, optionId: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  }, []);

  const handleReset = useCallback(() => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setReviewAnswerIndex(0);
    setView("quiz");
  }, []);

  const handleNext = useCallback(() => {
    if (!quiz || !currentQuestion) return;
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }, [quiz, currentQuestion, currentQuestionIndex]);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }, [currentQuestionIndex]);

  const goToPreviousReviewAnswer = useCallback(() => {
    setReviewAnswerIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const goToNextReviewAnswer = useCallback(() => {
    if (!latestAttempt) return;
    setReviewAnswerIndex((prev) => Math.min(latestAttempt.answers.length - 1, prev + 1));
  }, [latestAttempt]);

  const showPrompt = useCallback((hasAttempts: boolean) => {
    setView(hasAttempts ? "prompt" : "quiz");
  }, []);

  const showReview = useCallback(() => {
    setReviewAnswerIndex(0);
    setView("review");
  }, []);

  return {
    // fetching
    quiz,
    loading,
    error,
    // session
    selectedAnswers,
    currentQuestionIndex,
    view,
    reviewAnswerIndex,
    answeredCount,
    currentQuestion,
    totalQuestions,
    isLastQuestion,
    allQuestionsAnswered,
    latestAttempt,
    currentReviewAnswer,
    isLastReviewAnswer,
    handleStartQuiz,
    handleReviewLatestAttempt,
    handleSelectAnswer,
    handleReset,
    handleNext,
    handlePrevious,
    goToPreviousReviewAnswer,
    goToNextReviewAnswer,
    showPrompt,
    showReview,
  };
};