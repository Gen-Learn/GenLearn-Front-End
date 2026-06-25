import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import VideoPlayer from "./videoSection";
import { useGetSingleCource } from "../../hooks/useGetSingleCource";
import  { Lecture } from "../../types/coursesModel";
import { useGetQuiz } from "@/hooks/useGetQuiz";

type props = {
  className?: string;
  CourceId?: string;
  selectedLecture?: Lecture | null;
  quizId?: string | null;
};

// --- VideoPlayer component ---
export default function CahpterVideo({
  className,
  CourceId,
  selectedLecture,
  quizId
}: props) {
  const [activeTab, setActiveTab] = useState("script");
  const { course, loading, error } = useGetSingleCource(CourceId || "");
    const { quiz, loading:quizLoading, error:quizError } = useGetQuiz(quizId || "");
  return (
    <div
      className={`w-full  mx-auto bg-white rounded-xl border border-gray-200 overflow-hidden font-sans ${className || ""}`}
    >
      {/* Back button */}
      <button className="px-4 py-3 border-b border-gray-100">
        <Link
          to="/courses"
          className="group flex justify-center items-center py-1.5 px-4 border border-[#8b65b5] text-[#8b65b5] rounded-lg hover:bg-[#8b65b5] hover:text-white transition-colors duration-300"
        >
          <FaArrowLeft className="transition-all duration-300 -ml-6 opacity-0 group-hover:ml-0 group-hover:mr-2 group-hover:opacity-100" />
          Back to Courses
        </Link>
      </button>

      {/* Video area */}
      <div className="relative w-full bg-black">
        {loading ? (
          <div className="h-96 flex items-center justify-center bg-black">
            <div className="text-white text-center">
              <div className="mb-4">Loading content...</div>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            </div>
          </div>
        ) : error ? (
          <div className="h-96 flex items-center justify-center bg-black">
            <div className="text-red-400 text-center">{error}</div>
          </div>
        ) : selectedLecture ? (
          <VideoPlayer lectureId={selectedLecture?.id} courseId={CourceId} />
        ) : (
          <div className="h-96 flex items-center justify-center bg-black">
            <div className="text-gray-400 text-center">
              <p>Select a lecture to play</p>
            </div>
          </div>
        )}
      </div>

      {/* Lesson title + duration */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
        <div>
          <p className="text-[15px] font-medium text-gray-900">
            {selectedLecture?.name || "Select a lecture"}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {course?.name || "Course"}
          </p>
        </div>
        <span className="text-xs text-gray-500 bg-gray-100 rounded-lg px-2.5 py-1">
          Video
        </span>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 px-5">
        {["script", "materials"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2.5 px-4 text-sm capitalize transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? "border-gray-900 text-gray-900 font-medium"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <div className="px-5 py-4 max-h-80 overflow-y-auto">
        {activeTab === "script" ? (
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
            {selectedLecture?.scripts && selectedLecture.scripts.length > 0 ? (
              selectedLecture.scripts.map((script, i) => (
                <div key={i}>
                  <p className="text-xs text-gray-500 mb-1 font-semibold">
                    {script.language}
                  </p>
                  <p className="whitespace-pre-wrap">{script.content}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">
                No scripts available for this lecture.
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-400">
            No materials available for this lesson.
          </p>
        )}
      </div>
    </div>
  );
}
