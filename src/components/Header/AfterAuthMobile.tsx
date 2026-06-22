import { Link } from "react-router-dom";
import { FaFireAlt } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { IoChevronDown } from "react-icons/io5";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNotification } from "@/contexts/NotificationContext";
import Alert from "@/components/alert/alert";

type AfterAuthMobileProps = {
  setIsMenuOpen: (isOpen: boolean) => void;
};

function AfterAuthMobile({ setIsMenuOpen }: AfterAuthMobileProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { logout } = useAuth();
  const { notifications, unreadCount, markAllRead } = useNotification();

  const toggleNotifications = () => {
    setNotificationsOpen((prev) => !prev);
    if (!notificationsOpen) {
      markAllRead();
    }
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    logout();
  };

  return (
        <div className="flex flex-col justify-center text-2xl items-center gap-3  ">
            <Link
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm  rounded-lg text-gray-600  hover:text-[#8864b5] transition-colors duration-200"
            >
              Profile
            </Link>
            <Link
              to="/manage-account"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm  rounded-lg text-gray-600  hover:text-[#8864b5] transition-colors duration-200"
            >
              Manage Account
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="text-sm  rounded-lg text-left text-red-500  transition-colors duration-200"
            >
              Logout
            </button>
          </div>
  );
}

export default AfterAuthMobile;