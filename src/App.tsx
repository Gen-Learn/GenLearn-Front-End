import { BrowserRouter as Router, Routes, Route,Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import {MainHeader ,Footer} from "@/layout/index";
import AIChatbot from "./components/AIChat/Chat";
import {Profile, CourseContent,CourseDetails, Courses ,Generate ,Home ,ForgotPassword ,ResetPassword ,SignUp ,Login, VerifyEmail, Onboarding } from "@/pages/index"
import ManageAccount from "./pages/ManageAccount/ManageAccount";
import { AboutPage, ContactPage, PrivacyPage, TermsPage, NotFoundPage } from './static/index';
const Layout = () => {
  return (
    <div>
      <MainHeader />
      <Outlet />
      <Footer />
    </div>
  );
};
function AppContent() {
  const location = useLocation();

  const showChatbot = [
    "dashboard",
    "courses",
    "course",
    "lecture",
    "quiz",
    "profile",
  ].some(
    (path) =>
      location.pathname === `/${path}` ||
      location.pathname.startsWith(`/${path}/`)
  );

  return (
    <>
      <ScrollToTop />

      <div className="relative min-h-screen overflow-hidden">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/manage-account" element={<ManageAccount />} />
          </Route>

          <Route path="/courses" element={<Courses />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/course/:courseId/section/:sectionId/lecture/:lectureId" element={<CourseContent />} />
          <Route path="/course-details/:id" element={<CourseDetails />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {showChatbot && <AIChatbot />}
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}