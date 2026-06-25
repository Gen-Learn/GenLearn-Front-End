import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, type LucideIcon } from "lucide-react";
import logo from "../../assets/images/LogoFooter.png";

interface NavLink {
  to: string;
  label: string;
}

interface AboutLink {
  label: string;
  href: string;
}

interface SocialLink {
  Icon: LucideIcon;
  label: string;
  href: string;
}

const siteLinks: NavLink[] = [
  { to: "/", label: "Home" },
  { to: "/generate", label: "Generate" },
  { to: "/courses", label: "Courses" },
];

const aboutLinks: AboutLink[] = [
  { label: "Terms & Condition", href: "#" },
  { label: "Contact us", href: "#" },
];

const socialLinks: SocialLink[] = [
  { Icon: Facebook, label: "Facebook", href: "#" },
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Linkedin, label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#f0f2f5] pt-12 pb-8 px-6 mt-10 overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#8864b5] via-[#d946ef] to-[#8864b5]" />

      {/* Decorative soft glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#f1e1f7] rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10 text-center md:text-left">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Link
              to="/"
              className="inline-flex items-center transition-transform hover:scale-[1.03]"
            >
              <img src={logo} alt="GenLearn Logo" className="h-10 w-auto" />
            </Link>

            <p className="text-sm text-gray-500 leading-relaxed max-w-[220px]">
              Learn smarter with AI-generated courses built around you.
            </p>
          </div>

          {/* Our Site Section */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4 relative inline-block">
              Our site
              <span className="absolute -bottom-1 left-0 right-0 mx-auto md:mx-0 w-8 h-[2px] bg-[#8864b5] rounded-full" />
            </h3>

            <ul className="space-y-2.5">
              {siteLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-600 hover:text-[#8864b5] transition-colors duration-200 hover:underline underline-offset-4"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us Section */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4 relative inline-block">
              About us
              <span className="absolute -bottom-1 left-0 right-0 mx-auto md:mx-0 w-8 h-[2px] bg-[#8864b5] rounded-full" />
            </h3>

            <ul className="space-y-2.5">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-[#8864b5] transition-colors duration-200 hover:underline underline-offset-4"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect With Us Section */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4 relative inline-block">
              Connect with us
              <span className="absolute -bottom-1 left-0 right-0 mx-auto md:mx-0 w-8 h-[2px] bg-[#8864b5] rounded-full" />
            </h3>

            <div className="flex gap-3 justify-center md:justify-start">
              {socialLinks.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 shadow-sm transition-all duration-300 hover:text-white hover:bg-[#8864b5] hover:-translate-y-1 hover:shadow-md"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-300/70 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-gray-500">
            © 2026 GenLearn Team. All rights reserved.
          </p>

          <p className="text-sm text-gray-400">
            Designed with <span className="text-[#d946ef]">♥</span> by GenLearn
            Team
          </p>
        </div>
      </div>
    </footer>
  );
}