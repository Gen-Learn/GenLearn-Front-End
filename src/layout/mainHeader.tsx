import { useState, useEffect } from 'react';
import { Menu, X, Bell, Flame } from 'lucide-react';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useNotification } from '@/contexts/NotificationContext';
import Alert from '@/components/alert/alert';
import { useLocation } from 'react-router-dom';
import image from '@/assets/images/logoOld.png';

export default function Header() {
  const [ scrolled, setScrolled ] = useState(false);
  const [ mobileMenuOpen, setMobileMenuOpen ] = useState(false);
  const [ avatarMenuOpen, setAvatarMenuOpen ] = useState(false);
  const [ notificationsOpen, setNotificationsOpen ] = useState(false);
  const location = useLocation();
  const { isAuthenticated, isLoading, logout } = useAuth();
  const { notifications, unreadCount, markAllRead, courseID } = useNotification();
  const inHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close any open dropdowns/menus whenever the route changes
  useEffect(() => {
    setNotificationsOpen(false);
    setAvatarMenuOpen(false);
    setMobileMenuOpen(false);
  }, [ location.pathname ]);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [ mobileMenuOpen ]);

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
        setAvatarMenuOpen(false);
        markAllRead();
      }
      return next;
    });
  };

  const toggleAvatarMenu = () => {
    setAvatarMenuOpen((prev) => {
      const next = !prev;
      if (next) setNotificationsOpen(false);
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
      className={`sticky top-0 z-40 left-0 bg-white/80 py-3 transition-all duration-300 ${scrolled ? 'border-b border-gray-200/50 shadow-soft' : ''
        }`}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="" className="flex items-center gap-2 group shrink-0">
            <img src={image} alt="GenLearn Logo" className="w-10 sm:w-12" />
            <span className="text-lg sm:text-xl font-bold text-gray-900">GenLearn</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
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
          <div className="hidden lg:flex items-center gap-3">
            {isLoading ? (
              // Avoid flashing "Sign In" before the session check resolves
              <div className="w-24 h-9" />
            ) : isAuthenticated ? (
              <ul className="flex justify-between items-center gap-1">
                <li className="flex justify-center text-base items-center gap-2 px-4 py-2 rounded-xl text-[#8864b5]">
                  <span>0</span>
                  <Flame className="w-5 h-5" />
                </li>
                <li className="relative">
                  <button
                    type="button"
                    onClick={toggleNotifications}
                    className="flex justify-center items-center gap-2 px-4 py-2 rounded-xl text-gray-600 hover:bg-[#f1e1f7] hover:text-[#8864b5] transition-colors duration-300"
                  >
                    <Bell className="w-5 h-5" />
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
                  className="relative flex justify-center items-center gap-2 px-4 py-2 rounded-xl text-gray-600 hover:text-[#8864b5] transition-colors duration-300 cursor-pointer"
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
                        Setting
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

          {/* Mobile right side: streak + bell + hamburger */}
          <div className="flex lg:hidden items-center gap-1">
            {!isLoading && isAuthenticated && (
              <>
                <div className="flex items-center gap-1 px-2 py-1.5 rounded-xl text-[#8864b5] text-sm">
                  <span>0</span>
                  <Flame className="w-5 h-5" />
                </div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={toggleNotifications}
                    className="relative flex items-center p-2 rounded-xl text-gray-600 hover:bg-[#f1e1f7] hover:text-[#8864b5] transition-colors duration-300"
                    aria-label="Notifications"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-5 min-w-[1.25rem] rounded-full bg-[#d946ef] text-white text-[0.65rem] font-semibold px-1">
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
              </>
            )}

            <button
              className="p-2 text-gray-600 shrink-0"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        className={`lg:hidden fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      />

      {/* Right-side sliding drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 z-50 h-full w-full max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <span className="text-lg font-bold text-gray-900">Menu</span>
          <button
            className="p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col p-6 gap-4 overflow-y-auto h-[calc(100%-4.5rem)]">
          {navItems.map((item) =>
            item.href.charAt(0) === '#' ? (
              inHomePage ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-600 hover:text-primary-600 font-medium transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ) : null
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

          <div className="flex flex-col gap-3 pt-4 border-t border-gray-100 mt-auto">
            {isLoading ? null : isAuthenticated ? (
              <>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="secondary" className="w-full">
                    Profile
                  </Button>
                </Link>
                <Link to="/manage-account" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full">
                    Setting
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
      </div >
    </header >
  );
}