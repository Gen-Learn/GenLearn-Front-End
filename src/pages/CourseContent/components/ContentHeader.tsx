import { Clock, ChevronRight, Award, PenLine, BookOpen, FileText } from "lucide-react";
import { Badge, Button } from "@/components/ui";
import { Lecture, Section } from "@/types/coursesModel";

type Props = {
  selectedLecture?: Lecture | null;
  currentSection?: Section | null;
  isQuizVisible: boolean;
  onTakeLectureQuiz: () => void;
};

export default function ContentHeader({
  selectedLecture,
  currentSection,
  isQuizVisible,
  onTakeLectureQuiz,
}: Props) {
  return (
    <div className="p-6 border-b border-gray-100 bg-white rounded-t-3xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span>{currentSection?.title ?? currentSection?.name ?? "Section"}</span>
            <ChevronRight className="w-4 h-4" />
            <span>Lecture</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{selectedLecture?.name ?? "Select a lecture"}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {selectedLecture?.duration ?? "00:00"}
            </span>
            <Badge variant={selectedLecture?.completed ? "success" : "secondary"}>
              {selectedLecture?.completed ? "Completed" : "In Progress"}
            </Badge>
          </div>
        </div>

        {!selectedLecture?.completed && !isQuizVisible && (
          <Button variant="secondary" size="sm" onClick={onTakeLectureQuiz}>
            <Award className="w-4 h-4" />
            Take Quiz
          </Button>
        )}
      </div>
    </div>
  );
}
