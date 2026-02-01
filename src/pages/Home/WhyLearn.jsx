import questionimg from "../../assets/images/QuestionHomePage.png";

function WhyLearn() {
  return (
    <section className=" w-full flex justify-center items-center bg-[#f4e9f7]">
      <div className="mb-12 w-[80%]">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Why Learn With Our Platform?
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Discover a smarter, more engaging way to turn reading into real
          understanding and progress.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Image */}
          <div className="flex-shrink-0">
            <img
              src={questionimg}
              alt="Students with questions"
              className="w-80 md:w-96 h-auto object-contain"
            />
          </div>

          {/* Right Features */}
          <div className="flex-1 space-y-8">
            {/* Feature 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 text-green-600 ">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.5 3h-15A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zM9 17L5 13l1.41-1.41L9 14.17l8.59-8.59L19 7l-10 10z" />
                  </svg>
                </div>
              </div>
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
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 text-purple-600">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
                  </svg>
                </div>
              </div>
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
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 text-purple-600">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.58 16.09l-1.09-7.66A3.996 3.996 0 0016.53 5H7.47C5.48 5 3.79 6.46 3.51 8.43l-1.09 7.66C2.2 17.63 3.39 19 4.94 19h0c.68 0 1.32-.27 1.8-.75L9 16h6l2.25 2.25c.48.48 1.13.75 1.8.75h0c1.56 0 2.75-1.37 2.53-2.91zM11 11H9v2H8v-2H6v-1h2V8h1v2h2v1zm4-0.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
                  </svg>
                </div>
              </div>
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
