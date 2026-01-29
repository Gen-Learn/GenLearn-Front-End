import DetailsSection from "./DetailsSection";
import { useParams } from "react-router";
import { ChaptersDetails } from "./ChaptersDetails";
function CourseDetails() {
  const { id } = useParams();
  return (
    <div>
      <DetailsSection id={id} />
      <ChaptersDetails />
    </div>
  );
}

export default CourseDetails;
