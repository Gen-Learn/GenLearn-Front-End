import { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  MessageCircle,
  Sparkles,
  Bot,
  User,
  Maximize2,
  Minimize2,
  Trash2,
} from 'lucide-react';
import { Button } from '../ui';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatContext {
  course?: string;
  section?: string;
  lecture?: string;
}

// Mock responses for demonstration
const mockResponses: Record<string, string> = {
  explain: "I'd be happy to explain that concept! Quantum tunneling is a phenomenon where particles can pass through barriers that would be impossible to cross in classical physics. This happens because particles have wave-like properties - their wave function doesn't suddenly stop at a barrier, but instead decays exponentially through it. If the barrier is thin enough, there's a non-zero probability of finding the particle on the other side.",
  summary: "Here's a quick summary of this lecture:\n\n• Quantum tunneling allows particles to pass through energy barriers\n• The probability depends on barrier width and height\n• Applications include scanning tunneling microscopes and nuclear fusion\n• This is a purely quantum effect with no classical analog",
  example: "Great question! Here's a practical example:\n\n**Scanning Tunneling Microscope (STM)**\n\nAn STM uses quantum tunneling to image surfaces at the atomic level. A sharp metal tip is brought very close to a surface. Electrons tunnel between the tip and surface, creating a measurable current. By scanning the tip and measuring this tunneling current, scientists can create images of individual atoms!\n\nThis wouldn't be possible without quantum tunneling - classically, the electrons couldn't cross the gap.",
  quiz: "I can help you understand the quiz concepts, but I won't give you the direct answers.\n\nFor this quiz, focus on understanding:\n\n1. The definition of quantum tunneling\n2. How the tunneling probability relates to barrier properties\n3. Real-world applications\n\nWould you like me to explain any of these concepts in more detail?",
  default: "I'm your AI learning assistant! I can help you with:\n\n• Explaining difficult concepts from your current lecture\n• Summarizing course sections\n• Providing real-world examples\n• Preparing for quizzes (without giving answers)\n• Answering follow-up questions\n\nWhat would you like to know?",
};

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your AI learning assistant. I can help you understand concepts from your course, summarize sections, provide examples, and prepare for quizzes. What would you like to learn about?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Context (would be dynamic in real implementation)
  const context: ChatContext = {
    course: 'Quantum Physics Fundamentals',
    section: 'Wave-Particle Duality',
    lecture: 'Quantum Tunneling Explained',
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('explain') || lowerMessage.includes('what is')) {
      return mockResponses.explain;
    }
    if (lowerMessage.includes('summary') || lowerMessage.includes('summarize')) {
      return mockResponses.summary;
    }
    if (lowerMessage.includes('example') || lowerMessage.includes('application')) {
      return mockResponses.example;
    }
    if (lowerMessage.includes('quiz') || lowerMessage.includes('test')) {
      return mockResponses.quiz;
    }

    return mockResponses.default;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateResponse(userMessage.content),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Chat cleared. How can I help you learn?",
        timestamp: new Date(),
      },
    ]);
  };

  const quickActions = [
    { label: 'Explain this concept', action: 'explain' },
    { label: 'Summarize lecture', action: 'summary' },
    { label: 'Give me an example', action: 'example' },
    { label: 'Help with quiz', action: 'quiz' },
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-glow-lg hover:shadow-glow hover:scale-110 transition-all flex items-center justify-center z-50 group"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        <span className="absolute -top-10 right-0 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          AI Assistant
        </span>
      </button>
    );
  }

  return (
    <div
      className={`fixed z-50 bg-white rounded-3xl shadow-glass-lg border border-gray-100 flex flex-col transition-all duration-300 ${
        isExpanded
          ? 'inset-4 lg:inset-8'
          : 'bottom-6 right-6 w-96 h-[32rem]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">AI Assistant</h3>
            <p className="text-xs text-gray-500">
              {context.course && (
                <span className="truncate block max-w-[200px]">
                  {context.course}
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={clearChat}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
            title="Clear chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Context Banner */}
      {context.lecture && (
        <div className="px-4 py-2 bg-primary-50 border-b border-primary-100">
          <p className="text-xs text-primary-700">
            <strong>Current:</strong> {context.lecture}
          </p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl p-3 ${
                message.role === 'user'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-gray-600" />
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-gray-100 rounded-2xl p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <button
                key={action.action}
                onClick={() => {
                  setInputValue(action.label);
                  inputRef.current?.focus();
                }}
                className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-primary-300 focus:ring-2 focus:ring-primary-500/20 text-sm"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            size="sm"
            className="!rounded-xl"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
