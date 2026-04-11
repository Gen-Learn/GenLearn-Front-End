import React, { useState } from "react";
import chaptersData from "../../data/chapters.json";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineSlowMotionVideo } from "react-icons/md";

const courseChapters: Record<
  string,
  {
    id: number;
    title: string;
    sections: {
      id: number;
      title: string;
      duration: string;
      videoUrl: string;
      script: string;
      material: string;
    }[];
  }[]
> = chaptersData.chaptersByCourse;
type Props = {
  id: string;
  className?: string;
};
export function ChaptersDetails({ id, className }: Props) {
  const chapters = courseChapters[id] || [];
  const [expandedChapters, setExpandedChapters] = useState<
    Record<number, boolean>
  >(() => {
    const initialState: Record<number, boolean> = {};
    chapters.forEach((chapter) => {
      initialState[chapter.id] = true;
    });
    return initialState;
  });
  const toggleChapter = (chapterId: number) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  return (
    <div className={`flex  ${className || ""}`}>
      <div className="bg-white rounded-lg p-2.5 w-full">
        {/* Chapters List */}
        <div className="max-h-screen overflow-y-auto ">
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
                  <IoIosArrowDown
                    className={`w-5 h-5 text-gray-600 transition-transform ${
                      expandedChapters[chapter.id] ? "rotate-180" : ""
                    }`}
                  />
                  <span className="text-sm text-gray-800">{chapter.title}</span>
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
                    ? "max-h-500 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {chapter.sections.map((section) => (
                  <div
                    key={section.id}
                    className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <MdOutlineSlowMotionVideo className="w-5 h-5 text-gray-400" />

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
