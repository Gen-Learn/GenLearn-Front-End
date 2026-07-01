import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Badge, Card, LinearProgress } from "@/components/ui";
import { useGetSingleCource } from "../../hooks/useGetSingleCource";
import { Lecture } from "@/types/coursesModel";
import { formatDuration } from "./utils/formatDuration";
import { CourseSidebar, ContentPlayerArea, LectureTabs, CourseRightPanel } from "./components";
import { Award, ChevronRight, Clock, BookOpen } from "lucide-react";
import { FullPageLoader } from "@/components/loading";
import { EmptyState } from "@/components/empty-states";

type TabKey = "transcript" | "notes" | "materials";

type SelectedItem =
  | { type: "lecture"; id: string | null }
  | { type: "lectureQuiz"; id: string | null }
  | { type: "sectionQuiz"; id: string | null }
  | null;

export default function CourseContent() {
  const { id: CourceId } = useParams<{ id: string }>();
  const courseId = CourceId || "";
  const { course, loading, error } = useGetSingleCource(courseId);
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [quizId, setQuizId] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("transcript");
  const [notesByLecture, setNotesByLecture] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!course) return;

    setExpandedSections(course.sections.map((section) => section.id));

    if (!selectedLecture) {
      const firstLecture = course.sections?.[0]?.lectures?.[0] ?? null;
      setSelectedLecture(firstLecture);
      if (firstLecture) {
        setSelectedItem({ type: "lecture", id: firstLecture.id });
      }
    }
  }, [course, selectedLecture]);

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
  };

  const handleSelectSectionQuiz = (sectionQuizId: string, sectionId: string) => {
    setSelectedItem({ type: "sectionQuiz", id: sectionId });
    setQuizId(sectionQuizId);
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
    <div className="min-h-screen bg-[#FAFAFC] flex">
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

      <main className="flex-1 flex flex-col">
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

        <div className="flex-1 flex">
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 border-b border-gray-100 bg-white">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span>{currentSection?.title ?? currentSection?.name ?? "Section"}</span>
                <ChevronRight className="w-4 h-4" />
                <span>Lecture</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedLecture?.title ?? selectedLecture?.name ?? "Select a lecture"}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatDuration(typeof selectedLecture?.duration === "number" ? selectedLecture.duration : Number(selectedLecture?.duration) || 0)}
                  </span>
                  <Badge variant={selectedLecture?.completed ? "success" : "gray"}>
                    {selectedLecture?.completed ? "Completed" : "In Progress"}
                  </Badge>
                </div>
                {!selectedLecture?.completed && !showQuiz && (
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

          <CourseRightPanel
            selectedLecture={selectedLecture}
            currentSection={currentSection}
            onTakeLectureQuiz={() => {
              if (!selectedLecture?.quizzes?.[0]?.id) return;
              setQuizId(selectedLecture.quizzes[0].id);
              setSelectedItem({ type: "lectureQuiz", id: selectedLecture.id });
            }}
            onStartSectionQuiz={() => {
              if (!currentSection?.quizzes?.[0]?.id) return;
              setQuizId(currentSection.quizzes[0].id);
              setSelectedItem({ type: "sectionQuiz", id: currentSection.id });
            }}
            isQuizActive={Boolean(quizId)}
          />
        </div>
      </main>
    </div>
  );
}
