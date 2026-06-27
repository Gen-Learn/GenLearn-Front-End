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

  return (
    <main>
      <HeroSectionCourses />
      <NavAndTitle setActiveTab={setActiveTab} />
      <GridCourses status={activeTab} />
    </main>
  );
}

export default Courses;
