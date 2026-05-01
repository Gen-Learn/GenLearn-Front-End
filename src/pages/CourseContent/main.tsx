import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChaptersDetails } from "./ChaptersDetails";
import CahpterVideo from "./CahpterVideo";
import { Lecture } from "../../types/coursesModel";
import axiosInstance from "../../services/axios";
import Course from "../../types/coursesModel";

const domain = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

function CourseContent() {
  const { id } = useParams<{ id: string }>();
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);

  // Initialize with first lecture as soon as course ID is available
  useEffect(() => {
    const fetchAndSetFirstLecture = async () => {
      try {
        const response = await axiosInstance.get(
          `${domain}/api/v1/courses/${id}`,
        );
        const courseData: Course = response.data.data.course;

        // Set the first lecture as default
        if (
          courseData.sections &&
          courseData.sections.length > 0 &&
          courseData.sections[0].lectures &&
          courseData.sections[0].lectures.length > 0
        ) {
          setSelectedLecture(courseData.sections[0].lectures[0]);
        }
      } catch (err) {
        console.error("Failed to fetch course:", err);
      }
    };

    if (id) {
      fetchAndSetFirstLecture();
    }
  }, [id]);

  return (
    <main className="flex justify-center items-center">
      <div className="w-[80%] grid gap-4 grid-cols-1 md:grid-cols-3 justify-start items-start mb-5 ">
        <CahpterVideo
          id={id!}
          className="md:col-span-2"
          selectedLecture={selectedLecture}
        />
        <ChaptersDetails
          id={id!}
          className="self-start sticky top-0"
          onSelectLecture={setSelectedLecture}
        />
      </div>
    </main>
  );
}

export default CourseContent;
