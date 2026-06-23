import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import SignUp from "./pages/SignUp/SignUp";
import ReserPassword from "./pages/ResetPassword/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Header from "@/components/Header/Header";
import Login from "./pages//LogIn/LogIn";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Generate from "./pages/Generate/Generate";
import Courses from "./pages/Courses/main";
import CourseDetails from "./pages/CourseDetails/main";
import CourseContent from "./pages/CourseContent/main";
import Chat from "./components/AIChat/Chat";
import AiIcon from "./components/AiIcon/AiIcon";
import useMediaQuery from "./hooks/useMediaQuery";
import Profile from "./pages/profile/profile";
import ManageAccount from "./pages/ManageAccount/ManageAccount";

function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <Router>
      <div className="relative min-h-screen overflow-hidden">
        {/* Overlay */}
        <div
          onClick={() => setChatOpen(false)}
          className={`
            fixed inset-0 z-40 bg-black/40 backdrop-blur-sm
            transition-all duration-300
            ${
              chatOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }
          `}
        />

        {/* Chat Sidebar */}
        <div
          className={`
            fixed left-0 top-0 z-50 h-screen
            bg-white/90 backdrop-blur-xl
            border-r border-gray-200
            shadow-2xl

            transition-all duration-500 ease-out

            ${
              isMobile
                ? `w-full ${
                    chatOpen ? "translate-x-0" : "-translate-x-full"
                  }`
                : `w-[420px] ${
                    chatOpen ? "translate-x-0" : "-translate-x-full"
                  }`
            }
          `}
        >
          <Chat
            chatOpen={chatOpen}
            setChatOpen={setChatOpen}
            className="h-full"
          />
        </div>

        {/* Main Content */}
        <div
          className={`
            min-h-screen
            transition-all duration-500 ease-out
            ${
              !isMobile && chatOpen
                ? "ml-[420px] scale-[0.98]"
                : "ml-0 scale-100"
            }
          `}
        >
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forgot-Password" element={<ForgotPassword />} />
            <Route path="/reset-Password" element={<ReserPassword />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course-details/:id" element={<CourseDetails />} />
            <Route path="/course/:id" element={<CourseContent />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/manage-account" element={<ManageAccount />} />
          </Routes>

          <Footer />
        </div>

        {/* Floating AI Button */}
        {!chatOpen && (
          <div
            className="
              fixed bottom-6 right-6 z-50

            "
          >
            <AiIcon
              setChatOpen={setChatOpen}
              chatOpen={chatOpen}
            />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;