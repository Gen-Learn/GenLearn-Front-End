import Card from "./Card";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { MdDriveFolderUpload } from "react-icons/md";
import { VscRobot } from "react-icons/vsc";

function HowItWorks() {
  return (
    <section className="w-full flex justify-center items-center  bg-[#f3e7f7] rounded-2xl">
      <div className="w-[80%] py-12">
        <div>
          <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-center text-gray-600 mb-8">
            Turn Your Material Into a Learning Experience in Three Simple Steps
          </p>
        </div>
        <div className=" flex flex-col md:flex-row gap-4 flex-wrap items-center my-10 justify-between">
          <Card
            iconBgColor="bg-[#faa2c0]"
            bgColor="bg-[#fac3d6]"
            content={
              "Upload a book, PDF or document. Our platform supports multiple formats so you can start learning from any source."
            }
            titleone={"Upload Your "}
            titletwo={"Material"}
          >
            <MdDriveFolderUpload className="font-bold text-4xl text-white" />
          </Card>
          {/*****************************************************************/}
          <Card
            iconBgColor="bg-[#bfb1fa]"
            bgColor="bg-[#d7cffc]"
            content={
              "Our AI analyzes your content, breaks it into clear topics, and creates structured lessons with summaries and videos."
            }
            titleone={"Generate Your "}
            titletwo={"Course"}
          >
            <VscRobot className="font-bold text-4xl text-white" />
          </Card>
          {/*****************************************************************/}
          <Card
            iconBgColor="bg-[#9de2f5]"
            bgColor="bg-[#c3edfa]"
            content={
              "Follow your course step by step, track your progress, earn rewards, and learn at your own pace."
            }
            titleone={"Begin Your "}
            titletwo={"Journey"}
          >
            <BsFillRocketTakeoffFill className="font-bold text-4xl text-white" />
          </Card>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
