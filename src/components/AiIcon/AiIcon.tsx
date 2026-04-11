import React, { useState } from "react";
import image from "../../assets/images/ai.png";

type props = {
  setChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
  chatOpen: boolean;
  className?: string;
};

export default function AiIcon({ setChatOpen, chatOpen, className }: props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-15 left-15">
      <button
        className={`w-15 h-15 hover:scale-110 transition-transform ${className}`}
        onClick={() => setChatOpen(!chatOpen)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img src={image} alt="AI Assistant" />
        {hovered && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-3 py-1.5 rounded-lg whitespace-nowrap shadow-md">
            I'm nerdy — how can I help you?
          </div>
        )}
      </button>
    </div>
  );
}
