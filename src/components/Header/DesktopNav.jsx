import { Link } from "react-router-dom";
function DesktopNav() {
  return (
    <div className="hidden md:flex justify-center items-center">
      <ul className=" flex justify-between items-center mx-2  text-[#505b61] font-semibold gap-10">
        <li className="hover:text-[#8864b5]">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-[#8864b5]">
          <Link to="/generate">Generate</Link>
        </li>
        <li className="hover:text-[#8864b5]">
          <Link to="/courses">Courses</Link>
        </li>
      </ul>
    </div>
  );
}

export default DesktopNav;
