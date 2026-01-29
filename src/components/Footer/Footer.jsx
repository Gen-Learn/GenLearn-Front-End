import React from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import logo from "../../assets/images/LogoFooter.png";
export default function Footer() {
  return (
    <footer className="bg-[#f0f2f5] py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          {/* Logo Section */}
          <div className="flex items-start">
            <img src={logo} alt="GenLearn Logo" />
          </div>

          {/* Our Site Section */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Our site</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Generate
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Courses
                </a>
              </li>
            </ul>
          </div>

          {/* About Us Section */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">About us</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Terms & Condition
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Contact us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Contact us</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-pink-600 hover:bg-pink-50 transition-all shadow-sm"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-blue-700 hover:bg-blue-50 transition-all shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-300 pt-4">
          <p className="text-center text-sm text-gray-500">
            Copyright © 2025 Genlearn Team | Designed by Genlearn Team
          </p>
        </div>
      </div>
    </footer>
  );
}
