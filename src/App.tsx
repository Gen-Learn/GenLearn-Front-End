import { BrowserRouter as Router, Routes, Route, useLocation, matchPath } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollToTop from "./ScrollToTop";
import AIChatbot from "./components/AIChat/Chat";
import { Skeleton } from "@/components/loading";
import ProtectedRoute from "@/components/ProtectedRoute";

const Home = lazy(() => import("@/features/home/Home"));
const Courses = lazy(() => import("@/features/course/CoursesPage"));
const CourseDetails = lazy(() => import("@/features/course/CourseDetailsPage"));
const CourseContent = lazy(() => import("@/features/course/main"));
const Profile = lazy(() => import("@/features/user/profile"));
const Generate = lazy(() => import("@/features/generate/Generate"));
const ManageAccount = lazy(() => import("@/features/user/ManageAccount"));
const ForgotPassword = lazy(() => import("@/features/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("@/features/auth/ResetPassword"));
const SignUp = lazy(() => import("@/features/auth/SignUp"));
const Login = lazy(() => import("@/features/auth/LogIn"));
const VerifyEmail = lazy(() => import("@/features/auth/VerifyEmail"));
const Onboarding = lazy(() => import("@/features/onboarding/Onboarding"));
const AboutPage = lazy(() => import("@/shared/pages/AboutPage"));
const ContactPage = lazy(() => import("@/shared/pages/ContactPage"));
const PrivacyPage = lazy(() => import("@/shared/pages/PrivacyPage"));
const TermsPage = lazy(() => import("@/shared/pages/TermsPage"));
const NotFoundPage = lazy(() => import("@/shared/pages/NotFoundPage"));

const Layout = () => {
  return (
    <div>
      <Suspense fallback={<Skeleton />}>
        <Home />
      </Suspense>
    </div>
  );
};

function AppContent() {
  const location = useLocation();
  const match = matchPath(
    "/course/:courseId/section/:sectionId/lecture/:lectureId",
    location.pathname);
  const courseId = match?.params.courseId;
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
        <Suspense fallback={<Skeleton />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />

            <Route path="/manage-account" element={<ProtectedRoute><ManageAccount /></ProtectedRoute>} />
            <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/course/:courseId/section/:sectionId/lecture/:lectureId" element={<ProtectedRoute><CourseContent /></ProtectedRoute>} />
            <Route path="/course-details/:id" element={<ProtectedRoute><CourseDetails /></ProtectedRoute>} />
            <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
            <Route path="/generate" element={<ProtectedRoute><Generate /></ProtectedRoute>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>

        {showChatbot && <AIChatbot courseId={courseId || ""} />}
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