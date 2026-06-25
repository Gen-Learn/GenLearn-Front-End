import HeroSectionCourses from "./HeroSectionCourses";
import NavAndTitle from "./NavAndTitle";
import GridCourses from "./GridCourses";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router";
import {useEffect} from "react";
function Courses() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [activeTab, setActiveTab] = useState("All");
  const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Please log in to view your courses</h2>
            <p className="text-gray-600">You need to be logged in to access your courses.</p>
            <Link to="/login" className="w-full">
              <button className=" w-full bg-linear-to-r from-[#22B5E5] to-[#E522B5] text-white px-4 py-2 rounded-xl  active:scale-95 transition-transform duration-200 mt-10">
                Log In
              </button>
            </Link>
          </div>
        </div>
      );
    }
  return (
    <main>
      <HeroSectionCourses />
      <NavAndTitle setActiveTab={setActiveTab} />
      <GridCourses status={activeTab} />
    </main>
  );
}

export default Courses;
