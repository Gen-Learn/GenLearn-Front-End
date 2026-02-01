import { Link } from "react-router-dom";
function CahpterVideo({ id }) {
  return (
    <div>
      <button>
        <Link to={`/course-details/${id}`}>Back to course</Link>
      </button>
    </div>
  );
}

export default CahpterVideo;
