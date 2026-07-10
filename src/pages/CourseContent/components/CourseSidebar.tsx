import { Link } from "react-router-dom";
import { ArrowLeft, Award, CheckCircle2, ChevronDown, Circle, Film } from "lucide-react";
import { Badge, LinearProgress } from "@/components/ui";
import { Lecture, Section } from "@/types/coursesModel";
import Course from "@/types/coursesModel";
import {formatDuration} from "../utils/formatDuration";
type SelectedItem =
  | { type: "lecture"; id: string | null }
  | { type: "lectureQuiz"; id: string | null }
  | { type: "sectionQuiz"; id: string | null }
  | null;

type Props = {
  course: Course;
  currentLectureId: string;
  expandedSections: string[];
  selectedItem: SelectedItem;
  onToggleSection: (sectionId: string) => void;
  onSelectLecture: (lecture: Lecture) => void;
  onSelectLectureQuiz: (quizId: string, lectureId: string) => void;
  onSelectSectionQuiz: (quizId: string, sectionId: string) => void;
};

export default function CourseSidebar({
  course,
  currentLectureId,
  expandedSections,
  selectedItem,
  onToggleSection,
  onSelectLecture,
  onSelectLectureQuiz,
  onSelectSectionQuiz,
}: Props) {
  const totalLectures = course.sections.reduce(
    (acc :number, section:Section) => acc + (section.lectures?.length || 0),
    0
  );
  const completedLectures = course.sections.reduce(
    (acc :number, section:Section) => acc + (section.lectures?.filter((lecture) => lecture.done).length || 0),
    0
  );

  return (
    <aside className="w-80 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
      <div className="p-4 border-b border-gray-100">
        <Link
          to="/courses"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Course
        </Link>
        <h2 className="font-bold text-gray-900 line-clamp-2">{course.name}</h2>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
          <span>{completedLectures}/{totalLectures} completed</span>
        </div>
        <LinearProgress value={Math.round((completedLectures / Math.max(totalLectures, 1)) * 100)} className="mt-2" />
      </div>

      <div className="flex-1 overflow-y-auto">
        {course.sections.map((section :Section, sIndex :number) => {
          const sectionCompletedLectures = section.lectures.filter((lecture) => lecture.done).length;
          const isExpanded = expandedSections.includes(section.id);
          const sectionQuizId = section.quizzes?.[0]?.id || undefined;

          return (
            <div key={section.id} className="border-b border-gray-50">
              <button
                onClick={() => onToggleSection(section.id)}
                className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-500">Section {sIndex + 1}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  />
                </div>
                <h3 className="font-semibold text-gray-900">{section.name}</h3>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                  <span>{sectionCompletedLectures}/{section.lectures.length} lectures</span>
                </div>
              </button>

              {isExpanded && (
                <div className="pb-4 px-4">
                  {section.lectures.map((lecture) => {
                    const isCurrent = lecture.id === currentLectureId;
                    return (
                      <button
                        key={lecture.id}
                        onClick={() => {
                          onSelectLecture(lecture);
                        }}
                        className={`w-full flex items-center gap-3 p-2 rounded-xl text-left transition-colors ${
                          isCurrent
                            ? "bg-primary-50 text-primary-600"
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <div className="flex-shrink-0">
                          {lecture.done ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <Circle className={`w-5 h-5 ${isCurrent ? "text-primary-300" : "text-gray-200"}`} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{lecture.name}</p>
                          <p className="text-xs text-gray-500">{formatDuration(typeof lecture?.durationInMinutes === "number" ? lecture.durationInMinutes : Number(lecture?.durationInMinutes) || 0)}</p>
                        </div>
                        <Film className={`w-4 h-4 ${isCurrent ? "text-primary-400" : "text-gray-300"}`} />
                      </button>
                    );
                  })}

                  {sectionQuizId && (
                    <button
                      onClick={() => onSelectSectionQuiz(sectionQuizId, section.id)}
                      className="w-full flex items-center gap-3 p-2 rounded-xl text-left hover:bg-amber-50 transition-colors mt-2"
                    >
                      <div className="flex-shrink-0">
                        <Award className="w-5 h-5 text-amber-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">Section Quiz</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">Quiz</Badge>
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
