import { Link } from "react-router-dom";
import { FaFireAlt } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNotification } from "@/contexts/NotificationContext";
import Alert from "@/components/alert/alert";
function AfterAuth() {
  const [MenuOpen, setIsMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { logout } = useAuth();
  const { notifications, unreadCount, markAllRead } = useNotification();

  const toggleNotifications = () => {
    setNotificationsOpen((prev) => !prev);
    if (!notificationsOpen) {
      markAllRead();
    }
  };

  return (
    <ul className="hidden justify-between items-center gap-4 md:flex md:flex-row flex-col">
      <li className="relative">
        <button
          type="button"
          onClick={toggleNotifications}
          className="flex justify-center items-center text-2xl gap-2 px-4 py-2 rounded-xl hover:bg-[#f1e1f7] hover:text-[#8864b5] transition-colors duration-300"
        >
          <IoIosNotificationsOutline />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-5 min-w-[1.25rem] rounded-full bg-[#d946ef] text-white text-[0.65rem] font-semibold px-1">
              {unreadCount}
            </span>
          )}
        </button>

        {notificationsOpen && (
          <Alert notifications={notifications} />
        )}
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
          <div className="absolute top-11 right-4 bg-white shadow-lg rounded-md py-2 w-48 z-50">
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
