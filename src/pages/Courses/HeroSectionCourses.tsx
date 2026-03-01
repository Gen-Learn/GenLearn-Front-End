import Boy from "../../assets/images/CoursesBoy.png";
function HeroSectionCourses() {
  return (
    <section className="w-full flex justify-center items-center px-4">
      <div className="relative text-white bg-linear-to-l from-[#22B5E5] to-[#E522B5] h-[75px] sm:h-[100px] md:h-[150px] lg:h-[225px] max-w-[80%] min-h-[200px] rounded-3xl flex justify-evenly items-start flex-col px-6 sm:px-10 pt-6 sm:pt-8 mt-40 mb-10">
        <p className="text-xl sm:text-2xl md:text-3xl font-bold">
          You've Got This!
        </p>
        <p className="text-base sm:text-lg md:text-[23px] w-full sm:w-[80%] md:w-[70%] pr-0 sm:pr-32 md:pr-0 ">
          A new lesson today means new knowledge gained. Keep going and let your
          learning journey grow stronger every day.
        </p>
        <img
          src={Boy}
          alt="hero-img"
          className="absolute bottom-0 right-0    w-[150px] sm:w-[200px] md:w-[250px] lg:w-[400px] hidden sm:block"
        />
      </div>
    </section>
  );
}

export default HeroSectionCourses;
