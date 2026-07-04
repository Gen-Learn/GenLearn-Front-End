import { useState, useEffect } from 'react';
import { Menu, X, Zap, Bell, Flame, CircleUser } from 'lucide-react';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useNotification } from '@/contexts/NotificationContext';
import Alert from '@/components/alert/alert';
import { useLocation } from "react-router-dom";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, isLoading, logout } = useAuth();
  const { notifications, unreadCount, markAllRead, courseID } = useNotification();
  const inHomePage = location.pathname === "/";
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close any open dropdowns/menus whenever the route changes
  useEffect(() => {
    setNotificationsOpen(false);
    setAvatarMenuOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Courses', href: '#courses' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

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

  return (
    <header
      className={`sticky top-0 z-40 border-b left-0 transition-all duration-300 ${scrolled
        ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-soft py-3'
        : 'bg-white/80 py-3'
         }` }
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">GenLearn</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) =>
              item.href.charAt(0) === '#' ? (
                inHomePage ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
                  >
                    {item.label}
                  </a>
                ) : null
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop right side: auth-aware */}
          <div className="hidden md:flex items-center gap-3">
            {isLoading ? (
              // Avoid flashing "Sign In" before the session check resolves
              <div className="w-24 h-9" />
            ) : isAuthenticated ? (
              <ul className="flex justify-between items-center gap-1">
                <li className="flex justify-center text-base items-center gap-2 px-4 py-2 rounded-xl text-[#8864b5] hover:bg-[#f1e1f7] transition-colors duration-300">
                  <span>0</span>
                  <Flame className="w-5 h-5" />
                </li>
                <li className="relative">
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
                </li>
                <li
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
                </li>
              </ul>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Get Started Free</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-soft animate-slide-down">
            <nav className="flex flex-col p-6 gap-4">
              {navItems.map((item) =>
                item.href.charAt(0) === '#' ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-gray-600 hover:text-primary-600 font-medium transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="text-gray-600 hover:text-primary-600 font-medium transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}

              <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                {isLoading ? null : isAuthenticated ? (
                  <>
                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="secondary" className="w-full">
                        Profile
                      </Button>
                    </Link>
                    <Link to="/manage-account" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full">
                        Manage Account
                      </Button>
                    </Link>
                    <Button className="w-full" onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="secondary" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full">Get Started Free</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}