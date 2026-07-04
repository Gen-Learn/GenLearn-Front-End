import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Badge } from "@/components/ui";
import { useGetSingleCource } from "../../hooks/useGetSingleCource";
import { Lecture } from "@/types/coursesModel";
import { formatDuration } from "./utils/formatDuration";
import { CourseSidebar, ContentPlayerArea, LectureTabs} from "./components";
import { Award, ChevronRight, Clock, BookOpen, Menu, X } from "lucide-react";
import { FullPageLoader } from "@/components/loading";
import { EmptyState } from "@/components/empty-states";
import { Footer } from "@/layout//index";
type TabKey = "transcript" | "notes" | "materials";

type SelectedItem =
  | { type: "lecture"; id: string | null }
  | { type: "lectureQuiz"; id: string | null }
  | { type: "sectionQuiz"; id: string | null }
  | null;

export default function CourseContent() {
  const { courseId, sectionId, lectureId } = useParams<{ courseId: string; sectionId: string; lectureId: string }>();
  const { course, loading, error } = useGetSingleCource(courseId ?? "");
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [quizId, setQuizId] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("transcript");
  const [notesByLecture, setNotesByLecture] = useState<Record<string, string>>({});

  // Sidebar is an overlay drawer below `lg`, static column at `lg` and up.
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
  if (!course) return;

  setExpandedSections(course.sections.map((section) => section.id));

  // Try to resolve the lecture from the URL param first
  if (lectureId) {
    const matchedLecture = course.sections
      .flatMap((section) => section.lectures)
      .find((lecture) => lecture.id === lectureId);

    if (matchedLecture && matchedLecture.id !== selectedLecture?.id) {
      setSelectedLecture(matchedLecture);
      setSelectedItem({ type: "lecture", id: matchedLecture.id });
      setQuizId(null);
      setShowQuiz(false);
      setActiveTab("transcript");
      return;
    }
  }

  // Fallback: no valid lectureId in the URL, select the first lecture
  if (!selectedLecture) {
    const firstLecture = course.sections?.[0]?.lectures?.[0] ?? null;
    setSelectedLecture(firstLecture);
    if (firstLecture) {
      setSelectedItem({ type: "lecture", id: firstLecture.id });
    }
  }
}, [course, lectureId]);

  useEffect(() => {
    setShowQuiz(Boolean(quizId));
  }, [quizId]);

  const currentSection = useMemo(() => {
    if (!course || !selectedLecture) return null;
    return course.sections.find((section) =>
      section.lectures.some((lecture) => lecture.id === selectedLecture.id)
    ) ?? null;
  }, [course, selectedLecture]);

  const handleToggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    );
  };

  const handleSelectLecture = (lecture: Lecture) => {
  setSelectedLecture(lecture);
  setQuizId(null);
  setShowQuiz(false);
  setActiveTab("transcript");
  setSelectedItem({ type: "lecture", id: lecture.id });
  setIsSidebarOpen(false);
  navigate(`/course/${course?.id}/section/${currentSection?.id}/lecture/${lecture.id}`, { replace: true });
};

  const handleSelectLectureQuiz = (quizIdValue: string, lectureId: string) => {
    const lecture = course?.sections
      .flatMap((section) => section.lectures)
      .find((item) => item.id === lectureId);

    if (lecture) {
      setSelectedLecture(lecture);
      setSelectedItem({ type: "lectureQuiz", id: lectureId });
    }

    setQuizId(quizIdValue);
    setIsSidebarOpen(false);
  };

  const handleSelectSectionQuiz = (sectionQuizId: string, sectionId: string) => {
    setSelectedItem({ type: "sectionQuiz", id: sectionId });
    setQuizId(sectionQuizId);
    setIsSidebarOpen(false);
  };

  const handleCloseQuiz = () => {
    setQuizId(null);
    setShowQuiz(false);
  };

  const handleNotesChange = (value: string) => {
    if (!selectedLecture) return;
    setNotesByLecture((prev) => ({ ...prev, [selectedLecture.id]: value }));
  };

  const handleSaveNotes = () => {
    if (!selectedLecture) return;
    setNotesByLecture((prev) => ({ ...prev, [selectedLecture.id]: prev[selectedLecture.id] ?? "" }));
  };

  const currentNotes = selectedLecture ? notesByLecture[selectedLecture.id] ?? "" : "";

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFC]">
        <FullPageLoader />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-[#FAFAFC] flex items-center justify-center p-6">
        <EmptyState
          title="Unable to load course"
          description={error ?? "There was a problem loading this course."}
          icon={BookOpen}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col lg:flex-row relative">
      {/* Mobile top bar: sidebar toggle */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-30">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700"
        >
          <Menu className="w-5 h-5" />
          Course Content
        </button>
      </div>

      {/* Sidebar: overlay drawer on mobile/tablet, static column on lg+ */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] transform transition-transform duration-300 lg:static lg:z-auto lg:w-auto lg:max-w-none lg:transform-none lg:flex-shrink-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-full flex flex-col bg-white">
          <div className="lg:hidden flex items-center justify-end p-3 border-b border-gray-100">
            <button onClick={() => setIsSidebarOpen(false)} aria-label="Close sidebar">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <CourseSidebar
            course={course}
            currentLectureId={selectedLecture?.id ?? ""}
            expandedSections={expandedSections}
            selectedItem={selectedItem}
            onToggleSection={handleToggleSection}
            onSelectLecture={handleSelectLecture}
            onSelectLectureQuiz={handleSelectLectureQuiz}
            onSelectSectionQuiz={handleSelectSectionQuiz}
          />
        </div>
      </div>

      <main className="flex-1 flex flex-col min-w-0">
        <ContentPlayerArea
          courseId={courseId}
          selectedLecture={selectedLecture}
          quizId={quizId}
          showQuiz={showQuiz}
          onVideoEnded={() => {
            if (selectedLecture?.quizzes?.[0]?.id) {
              setQuizId(selectedLecture.quizzes[0].id);
              setSelectedItem({ type: "lectureQuiz", id: selectedLecture.id });
            }
          }}
          onCloseQuiz={handleCloseQuiz}
          loading={loading}
          error={error}
        />

        <div className="flex-1 flex flex-col xl:flex-row">
          <div className="flex-1 min-w-0 overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-gray-100 bg-white">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span className="truncate">{currentSection?.title ?? currentSection?.name ?? "Section"}</span>
                <ChevronRight className="w-4 h-4 flex-shrink-0" />
                <span>Lecture</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 break-words">
                {selectedLecture?.title ?? selectedLecture?.name ?? "Select a lecture"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatDuration(typeof selectedLecture?.durationInMinutes === "number" ? selectedLecture.durationInMinutes : Number(selectedLecture?.durationInMinutes) || 0)}
                  </span>
                  <Badge variant={selectedLecture?.completed ? "success" : "gray"}>
                    {selectedLecture?.completed ? "Completed" : "In Progress"}
                  </Badge>
                </div>
                {!selectedLecture?.completed && !showQuiz && selectedLecture?.quizzes?.[0]?.id && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      if (selectedLecture?.quizzes?.[0]?.id) {
                        setQuizId(selectedLecture.quizzes[0].id);
                        setSelectedItem({ type: "lectureQuiz", id: selectedLecture.id });
                      }
                    }}
                  >
                    <Award className="w-4 h-4" />
                    Take Quiz
                  </Button>
                )}
              </div>
            </div>

            <LectureTabs
              selectedLecture={selectedLecture}
              activeTab={activeTab}
              onChangeTab={setActiveTab}
              notes={currentNotes}
              onNotesChange={handleNotesChange}
              onSaveNotes={handleSaveNotes}
            />
          </div>
        </div>
      </main>
    </div>
  );
}