import questionimg from "../../assets/images/QuestionHomePage.png";

function WhyLearn() {
  return (
    <section className=" w-full flex justify-center items-center bg-[#f4e9f7] py-5">
      <div className="mb-12 w-[80%]">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Image */}
          <div className="shrink-0 animate__animated animate__pulse animate__infinite animate__slower">
            <img
              src={questionimg}
              alt="Students with questions"
              className="w-80 md:w-96 h-auto object-contain"
            />
          </div>

          {/* Right Features */}
          <div className="flex-1 space-y-8">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
          Why Learn With Our Platform?
        </h2>
        <p className="text-md text-gray-600 mb-12">
          Discover a smarter, more engaging way to turn reading into real
          understanding and progress.
        </p>
            {/* Feature 1 */}
            <div className="flex gap-4 text-[16px]">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Bite-Sized Learning
                </h3>
                <p className="text-gray-600">
                  Turn long books and PDFs into short, focused lessons that are
                  easy to understand and remember.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4 text-[16px]">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Smart Course Organization
                </h3>
                <p className="text-gray-600">
                  Your material is automatically structured into clear sections
                  and topics, so you always know what to learn next.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-4 text-[16px]">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Motivating Gamification
                </h3>
                <p className="text-gray-600">
                  Stay consistent with streaks, XP, levels, and badges that turn
                  learning into an enjoyable experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyLearn;
