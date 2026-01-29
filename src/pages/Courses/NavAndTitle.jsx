function NavAndTitle({setActiveTab }) {
  return (
    <section className="w-full flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="relative w-[80%]">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Your Courses:
        </h1>
        <div className="my-4 sm:my-5">
          <ul className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6 text-sm sm:text-[15px] text-[#505b61] font-semibold">
            <li
              onClick={() => setActiveTab("All")}
              className="bg-[#f6edf7] rounded-xl hover:bg-[#b967c7] hover:text-white px-3 sm:px-4 py-2 cursor-pointer transition-colors duration-300 whitespace-nowrap"
            >
              All Status
            </li>
            <li
              onClick={() => setActiveTab("Not Started")}
              className="bg-[#f6edf7] rounded-xl hover:bg-[#b967c7] hover:text-white px-3 sm:px-4 py-2 cursor-pointer transition-colors duration-300 whitespace-nowrap"
            >
              Not Started
            </li>
            <li
              onClick={() => setActiveTab("In Progress")}
              className="bg-[#f6edf7] rounded-xl hover:bg-[#b967c7] hover:text-white px-3 sm:px-4 py-2 cursor-pointer transition-colors duration-300 whitespace-nowrap"
            >
              In Progress
            </li>
            <li
              onClick={() => setActiveTab("Completed")}
              className="bg-[#f6edf7] rounded-xl hover:bg-[#b967c7] hover:text-white px-3 sm:px-4 py-2 cursor-pointer transition-colors duration-300 whitespace-nowrap"
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
