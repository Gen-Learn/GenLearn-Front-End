import { useState, useRef, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { MdOutlineRefresh } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import aiIcons from "../../assets/images/ai.png";
interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

type props = {
  className?: string;
  setChatOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  chatOpen?: boolean;
};
export default function Chat({ className, setChatOpen, chatOpen }: props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      text: "Hi I am Nerdy! How can I help you? Ask all the questions you want.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system:
            "You are Nerdy, a friendly and knowledgeable AI assistant. Be concise and helpful.",
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.text,
          })),
        }),
      });

      const data = await response.json();
      const reply =
        data.content?.[0]?.text ?? "Sorry, I couldn't understand that.";

      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "assistant", text: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          text: "Oops! Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        text: "Hi I am Nerdy! How can I help you? Ask all the questions you want.",
      },
    ]);
  };

  return (
    <div
      className={`flex items-center justify-center h-screen bg-gray-100 ${className}`}
    >
      <div className=" w-full h-full flex flex-col  overflow-hidden shadow-lg bg-[#D9B7E1]">
        {/* Header */}
        <div className="bg-[#8b65b5] px-4 py-3 flex items-center gap-3">
          <img src={aiIcons} alt="Nerdy" className="w-6 h-6" />
          <div className="flex-1">
            <p className="text-white font-medium text-sm">Nerdy</p>
            <p className="text-purple-200 text-xs">Powered by AI</p>
          </div>
          <button
            onClick={handleReset}
            className="text-purple-200 hover:text-white transition-colors"
          >
            <MdOutlineRefresh size={20} />
          </button>
          <button
            onClick={() => setChatOpen?.(false)}
            className="text-purple-200 hover:text-white transition-colors"
          >
            <LuLogOut size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((msg) =>
            msg.role === "assistant" ? (
              <div key={msg.id} className="flex items-start gap-2">
                <img
                  src={aiIcons}
                  alt="Nerdy"
                  className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-white text-sm shrink-0"
                />
                <div>
                  <p className="text-purple-900 text-xs mb-1 font-medium">
                    Nerdy
                  </p>
                  <div className="bg-purple-100 rounded-tl-none rounded-2xl px-3 py-2 max-w-50">
                    <p className="text-purple-900 text-sm">{msg.text}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div key={msg.id} className="flex justify-end">
                <div className="bg-purple-700 rounded-tr-none rounded-2xl px-3 py-2 max-w-50">
                  <p className="text-white text-sm">{msg.text}</p>
                </div>
              </div>
            ),
          )}
          {loading && (
            <div className="flex items-start gap-2">
              <img
                src={aiIcons}
                alt="Nerdy"
                className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-white text-sm shrink-0"
              />
              <div className="bg-purple-100 rounded-2xl rounded-tl-none px-3 py-2">
                <p className="text-purple-400 text-sm animate-pulse">
                  Thinking...
                </p>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-3 py-3 flex items-center gap-2">
          <input
            className="flex-1 bg-purple-200 rounded-full px-4 py-2 text-sm text-purple-900 placeholder-purple-500 outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Type your Message here ...."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center text-white hover:bg-purple-800 transition-colors disabled:opacity-50"
          >
            <IoSend size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
