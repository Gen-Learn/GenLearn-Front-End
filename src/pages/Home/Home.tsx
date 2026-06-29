import { 
  Hero,
  TrustedBy,
  HowItWorks,
  Features,
  SampleCourses,
  Statistics,
  Testimonials,
  FAQ } from "./components/index";
  import {Header ,Footer} from "@/layout/index";
  
import { useEffect } from "react";
function Home() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#') && !target.getAttribute('href')?.startsWith('#!/')) {
        const id = target.getAttribute('href')?.slice(1);
        const element = document.getElementById(id || '');
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFC]">
      <Hero />
      <TrustedBy />
      <HowItWorks />
      <Features />
      <SampleCourses />
      <Statistics />
      <Testimonials />
      <FAQ />
    </div>
  );
}

export default Home;
