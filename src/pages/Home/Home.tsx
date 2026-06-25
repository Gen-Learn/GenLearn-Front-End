import HeroSection from "./HeroSection";
import { useWindowSize } from "../../hooks/useWindowSize";
import HowItWorks from "./HowItWorks";
import StayMotivated from "./StayMotivated";
import WhyLearn from "./WhyLearn";
import { useEffect } from "react";
function Home() {
  const { width } = useWindowSize();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col justify-center items-center ">
      <HeroSection width={width} />
      <HowItWorks />
      <StayMotivated />
      <WhyLearn />
    </div>
  );
}

export default Home;
