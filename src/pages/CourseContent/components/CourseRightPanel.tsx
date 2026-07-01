import { Award, Circle } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { Lecture, Section } from "@/types/coursesModel";

type Props = {
  selectedLecture?: Lecture | null;
  currentSection?: Section | null;
  onTakeLectureQuiz: () => void;
  onStartSectionQuiz: () => void;
  isQuizActive: boolean;
};

export default function CourseRightPanel({
  selectedLecture,
  currentSection,
  onTakeLectureQuiz,
  onStartSectionQuiz,
  isQuizActive,
}: Props) {
  return (
    <aside className="w-80 border-l border-gray-100 p-6 bg-gray-50/50">
      <Card className="bg-gradient-to-br from-primary-500 to-secondary-500 !text-white mb-6">
        <h3 className="font-bold text-lg mb-2">Section Quiz</h3>
        <p className="text-sm text-white/80 mb-4">
          Test your understanding of {currentSection?.name ?? "this section"}
        </p>
        <Button variant="secondary" className="w-full" onClick={onStartSectionQuiz}>
          Start Quiz
        </Button>
      </Card>

      {!selectedLecture?.completed && (
        <Card>
          <h4 className="font-semibold text-gray-900 mb-2">Complete This Lecture</h4>
          <p className="text-sm text-gray-600 mb-4">
            Watch the video and pass the quiz to mark this lecture as complete.
          </p>
          <div className="flex items-center gap-2">
            <Circle className="w-4 h-4 text-gray-300" />
            <span className="text-sm text-gray-500">Watch video</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Circle className="w-4 h-4 text-gray-300" />
            <span className="text-sm text-gray-500">Pass quiz (70%+)</span>
          </div>
          {selectedLecture?.quizzes?.length ? (
            <Button
              onClick={onTakeLectureQuiz}
              disabled={isQuizActive}
              className="w-full mt-4"
            >
              {isQuizActive ? "Quiz active" : "Take Lecture Quiz"}
            </Button>
          ) : null}
        </Card>
      )}
    </aside>
  );
}
