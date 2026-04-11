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
function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <Router>
      <div className="relative flex ">
        {/* Chat panel — sidebar on lg+, bottom drawer on mobile */}
        {chatOpen && (
          <Chat
            className="
                sticky top-0 h-screen z-50
                lg:w-1/3 xl:w-1/4 w-full
                transition-all duration-300
              "
            chatOpen={chatOpen}
            setChatOpen={setChatOpen}
          />
        )}
        {/* Main content */}
        {isMobile && chatOpen ? (
          ""
        ) : (
          <div
            className={`w-full  ${chatOpen ? "lg:w-2/3 xl:w-3/4" : "w-full"}`}
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
            </Routes>
            <Footer />
          </div>
        )}
      </div>

      {/* AI icon — hidden when chat open on mobile to avoid overlap */}
      {!chatOpen && <AiIcon setChatOpen={setChatOpen} chatOpen={chatOpen} />}
    </Router>
  );
}

export default App;
