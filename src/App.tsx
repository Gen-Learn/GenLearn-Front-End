import { BrowserRouter as Router, Routes, Route,Outlet } from "react-router-dom";
import { useState } from "react";
import ScrollToTop from "./ScrollToTop";
import {Header ,Footer} from "@/layout/index";
import Chat from "./components/AIChat/Chat";
import AiIcon from "./components/AiIcon/AiIcon";
import useMediaQuery from "./hooks/useMediaQuery";
import {Profile, CourseContent,CourseDetails, Courses ,Generate ,Home ,ForgotPassword ,ResetPassword ,SignUp ,Login } from "@/pages/index"
import ManageAccount from "./pages/ManageAccount/ManageAccount";
import { AboutPage, ContactPage, PrivacyPage, TermsPage, NotFoundPage } from './static/index';
const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <Router>
      <ScrollToTop/>
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
          

          <Routes>
            <Route element={<Layout />}>
              
              <Route path="/generate" element={<Generate />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/course-details/:id" element={<CourseDetails />} />
              <Route path="/course/:id" element={<CourseContent />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/manage-account" element={<ManageAccount />} />
              
            </Route>
            {/* These render without Header/Footer */}
            <Route path="/" element={<Home />} />
            <Route path="/forgot-Password" element={<ForgotPassword />} />
            <Route path="/reset-Password" element={<ResetPassword />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>

          
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