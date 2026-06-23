import Card from "./Card";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { MdDriveFolderUpload } from "react-icons/md";
import { VscRobot } from "react-icons/vsc";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

function HowItWorks() {
  const steps = [
    {
      id: 1,
      iconBgColor: "bg-[#faa2c0]",
      bgColor: "bg-[#fac3d6]",
      content:
        "Upload a book, PDF or document. Our platform supports multiple formats so you can start learning from any source.",
      titleone: "Upload Your ",
      titletwo: "Material",
      icon: <MdDriveFolderUpload className="font-bold text-4xl text-white" />,
    },
    {
      id: 2,
      iconBgColor: "bg-[#bfb1fa]",
      bgColor: "bg-[#d7cffc]",
      content:
        "Our AI analyzes your content, breaks it into clear topics, and creates structured lessons with summaries and videos.",
      titleone: "Generate Your ",
      titletwo: "Course",
      icon: <VscRobot className="font-bold text-4xl text-white" />,
    },
    {
      id: 3,
      iconBgColor: "bg-[#9de2f5]",
      bgColor: "bg-[#c3edfa]",
      content:
        "Follow your course step by step, track your progress, earn rewards, and learn at your own pace.",
      titleone: "Begin Your ",
      titletwo: "Journey",
      icon: <BsFillRocketTakeoffFill className="font-bold text-4xl text-white" />,
    },
  ];

  return (
    <section className="w-full flex justify-center items-center bg-[#f3e7f7] rounded-2xl">
      <div className="w-full sm:w-[80%] pt-8">
        <div>
          <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-center text-gray-600 mb-8">
            Turn Your Material Into a Learning Experience in Three Simple Steps
          </p>
        </div>

        {/* Desktop / iPad: fixed static row, no swiping */}
        <div className="hidden md:flex flex-row gap-4 items-center sm:my-10 justify-between">
          {steps.map((step) => (
            <Card
              key={step.id}
              iconBgColor={step.iconBgColor}
              bgColor={step.bgColor}
              content={step.content}
              titleone={step.titleone}
              titletwo={step.titletwo}
            >
              {step.icon}
            </Card>
          ))}
        </div>

        {/* Mobile: swipeable, autoplay, with pagination dots */}
        <div className="md:hidden my-10 pb-8">
          <Swiper
            modules={[Autoplay, Pagination]}
            loop={false}
            slidesPerView={1.2}
            centeredSlides={true}
            spaceBetween={16}
            speed={600}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            pagination={{
              clickable: true,
              el: ".how-it-works-pagination",
            }}
          >
            {steps.map((step) => (
              <SwiperSlide key={step.id}>
                <Card
                  iconBgColor={step.iconBgColor}
                  bgColor={step.bgColor}
                  content={step.content}
                  titleone={step.titleone}
                  titletwo={step.titletwo}
                >
                  {step.icon}
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="how-it-works-pagination flex justify-center gap-2 mt-4" />
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;