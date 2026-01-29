import { Link } from "react-router";
function home() {
  return (
    <div className="flex">
      <button className="p-4 bg-sky-500 rounded-2xl m-4 hover:bg-amber-600">
        <Link to="/login">Login</Link>
      </button>
      <button className="p-4 bg-sky-500 rounded-2xl m-4 hover:bg-amber-600">
        <Link to="/signup">Sign Up</Link>
      </button>
      <button className="p-4 bg-sky-500 rounded-2xl m-4 hover:bg-amber-600">
        <Link to="/reset-password">Reset Password</Link>
      </button>
      <button className="p-4 bg-sky-500 rounded-2xl m-4 hover:bg-amber-600">
        <Link to="/forgot-password">Forgot Password</Link>
      </button>
      <button className="p-4 bg-sky-500 rounded-2xl m-4 hover:bg-amber-600">
        <Link to="/generate">Generate</Link>
      </button>
      <button className="p-4 bg-sky-500 rounded-2xl m-4 hover:bg-amber-600">
        <Link to="/courses">Courses</Link>
      </button>
      <button className="p-4 bg-sky-500 rounded-2xl m-4 hover:bg-amber-600">
        <Link to="/course-details">Course Details</Link>
      </button>
    </div>
  );
}

export default home;
