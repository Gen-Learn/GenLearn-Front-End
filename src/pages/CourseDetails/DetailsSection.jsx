import Courses from "../../data/Courses.json";
import { Link } from "react-router-dom";
import img from "../../assets/images/Cardimg.png";
import { FaArrowLeft } from "react-icons/fa";

function DetailsSection({ id }) {
  const course = Courses.Courses.find((course) => course.id === Number(id));
  return (
    <section className="flex flex-col justify-center items-center">
      {/*header*/}
      <div className="flex justify-between items-center w-[80%] mt-10 mb-6">
        <h1
          className="text-4xl font-bold 
            bg-linear-to-r from-[#22b5e6] via-[#8f65c9]  to-[#e622b5]
            bg-clip-text text-transparent"
        >
          Course Details
        </h1>
        <Link
          to="/courses"
          className="group flex justify-center items-center py-2 px-4 border border-[#8b65b5] text-[#8b65b5] rounded-lg hover:bg-[#8b65b5] hover:text-white transition-colors duration-300"
        >
          <FaArrowLeft className="transition-all duration-300 -ml-6 opacity-0 group-hover:ml-0 group-hover:mr-2 group-hover:opacity-100" />
          Back to Courses
        </Link>
      </div>

      {/******************************************************content**************************************/}
      <div className=" grid gap-10 grid-cols-1 lg:grid-cols-2  mb-20 w-[80%]">
        {/*image side */}

        <img
          src={img}
          alt={course.title}
          className="w-full flex justify-center items-center rounded-2xl overflow-hidden shadow-lg border border-[#798d8f]  "
        />
        {/*description side */}
        <div className=" p-6 w-full">
          {/* Title */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {course.title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4">{course.description}</p>

          {/* Chapter Count */}
          <div className="flex items-center gap-2 mb-6">
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span className="text-gray-700 font-medium">
              {course.numberofchapters} chapter
              {course.numberofchapters !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Fields/Tags */}
          <div className="flex gap-3 mb-6">
            {course.fields.map((field, index) => (
              <span
                key={index}
                className="text-sm text-gray-700 bg-[#eae4ed] px-10 py-1  rounded-full"
              >
                {field}
              </span>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-700 font-medium">
                Progress:
              </span>
              <span className="text-sm text-gray-700 font-semibold">
                {course.progress}%
              </span>
            </div>
            <div className=" bg-gray-300 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>

          {/* Button */}
          <div className="w-full flex justify-center items-center">
            <Link
              to={`/course/${course.id}`}
              className="w-[50%] bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-center"
            >
              Go to Course
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailsSection;
