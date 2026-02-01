import { Link } from "react-router-dom";
import HeroImg from "../../assets/images/HomeHeroSection.png";
function HeroSection({ width }) {
  return (
    <section
      className={`w-[80%] flex flex-col md:flex-row grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 my-6 md:my-10 px-4 md:px-0 py-16`}
    >
      <div
        className={`flex flex-col justify-center   ${width > 900 ? "text-left items-start" : "text-center"} items-center `}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight sm:leading-[3.5rem] md:leading-[4rem]">
          Turn Any
          <span className="font-normal"> Book</span> Into an Interactive
          <span className="text-[#b967c7]"> Course</span>
        </h1>
        <p className="mt-4 sm:mt-6 md:mt-8 text-lg sm:text-xl md:text-2xl font-semibold text-[#505b61]">
          Upload your material and let AI transform it into short lessons,
          summaries and videos all in one place.
        </p>
        <Link to="/generate">
          <button className="font-bold mt-6 sm:mt-8 w-full sm:w-[280px] md:w-[300px] bg-gradient-to-r from-[#22B5E5] to-[#E522B5] text-white px-4 py-3 md:py-2 rounded-xl active:scale-95 transition-transform duration-200">
            Generate Course
          </button>
        </Link>
      </div>

      {width > 900 && (
        <div className="flex justify-center items-center mt-6 md:mt-0">
          <img src={HeroImg} alt="GenLearn" className="w-full rounded-2xl" />
        </div>
      )}
    </section>
  );
}

export default HeroSection;
