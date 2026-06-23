import { useState } from "react";
import image from "../../assets/images/ai.png";
import { useAuth } from "../../contexts/AuthContext";
type props = {
  setChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
  chatOpen: boolean;
  className?: string;
};
export default function AiIcon({
  setChatOpen,
  chatOpen,
  className,
}: props) {
  const [hovered, setHovered] = useState(false);
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <button
      className={`relative w-15 h-15 hover:scale-110 transition-transform ${className}`}
      onClick={() => setChatOpen(!chatOpen)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={image} alt="AI Assistant" />

      {hovered && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-3 py-1.5 rounded-lg whitespace-nowrap shadow-md">
          <span className="font-bold block">I'm nerdy</span>
          <span>How can I help you?</span>
        </div>
      )}
    </button>
  );
}