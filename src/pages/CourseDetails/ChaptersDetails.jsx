import React, { useState } from "react";

const courseChapters = [
  {
    id: 1,
    title: "Chapter 1",
    sections: [
      { id: 1, title: "Introduction to the Course", duration: "5:30" },
      { id: 2, title: "Setting Up Your Environment", duration: "8:15" },
    ],
  },
  {
    id: 2,
    title: "Chapter 2",
    sections: [
      { id: 3, title: "Basic Concepts", duration: "12:45" },
      { id: 4, title: "Hands-on Practice", duration: "15:20" },
      { id: 5, title: "Quiz and Assessment", duration: "6:00" },
    ],
  },
  {
    id: 3,
    title: "Chapter 3",
    sections: [
      { id: 6, title: "Advanced Techniques", duration: "18:30" },
      { id: 7, title: "Real-world Examples", duration: "14:10" },
      { id: 8, title: "Best Practices", duration: "10:45" },
      { id: 9, title: "Common Pitfalls", duration: "9:20" },
    ],
  },
  {
    id: 4,
    title: "Chapter 4",
    sections: [{ id: 10, title: "Final Project", duration: "25:00" }],
  },
];

export function ChaptersDetails() {
  const [expandedChapters, setExpandedChapters] = useState({});
  const chapters = courseChapters;
  const toggleChapter = (chapterId) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const totalSections = chapters.reduce(
    (sum, chapter) => sum + chapter.sections.length,
    0,
  );

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-[80%]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold bg-linear-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
            Course Content
          </h2>
          <p className="text-gray-500 text-sm">
            Total: {chapters.length} Chapters & {totalSections} Sections
          </p>
        </div>

        {/* Chapters List */}
        <div>
          {chapters.map((chapter) => (
            <div
              key={chapter.id}
              className="border border-gray-200 rounded-lg overflow-hidden bg-[#f5edf7]"
            >
              {/* Chapter Header */}
              <button
                onClick={() => toggleChapter(chapter.id)}
                className="w-full flex items-center justify-between p-4  transition-colors"
              >
                <div className="flex items-center gap-3">
                  <svg
                    className={`w-5 h-5 text-gray-600 transition-transform ${
                      expandedChapters[chapter.id] ? "rotate-180" : ""
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
                    {chapter.title}
                  </span>
                </div>
                <span className="text-sm text-gray-400">
                  {chapter.sections.length} section
                  {chapter.sections.length !== 1 ? "s" : ""}
                </span>
              </button>

              {/* Chapter Content (Sections) */}
              <div
                className={`bg-gray-50 border-t border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedChapters[chapter.id]
                    ? "max-h-[2000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {chapter.sections.map((section) => (
                  <div
                    key={section.id}
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
                      <span className="text-gray-700">{section.title}</span>
                    </div>
                    <span className="text-sm text-gray-400">
                      {section.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
