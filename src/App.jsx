import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignUp from "./pages/signUp/signUp";
import ReserPassword from "./pages/resetPassword/resetPassword";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import Login from "./pages/logIn/logIn";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Generate from "./pages/Generate/Generate";
import Courses from "./pages/Courses/main";
import CourseDetails from "./pages/CourseDetails/main";
import CourseContent from "./pages/CourseContent/main";
function App() {
  return (
    <>
      <Router basename="/GenLearn">
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
