import courses from "../../data/Courses.json";
import { Link } from "react-router-dom";
const cardsData = courses.Courses;

function GridCourses(status) {
  return (
    <section className="w-full flex justify-center items-center">
      <div className=" w-[80%]  grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20 place-items-center">
        {status.status !== "All" &&
          cardsData
            .filter((element) => element.status === status.status)
            .map((card) => (
              <Link
                to={`/course-details/${card.id}`}
                key={card.id}
                className="max-w-sm rounded overflow-hidden shadow-lg m-4"
              >
                <img className="w-full" src={card.img} alt={card.title} />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{card.title}</div>
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
          cardsData.map((card) => (
            <Link
              to={`/course-details/${card.id}`}
              key={card.id}
              className="max-w-sm rounded overflow-hidden shadow-lg m-4"
            >
              <img className="w-full" src={card.img} alt={card.title} />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{card.title}</div>
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
      </div>
    </section>
  );
}

export default GridCourses;
