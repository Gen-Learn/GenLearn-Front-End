import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
function App() {
  return (
    <>
      <Router>
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
      </Router>
    </>
  );
}

export default App;
