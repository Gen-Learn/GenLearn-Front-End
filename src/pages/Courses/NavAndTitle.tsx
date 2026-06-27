function NavAndTitle({
  setActiveTab,
}: {
  setActiveTab: (tab: string) => void;
}) {
  return (
    <section className="w-full flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="relative w-[80%]">
        <h1 className="gradient-bg-text text-2xl sm:text-3xl lg:text-4xl font-bold">
          Your Courses:
        </h1>
        <div className="my-4 sm:my-5">
          <ul className="flex flex-wrap gap-2 sm:gap-4 lg:gap-6 text-[10px] sm:text-[15px] text-[#505b61] font-semibold">
            <li
              onClick={() => setActiveTab("All")}
              className="bg-[#f6edf7] rounded-xl hover:bg-[#b967c7] hover:text-white px-3 sm:px-4 py-2 cursor-pointer transition-colors duration-300 whitespace-nowrap border-dashed border border-[#b967c7]"
            >
              All Status
            </li>
            <li
              onClick={() => setActiveTab("not_started")}
              className="bg-[#f6edf7] rounded-xl hover:bg-[#b967c7] hover:text-white px-3 sm:px-4 py-2 cursor-pointer transition-colors duration-300 whitespace-nowrap border-dashed border border-[#b967c7]"
            >
              Not Started
            </li>
            <li
              onClick={() => setActiveTab("in_progress")}
              className="bg-[#f6edf7] rounded-xl hover:bg-[#b967c7] hover:text-white px-3 sm:px-4 py-2 cursor-pointer transition-colors duration-300 whitespace-nowrap border-dashed border border-[#b967c7]"
            >
              In Progress
            </li>
            <li
              onClick={() => setActiveTab("completed")}
              className="bg-[#f6edf7] rounded-xl hover:bg-[#b967c7] hover:text-white px-3 sm:px-4 py-2 cursor-pointer transition-colors duration-300 whitespace-nowrap border-dashed border border-[#b967c7]"
            >
              Completed
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default NavAndTitle;
