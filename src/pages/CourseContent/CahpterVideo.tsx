import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import testVideo from "../../assets/videos/test.mp4";
const videoSrc = testVideo;
const scriptContent = [
  "Hello everyone, and welcome!",
  "In this video, we'll talk about the basics of Artificial Intelligence, or AI.",
  "Artificial Intelligence refers to the ability of machines or computer systems to perform tasks that normally require human intelligence. These tasks include learning from experience, understanding language, recognizing images, and making decisions.",
  "AI systems don't think like humans, but they simulate intelligence by analyzing large amounts of data and finding patterns. The more data an AI system receives, the better it becomes at making accurate predictions or decisions.",
  "We already interact with AI in our daily lives. Examples include voice assistants like Siri or Google Assistant, recommendation systems on platforms such as YouTube and Netflix, facial recognition on smartphones, chatbots, and navigation apps that predict traffic.",
  "There are three main categories of AI:",
];

const aiCategories = [
  {
    label: "Narrow AI",
    desc: "Designed to handle a specific task very well, like spam detection or image recognition.",
  },
  {
    label: "General AI",
    desc: "Would have human-like intelligence and the ability to learn any task. This type does not exist yet.",
  },
  {
    label: "Super AI",
    desc: "Would surpass human intelligence and remains theoretical.",
  },
];

const closingText = [
  "AI is powered by several key technologies. Machine Learning allows systems to learn from data without being explicitly programmed. Deep Learning uses neural networks inspired by the human brain to process complex data like images and speech. Natural Language Processing helps machines understand and respond to human language.",
  "In conclusion, AI is transforming how we live and work by making systems smarter, more efficient, and more adaptive. As AI continues to evolve, it will play an even bigger role in shaping the future of technology. Thank you for watching!",
];

type props = {
  className?: string;
  id?: string;
};
// --- VideoPlayer component ---
export default function CahpterVideo({ className, id }: props) {
  const [activeTab, setActiveTab] = useState("script");
  const [isFinished, setIsFinished] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <div
      className={`w-full mx-auto bg-white rounded-xl border border-gray-200 overflow-hidden font-sans ${className || ""}`}
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
      <div className="relative w-full min-h-60 bg-black">
        <video
          ref={videoRef}
          controls
          className="w-full h-full"
          onEnded={() => {
            setIsFinished(true);
            console.log("Video finished!");
          }}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* ✅ Finished Badge */}
        {isFinished && (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow">
            ✔ Finished
          </div>
        )}
      </div>

      {/* Lesson title + duration */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
        <div>
          <p className="text-[15px] font-medium text-gray-900">
            1 - Introduction
          </p>
          <p className="text-xs text-gray-400 mt-0.5">chapter 1</p>
        </div>
        <span className="text-xs text-gray-500 bg-gray-100 rounded-lg px-2.5 py-1">
          3 m
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
            {scriptContent.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            {aiCategories.map((cat) => (
              <p key={cat.label}>
                <span className="font-medium text-gray-900">{cat.label}</span> —{" "}
                {cat.desc}
              </p>
            ))}
            {closingText.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
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
