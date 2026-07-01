import { useEffect } from "react";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { useGetAttemps } from "../../../hooks/useGetAttemps";
import { useQuiz } from "../../../hooks/useGetQuiz";
import { useSubmitQuiz } from "../../../hooks/useSubmitQuiz";
import { QuizLoadingSkeleton } from '@/components/loading';
import { NoQuestionsYet } from '@/components/empty-states';

type QuizSectionProps = {
  quizId: string | null;
  onBackToVideo?: () => void;
};

export default function QuizSection({ quizId, onBackToVideo }: QuizSectionProps) {
  const { attempts, loading: attemptsLoading, error: attemptsError, loadAttempts } = useGetAttemps(quizId);
  const { error: submitHookError, loading: isSubmitting, submit } = useSubmitQuiz(quizId);
  const {
    quiz, 
    loading, 
    error,
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
  } = useQuiz(quizId || "", attempts);

  useEffect(() => {
    if (!quizId) return;
    if (!attemptsLoading) {
      showPrompt(attempts.length > 0);
    }
  }, [attempts.length, attemptsLoading, quizId, showPrompt]);

  const submitError = submitHookError ? submitHookError.message : null;

  const handleSelectAnswerWithReset = (questionId: string, optionId: string) => {
    handleSelectAnswer(questionId, optionId);
  };

  const handleSubmit = async () => {
    if (!quizId || !quiz) return;

    if (!allQuestionsAnswered) {
      return;
    }

    try {
      await submit({
        answers: quiz.questions.map((question) => ({
          questionId: question.id,
          selectedOptionId: selectedAnswers[question.id],
        })),
      });
      await loadAttempts();
      showReview();
    } catch {
      // submission errors are exposed via the hook state
    }
  };

  const handleResetQuiz = () => {
    handleReset();
  };

  const handleStartQuizWithReset = () => {
    handleStartQuiz();
  };

  if (!quizId) {
    return <NoQuestionsYet />;
  }

  return (
    <div className="rounded-2xl border border-purple-100 bg-linear-to-br from-purple-50 via-white to-violet-50 p-5 sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">
            Practice Quiz
          </p>
          <h3 className="text-lg font-semibold text-gray-900">
            Check your understanding
          </h3>
        </div>

        {onBackToVideo && (
          <button
            onClick={onBackToVideo}
            className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-3 py-2 text-sm font-medium text-purple-700 transition hover:bg-purple-100"
          >
            <FaArrowLeft />
            Back to video
          </button>
        )}
      </div>

      {loading && (
        <div className="flex min-h-55 items-center justify-center rounded-xl bg-white/70">
          <QuizLoadingSkeleton />
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && quiz && attemptsLoading && view === "quiz" && (
        <div className="rounded-xl border border-gray-200 bg-white/80 p-4 text-sm text-gray-500">
          Checking your previous attempts...
        </div>
      )}

      {!loading && !error && quiz && view === "prompt" && latestAttempt && (
        <div className="rounded-2xl border border-purple-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">
            Previous attempt found
          </p>
          <h4 className="mt-2 text-lg font-semibold text-gray-900">
            Your latest score: {latestAttempt.score}/{latestAttempt.totalQuestions} ({latestAttempt.percentage}%)
          </h4>
          <p className="mt-2 text-sm text-gray-600">
            Would you like to attempt one more time?
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={handleStartQuizWithReset}
              className="rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
            >
              Attempt again
            </button>
            <button
              onClick={handleReviewLatestAttempt}
              className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Review latest attempt
            </button>
          </div>
        </div>
      )}

      {!loading && !error && quiz && view === "quiz" && (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-purple-100 bg-white/80 px-4 py-3 text-sm text-gray-600">
            <span>{quiz.questions.length} questions</span>
            <span>{answeredCount} answered</span>
            <span>
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </span>
          </div>

          {currentQuestion && (
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-gray-800">
                  {currentQuestionIndex + 1}. {currentQuestion.question}
                </p>
              </div>

              <div className="space-y-2">
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedAnswers[currentQuestion.id] === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectAnswerWithReset(currentQuestion.id, option.id)}
                      className={`flex w-full items-center justify-start rounded-xl border px-3 py-3 text-left text-sm transition ${
                        isSelected
                          ? "border-purple-500 bg-purple-50 text-purple-800"
                          : "border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/70"
                      }`}
                    >
                        {isSelected ? (
                        <span className="mr-2 mt-0.5 h-2.5 w-2.5 rounded-full border border-current bg-current" />
                      ) : (
                        <span className="mr-2 mt-0.5 h-2.5 w-2.5 rounded-full border border-current " />
                      )}
                      
                      <span>{option.optionText}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              {isLastQuestion ? (
                <button
                  onClick={handleSubmit}
                  disabled={!allQuestionsAnswered || isSubmitting}
                  className="rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-purple-300"
                >
                  {isSubmitting ? "Submitting..." : "Submit quiz"}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
                >
                  Next
                </button>
              )}
            </div>
            <button
              onClick={handleResetQuiz}
              className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Reset answers
            </button>
          </div>

          {submitError && (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {submitError}
            </div>
          )}
        </>
      )}

      {!loading && !error && quiz && view === "review" && latestAttempt && currentReviewAnswer && (
        <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
                Review your submission
              </p>
              <h4 className="text-lg font-semibold text-gray-900">
                Score: {latestAttempt.score}/{latestAttempt.totalQuestions}
              </h4>
            </div>
            <div className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
              {latestAttempt.percentage}%
            </div>
          </div>

          <div className="mb-3 flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600">
            <span>Question {reviewAnswerIndex + 1} of {latestAttempt.answers.length}</span>
            <span>Attempt {latestAttempt.attemptNumber}</span>
          </div>

          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-sm font-semibold text-gray-800">{currentReviewAnswer.question}</p>
            <p className="mt-2 text-sm text-gray-600">
              Your answer: {currentReviewAnswer.selectedOptionText || "Not answered"}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Correct answer: {currentReviewAnswer.correctOption?.optionText || "Not available"}
            </p>
            {currentReviewAnswer.explanation && (
              <p className="mt-3 text-sm text-purple-700">{currentReviewAnswer.explanation}</p>
            )}
            <p className={`mt-3 text-sm font-medium ${currentReviewAnswer.isCorrect ? "text-emerald-600" : "text-red-600"}`}>
              {currentReviewAnswer.isCorrect ? "Correct" : "Incorrect"}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              <button
                onClick={goToPreviousReviewAnswer}
                disabled={reviewAnswerIndex === 0}
                className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous question
              </button>
              {isLastReviewAnswer ? (
                <button
                  onClick={handleStartQuizWithReset}
                  className="rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
                >
                  Attempt again
                </button>
              ) : (
                <button
                  onClick={goToNextReviewAnswer}
                  className="rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
                >
                  Next question
                </button>
              )}
            </div>
            <button
              onClick={handleResetQuiz}
              className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
