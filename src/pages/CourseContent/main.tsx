import { useParams } from "react-router-dom";
import { ChaptersDetails } from "./ChaptersDetails";
import CahpterVideo from "./CahpterVideo";

function CourseContent() {
  const { id } = useParams<{ id: string }>();
  return (
    <main className="flex justify-center items-center">
      <div className="w-[80%] grid gap-4 grid-cols-1 md:grid-cols-3 justify-start items-start mb-5 ">
        <CahpterVideo id={id!} className="md:col-span-2" />
        <ChaptersDetails id={id!} className="self-start sticky top-0 " />
      </div>
    </main>
  );
}

export default CourseContent;
