import { useParams } from "react-router";
import { ChaptersDetails } from "./ChaptersDetails";
import CahpterVideo from "./CahpterVideo";
function CourseContent() {
  const { id } = useParams();
  return (
    <main className="flex justify-center items-center">
      <div className="w-[80%] grid gap-2.5 grid-cols-1 md:grid-cols-3">
        <CahpterVideo id={id} />
        <ChaptersDetails id={id} />
      </div>
    </main>
  );
}

export default CourseContent;
