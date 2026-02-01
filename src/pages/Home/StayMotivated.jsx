import girlimg from "../../assets/images/GirlHomePage.png";
import { Link } from "react-router-dom";
import { useWindowSize } from "../../hooks/useWindowSize";
function StayMotivated() {
  const { width } = useWindowSize();
  return (
    <div className="w-[80%] max-w-7xl mx-auto  py-8 mt-16">
      {/* Motivation Section */}
      <div className="h-[280px] md:h-80 bg-gradient-to-r from-[#ba76c4] to-[#8b64b5] rounded-3xl px-8  mb-16 relative flex items-center justify-center ">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col justify-center items-center text-white z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Motivated. Achieve More.
            </h1>
            <p className="text-lg md:text-xl mb-6 opacity-95">
              Learning doesn't have to feel boring or overwhelming. Our platform
              turns progress into rewards helping you stay consistent, focused,
              and motivated every day.
            </p>
            <Link to="/generate">
              <button className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-8 rounded-lg border-2 border-white/40 transition-all duration-300 backdrop-blur-sm">
                Start Now!
              </button>
            </Link>
          </div>
          {width > 1000 && (
            <div className="flex-shrink-0">
              <img
                src={girlimg}
                alt="Happy student with trophy"
                className="w-96 bottom-20 relative h-auto object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StayMotivated;
