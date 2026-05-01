import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../services/axios";
import CourseInterface from "../../types/coursesModel";
import img from "../../assets/images/Cardimg.png";
const domain = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

function GridCourses(status: { status: string }) {
  const [courses, setCourses] = useState<CourseInterface[]>([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    const FetchCourses = async () => {
      try {
        const response = await axiosInstance.get(`${domain}/api/v1/courses`);
        setCourses(response.data.data.courses);
        console.log(response.data.data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    FetchCourses();
  }, []);

  return (
    <section className="w-full flex justify-center items-center">
      <div className=" w-[80%]  grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20 place-items-center">
        {status.status !== "All" &&
          courses
            .filter((element) => element.status === status.status)
            .map((card) => (
              <Link
                to={`/course-details/${card.id}`}
                key={card.id}
                className="max-w-sm  rounded overflow-hidden shadow-lg m-4"
              >
                <img className="w-full" src={img} alt={card.name} />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{card.name}</div>
                  <p className="text-gray-700 text-base">{card.description}</p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    {card.status}
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    {card.progress}%
                  </span>
                </div>
              </Link>
            ))}
        {status.status === "All" &&
          courses.map((card) => (
            <Link
              to={`/course-details/${card.id}`}
              key={card.id}
              className="max-w-sm rounded overflow-hidden shadow-lg m-4"
            >
              <img className="w-full" src={img} alt={card.name} />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{card.name}</div>
                <p className="text-gray-700 text-base line-clamp-3  hover:line-clamp-4 transition-all duration-1000">
                  {card.description}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  {card.status}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  {card.progress}%
                </span>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}

export default GridCourses;
