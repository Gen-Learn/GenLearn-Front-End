import HeroSectionCourses from "./HeroSectionCourses";
import NavAndTitle from "./NavAndTitle";
import GridCourses from "./GridCourses";
import { useState } from "react";
function Courses() {
  const [activeTab, setActiveTab] = useState("All");
  return (
    <main>
      <HeroSectionCourses />
      <NavAndTitle activeTab={activeTab} setActiveTab={setActiveTab} />
      <GridCourses status={activeTab} />
    </main>
  );
}

export default Courses;
