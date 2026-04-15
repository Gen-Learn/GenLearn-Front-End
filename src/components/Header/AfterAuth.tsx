import { Link } from "react-router-dom";
import { FaFireAlt } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
function AfterAuth() {
  const [MenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <ul className="hidden justify-between items-center gap-4 md:flex md:flex-row flex-col">
      <li className="flex justify-center text-2xl items-center gap-2 px-4 py-2 rounded-xl hover:bg-[#f1e1f7] hover:text-[#8864b5] transition-colors duration-300">
        <IoIosNotificationsOutline />
      </li>
      <li className="flex justify-center text-2xl items-center gap-2 px-4 py-2 rounded-xl text-[#8864b5] hover:bg-[#f1e1f7] hover:text-[#8864b5] transition-colors duration-300">
        <span>0 </span>
        <FaFireAlt />
      </li>
      <li
        onClick={() => setIsMenuOpen(!MenuOpen)}
        className="relative flex justify-center text-2xl items-center gap-2 px-4 py-2 rounded-xl hover:bg-[#f1e1f7] hover:text-[#8864b5] transition-colors duration-300"
      >
        <RxAvatar />
        {MenuOpen && (
          <div className="absolute top-11 right-4 bg-white shadow-lg rounded-md py-2 w-48">
            <Link to="/profile" className="text-sm block px-4 py-2 hover:bg-gray-100">
              Profile
            </Link>
            <Link to="/logout" className="text-sm block px-4 py-2 hover:bg-gray-100">
              Manage Account
            </Link>
            <div onClick={logout} className="text-sm block px-4 py-2 hover:bg-gray-100">
              Logout
            </div>
          </div>
        )}
      </li>
    </ul>
  );
}

export default AfterAuth;
