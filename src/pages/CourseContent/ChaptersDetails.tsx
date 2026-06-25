import  { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import  { Lecture ,Section } from "../../types/coursesModel";
import {useGetSingleCource} from "../../hooks/useGetSingleCource";
type Props = {
  CourceId: string;
  className?: string;
  onSelectLecture: (lecture: Lecture) => void;
  setQuizId: (quizId: string | null) => void;
};

export function ChaptersDetails({ CourceId, className, onSelectLecture, setQuizId }: Props) {

  const { course, loading:courceLoading, error:courseError } = useGetSingleCource(CourceId || "");


  // State to manage expanded/collapsed sections
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  // Effect to expand all sections by default when course data is loaded
useEffect(() => {
  if (course?.sections) {
    const initialState: Record<string, boolean> = {};

    course.sections.forEach((section: Section) => {
      initialState[section.id] = true;
    });

    setExpandedSections(initialState);
  }
}, [course]);

    // toggleSection function to expand/collapse sections
  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  //if loading show loading message, if error show error message, if course is null show no sections available message
  if (courceLoading) {
    return (
      <div className={`flex ${className || ""}`}>
        <div className="bg-white rounded-lg p-2.5 w-full text-center">
          <p className="text-gray-600">Loading sections...</p>
        </div>
      </div>
    );
  }
    //if error or course is null show error message
  if (courseError || !course) {
    return (
      <div className={`flex ${className || ""}`}>
        <div className="bg-white rounded-lg p-2.5 w-full text-center">
          <p className="text-red-600">{courseError || "No sections available"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${className || ""}`}>
      <div className="bg-white rounded-lg p-2.5 w-full">
        <h3 className="text-lg font-semibold text-gray-800 px-3 pb-3">
          Course Content
        </h3>
        {/* Sections List */}
        <div className="max-h-screen overflow-y-auto">
          {course.sections && course.sections.length > 0 ? (
            course.sections.map((section: Section) => (
              <div
                key={section.id}
                className="border border-gray-200 rounded-lg overflow-hidden bg-[#f5edf7] mb-2"
              >
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-4 transition-colors hover:bg-purple-50"
                >
                  <div className="flex items-center gap-3">
                    <IoIosArrowDown
                      className={`w-5 h-5 text-gray-600 transition-transform ${
                        expandedSections[section.id] ? "rotate-180" : ""
                      }`}
                    />
                    <span className="text-sm text-gray-800 font-medium">
                      {section.name}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">
                    {section.lectures?.length || 0} lecture
                    {section.lectures?.length !== 1 ? "s" : ""}
                  </span>
                </button>

                {/* Section Content (Lectures) */}
                <div
                  className={`bg-gray-50 border-t border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedSections[section.id]
                      ? "max-h-500 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {section.lectures && section.lectures.length > 0 ? (
                    section.lectures.map((lecture) => (
                      <div className="flex flex-col" key={lecture.id}>
                        <button
                        key={lecture.id}
                        onClick={() => onSelectLecture(lecture)}
                        className="w-full flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0 hover:bg-purple-100 transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          <MdOutlineSlowMotionVideo className="w-5 h-5 text-purple-600" />
                          <span className="text-gray-700 text-sm">
                            {lecture.name}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">Play</span>
                      </button>

                     {lecture.quizzes && lecture.quizzes.length > 0 && (
                        <button
                          onClick={() => setQuizId(lecture.quizzes?.[0]?.id ?? null)}
                          className="w-full flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0 hover:bg-purple-100 transition-colors text-left"
                        >
                          <div className="flex items-center gap-3">
                            <MdOutlineSlowMotionVideo className="w-5 h-5 text-purple-600" />
                            <span className="text-gray-700 text-sm">
                              Lecture Quiz
                            </span>
                          </div>

                          <span className="text-xs text-gray-400">Solve</span>
                        </button>
                      )}
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      No lectures available
                    </div>
                  )}
                      {section.quizzes && section.quizzes.length > 0 && (
                        <button
                          onClick={() => setQuizId(section.quizzes?.[0]?.id ?? null)}
                          className="w-full flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0 hover:bg-purple-100 transition-colors text-left"
                        >
                          <div className="flex items-center gap-3">
                            <MdOutlineSlowMotionVideo className="w-5 h-5 text-purple-600" />
                            <span className="text-gray-700 text-sm">
                              Chapter Quiz
                            </span>
                          </div>

                          <span className="text-xs text-gray-400">Solve</span>
                        </button>
                      )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">
              No sections available
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
