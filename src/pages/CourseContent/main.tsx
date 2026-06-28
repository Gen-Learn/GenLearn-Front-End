import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChaptersDetails } from "./ChaptersDetails";
import CahpterVideo from "./CahpterVideo";
import { Lecture } from "../../types/coursesModel";
import { useGetSingleCource } from "../../hooks/useGetSingleCource";
function CourseContent() {
  const { id: CourceId } = useParams<{ id: string }>();
  const [quizId, setQuizId] = useState<string | null>(null);
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
  const { course, loading: courseLoading, error: courseError } = useGetSingleCource(CourceId || "");

  useEffect(() => {
    const firstLecture = course?.sections?.[0]?.lectures?.[0];
    if (firstLecture) {
      setSelectedLecture(firstLecture);
    }
  }, [course]);

  return (
    <main className="flex justify-center items-center">
      <div className="w-[80%] grid gap-4 grid-cols-1 md:grid-cols-3 justify-start items-start mb-5 ">
        <CahpterVideo
          CourceId={CourceId!}
          className="md:col-span-2"
          selectedLecture={selectedLecture}
          quizId={quizId}
          setQuizId={setQuizId}
        />
        <ChaptersDetails
          CourceId={CourceId!}
          className="self-start sticky top-0"
          onSelectLecture={setSelectedLecture}
          setQuizId={setQuizId}
      />
      </div>
    </main>
  );
}

export default CourseContent;
