import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignUp from "./pages/signUp/signUp";
import ReserPassword from "./pages/resetPassword/resetPassword";
import ForgotPassword from "./pages/forgotPassword/forgotPassword";
import Login from "./pages/logIn/logIn";
import Home from "./pages/home/home";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forgot-Password" element={<ForgotPassword />} />
          <Route path="/reset-Password" element={<ReserPassword />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
