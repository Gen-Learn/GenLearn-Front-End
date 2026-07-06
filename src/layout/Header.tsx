import { Link } from 'react-router-dom';
import { Bell, Zap } from 'lucide-react';
import { Button } from '@/components/ui/index';
import Alert from '@/components/alert/alert';
import { useEffect, useState } from 'react';
import { useNotification } from '@/contexts/NotificationContext';
import { useAuth } from '@/contexts/AuthContext';
import image from '@/assets/images/logoOld.png';
export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const { notifications, unreadCount, markAllRead, courseID } = useNotification();
    const { logout } = useAuth();
    const toggleNotifications = () => {
    setNotificationsOpen((prev) => {
      const next = !prev;
      if (next) {
        setAvatarMenuOpen(false); // close the other dropdown
        markAllRead();
      }
      return next;
    });
  };
    const toggleAvatarMenu = () => {
    setAvatarMenuOpen((prev) => {
      const next = !prev;
      if (next) setNotificationsOpen(false); // close the other dropdown
      return next;
    });
  };
    const handleLogout = async () => {
    setAvatarMenuOpen(false);
    setMobileMenuOpen(false);
    await logout();
  };

    useEffect(() => {
      setNotificationsOpen(false);
      setAvatarMenuOpen(false);
      setMobileMenuOpen(false);
    }, [location.pathname]);
  
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" data-nav="courses" className="flex items-center gap-2">
          <img src={image} alt="GenLearn Logo" className="w-15 h-15" />
          <span className="text-xl font-bold text-gray-900">GenLearn</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/generate" data-nav="upload">
            <Button variant="ghost" size="sm">Upload PDF</Button>
          </Link>
          <div className="relative">
            <button
              type="button"
              onClick={toggleNotifications}
              className="flex justify-center items-center text-2xl gap-2 px-4 py-2 rounded-xl text-gray-600 hover:bg-[#f1e1f7] hover:text-[#8864b5] transition-colors duration-300"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-5 min-w-[1.25rem] rounded-full bg-[#d946ef] text-white text-[0.65rem] font-semibold px-1">
                  {unreadCount}
                </span>
              )}
            </button>

            {notificationsOpen && <Alert notifications={notifications} courseID={courseID} />}
          </div>
          <div
            onClick={toggleAvatarMenu}
            className="relative flex justify-center items-center gap-2 px-4 py-2 rounded-xl text-gray-600  hover:text-[#8864b5] transition-colors duration-300 cursor-pointer"
          >
            <button
              data-nav="profile"
              className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-semibold hover:scale-105 transition-transform"
            >
              JP
            </button>
            {avatarMenuOpen && (
              <div className="absolute top-11 right-0 bg-white shadow-lg rounded-md py-2 w-48 z-50">
                <Link
                  to="/profile"
                  onClick={() => setAvatarMenuOpen(false)}
                  className="text-sm block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  to="/manage-account"
                  onClick={() => setAvatarMenuOpen(false)}
                  className="text-sm block px-4 py-2 hover:bg-gray-100"
                >
                  Manage Account
                </Link>
                <div
                  onClick={handleLogout}
                  className="text-sm block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}