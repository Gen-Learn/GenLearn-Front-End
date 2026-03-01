import { Link } from "react-router-dom";
type Props = {
  id: string;
};
function CahpterVideo({ id }: Props) {
  return (
    <div>
      <button>
        <Link to={`/course-details/${id}`}>Back to course</Link>
      </button>
    </div>
  );
}

export default CahpterVideo;
