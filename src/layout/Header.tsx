import { Link, useLocation } from "react-router-dom";
import { Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui";
import Alert from "@/components/alert/alert";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNotification } from "@/contexts/NotificationContext";
import { useAuth } from "@/contexts/AuthContext";
import image from "@/assets/images/logoOld.png";

export default function Header() {
  const location = useLocation();

  const [ mobileMenuOpen, setMobileMenuOpen ] = useState(false);
  const [ avatarMenuOpen, setAvatarMenuOpen ] = useState(false);
  const [ notificationsOpen, setNotificationsOpen ] = useState(false);

  const { notifications, unreadCount, markAllRead, courseID } =
    useNotification();
  const { logout } = useAuth();

  useEffect(() => {
    setMobileMenuOpen(false);
    setAvatarMenuOpen(false);
    setNotificationsOpen(false);
  }, [ location.pathname ]);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ mobileMenuOpen ]);

  const toggleNotifications = () => {
    setNotificationsOpen((p) => {
      const n = !p;
      if (n) {
        setAvatarMenuOpen(false);
        markAllRead();
      }
      return n;
    });
  };

  const toggleAvatarMenu = () => {
    setAvatarMenuOpen((p) => {
      const n = !p;
      if (n) setNotificationsOpen(false);
      return n;
    });
  };

  const handleLogout = async () => {
    setAvatarMenuOpen(false);
    setMobileMenuOpen(false);
    await logout();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={image} alt="GenLearn" className="w-10 sm:w-12" />
          <span className="text-lg font-bold text-gray-900 sm:text-xl">
            GenLearn
          </span>
        </Link>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          <Link to="/generate">
            <Button variant="ghost" size="sm">
              Upload PDF
            </Button>
          </Link>

          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="relative rounded-xl p-2 hover:bg-purple-50"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-fuchsia-500 px-1 text-[10px] text-white">
                  {unreadCount}
                </span>
              )}
            </button>
            {notificationsOpen && (
              <div className="absolute right-0 top-11 z-50">
                <Alert notifications={notifications} courseID={courseID} />
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={toggleAvatarMenu}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 font-semibold text-white"
            >
              JP
            </button>

            {avatarMenuOpen && (
              <div className="absolute right-0 top-12 w-48 rounded-md bg-white py-2 shadow-lg z-50">
                <Link
                  to="/profile"
                  onClick={() => setAvatarMenuOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  to="/manage-account"
                  onClick={() => setAvatarMenuOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Setting
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile right side: bell + hamburger */}
        <div className="flex items-center gap-1 md:hidden">
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="relative rounded-lg p-2 hover:bg-gray-100"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-fuchsia-500 px-1 text-[10px] text-white">
                  {unreadCount}
                </span>
              )}
            </button>
            {notificationsOpen && (
              <div className="absolute right-0 top-11 z-50">
                <Alert notifications={notifications} courseID={courseID} />
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="rounded-lg p-2 hover:bg-gray-100"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Backdrop + drawer are portaled to document.body so no ancestor
          (transform, overflow, filter, etc.) can break their fixed positioning */}
      {createPortal(
        <>
          <div
            onClick={() => setMobileMenuOpen(false)}
            className={`md:hidden fixed inset-0 z-[90] bg-black/40 transition-opacity duration-300 ${mobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
              }`}
          />

          <div
            className={`md:hidden fixed top-0 right-0 z-[100] h-full w-full max-w-xs bg-white shadow-xl transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <span className="text-lg font-bold text-gray-900">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-600"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-col gap-2 p-4">
              <Link to="/generate" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">Upload PDF</Button>
              </Link>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 hover:bg-gray-100"
              >
                Profile
              </Link>
              <Link
                to="/manage-account"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 hover:bg-gray-100"
              >
                Setting
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-lg px-3 py-2 text-left hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </>,
        document.body,
      )}
    </header>
  );
}