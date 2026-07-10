import { useCallback, useEffect, useMemo, useState } from "react";
import type { Quiz, QuizAttempt } from "../../types/quizModel";

type QuizView = "quiz" | "prompt" | "review";

export const useQuizSession = (
  quiz: Quiz | undefined,
  attempts: QuizAttempt[]
) => {
  const [ selectedAnswers, setSelectedAnswers ] = useState<
    Record<string, string>
  >({});

  const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0);

  const [ reviewAnswerIndex, setReviewAnswerIndex ] = useState(0);

  const [ view, setView ] = useState<QuizView>("quiz");

  const resetState = useCallback(() => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setReviewAnswerIndex(0);
    setView("quiz");
  }, []);

  useEffect(() => {
    resetState();
  }, [ quiz?.id, resetState ]);

  const answeredCount = useMemo(
    () => Object.keys(selectedAnswers).length,
    [ selectedAnswers ]
  );

  const currentQuestion =
    quiz?.questions[ currentQuestionIndex ] ?? null;

  const totalQuestions = quiz?.questions.length ?? 0;

  const isLastQuestion =
    totalQuestions > 0 &&
    currentQuestionIndex === totalQuestions - 1;

  const allQuestionsAnswered =
    totalQuestions > 0 &&
    answeredCount === totalQuestions;

  const latestAttempt = attempts[ 0 ] ?? null;

  const currentReviewAnswer =
    latestAttempt?.answers[ reviewAnswerIndex ] ?? null;

  const isLastReviewAnswer =
    !!latestAttempt &&
    reviewAnswerIndex === latestAttempt.answers.length - 1;

  const handleStartQuiz = useCallback(() => {
    resetState();
  }, [ resetState ]);

  const handleReviewLatestAttempt = useCallback(() => {
    setReviewAnswerIndex(0);
    setView("review");
  }, []);

  const handleSelectAnswer = useCallback(
    (questionId: string, optionId: string) => {
      setSelectedAnswers((prev) => ({
        ...prev,
        [ questionId ]: optionId,
      }));
    },
    []
  );

  const handleReset = useCallback(() => {
    resetState();
  }, [ resetState ]);

  const handleNext = useCallback(() => {
    if (!quiz) return;

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }, [ quiz, currentQuestionIndex ]);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }, [ currentQuestionIndex ]);

  const goToPreviousReviewAnswer = useCallback(() => {
    setReviewAnswerIndex((prev) =>
      Math.max(prev - 1, 0)
    );
  }, []);

  const goToNextReviewAnswer = useCallback(() => {
    if (!latestAttempt) return;

    setReviewAnswerIndex((prev) =>
      Math.min(prev + 1, latestAttempt.answers.length - 1)
    );
  }, [ latestAttempt ]);

  const showPrompt = useCallback((hasAttempts: boolean) => {
    setView(hasAttempts ? "prompt" : "quiz");
  }, []);

  const showReview = useCallback(() => {
    setReviewAnswerIndex(0);
    setView("review");
  }, []);

  return {
    selectedAnswers,
    currentQuestionIndex,
    reviewAnswerIndex,
    view,

    answeredCount,
    currentQuestion,
    totalQuestions,
    latestAttempt,
    currentReviewAnswer,

    isLastQuestion,
    isLastReviewAnswer,
    allQuestionsAnswered,

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