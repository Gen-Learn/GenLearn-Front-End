import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import axiosInstance from "../../services/axios";
import Course, { Lecture } from "../../types/coursesModel";

const domain = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

type Props = {
  id: string;
  className?: string;
  onSelectLecture: (lecture: Lecture) => void;
};

export function ChaptersDetails({ id, className, onSelectLecture }: Props) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `${domain}/api/v1/courses/${id}`,
        );
        const courseData: Course = response.data.data.course;
        setCourse(courseData);

        // Expand all sections by default
        const initialState: Record<string, boolean> = {};
        if (courseData.sections) {
          courseData.sections.forEach((section) => {
            initialState[section.id] = true;
          });
        }
        setExpandedSections(initialState);

        // Select the first lecture automatically
        if (
          courseData.sections &&
          courseData.sections.length > 0 &&
          courseData.sections[0].lectures &&
          courseData.sections[0].lectures.length > 0
        ) {
          onSelectLecture(courseData.sections[0].lectures[0]);
        }
      } catch (err) {
        console.error("Failed to fetch course:", err);
        setError("Failed to load course sections");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id, onSelectLecture]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  if (loading) {
    return (
      <div className={`flex ${className || ""}`}>
        <div className="bg-white rounded-lg p-2.5 w-full text-center">
          <p className="text-gray-600">Loading sections...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className={`flex ${className || ""}`}>
        <div className="bg-white rounded-lg p-2.5 w-full text-center">
          <p className="text-red-600">{error || "No sections available"}</p>
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
            course.sections.map((section) => (
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
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      No lectures available
                    </div>
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
