import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/axios";
import Course, { Section } from "../../types/coursesModel";

const domain = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

type Props = {
  id: string;
};

export function ChaptersDetails({ id }: Props) {
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
        setCourse(response.data.data.course);
        setError(null);
      } catch (err) {
        setError("Failed to fetch course content");
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="bg-white rounded-lg p-6 w-[80%]">
          <p className="text-gray-600 text-center">Loading course content...</p>
        </div>
      </div>
    );
  }

  if (error || !course || !course.sections) {
    return (
      <div className="flex justify-center items-center">
        <div className="bg-white rounded-lg p-6 w-[80%]">
          <p className="text-red-600 text-center">
            {error || "No sections available"}
          </p>
        </div>
      </div>
    );
  }

  const totalLectures = course.sections.reduce(
    (sum, section) => sum + (section.lectures?.length || 0),
    0,
  );

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-[80%]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold gradient-bg-text">
            Course Content
          </h2>
          <p className="text-gray-500 text-sm">
            Total: {course.sections.length} Section
            {course.sections.length !== 1 ? "s" : ""} & {totalLectures} Lecture
            {totalLectures !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Sections List */}
        <div>
          {course.sections.map((section) => (
            <div
              key={section.id}
              className="border border-gray-200 rounded-lg overflow-hidden bg-[#f5edf7]"
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-4 transition-colors hover:bg-purple-50"
              >
                <div className="flex items-center gap-3">
                  <svg
                    className={`w-5 h-5 text-gray-600 transition-transform ${
                      expandedSections[section.id] ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <span className="font-medium text-gray-800">
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
                    <div
                      key={lecture.id}
                      className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div className="flex flex-col">
                          <span className="text-gray-700">{lecture.name}</span>
                          {lecture.scripts && lecture.scripts.length > 0 && (
                            <span className="text-xs text-gray-500">
                              {lecture.scripts.length} script
                              {lecture.scripts.length !== 1 ? "s" : ""}
                            </span>
                          )}
                        </div>
                      </div>
                      <a
                        href={lecture.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-purple-600 hover:text-purple-800 transition-colors"
                      >
                        Watch
                      </a>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No lectures available
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
