// Footer.tsx
import React from "react";
import { Twitter, Linkedin, Github, Mail, Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

// Mock Footer Data
const footerColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

const Footer: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <footer
      className={`w-full px-10 border-t transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"
      }`}
    >
      <div className="px-4 py-12 md:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 md:gap-16">
          {/* Logo & Description */}
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-3">
              <img className="h-12" src="/Images/BlogNest.png" alt="BlogNest Logo" />
            </div>
            <p
              className={`max-w-xs text-base ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              A modern platform for sharing knowledge and connecting with
              writers worldwide.
            </p>
          </div>

          {/* Navigation Columns */}
          {footerColumns.map((column, index) => (
            <div key={index}>
              <h3
                className={`mb-4 text-lg font-semibold ${
                  isDarkMode ? "text-gray-200" : "text-gray-900"
                }`}
              >
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className={`text-base transition duration-150 ${
                        isDarkMode
                          ? "text-gray-400 hover:text-indigo-400"
                          : "text-gray-600 hover:text-indigo-600"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Separator */}
        <div
          className={`my-10 border-t ${
            isDarkMode ? "border-gray-800" : "border-gray-200"
          }`}
        ></div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
          {/* Copyright */}
          <p
            className={`transition ${
              isDarkMode ? "text-gray-500" : "text-gray-500"
            }`}
          >
            &copy; 2025 BlogNest. All rights reserved.
          </p>

          {/* Social + Theme Toggle */}
          <div className="flex items-center space-x-5">
            {/* Social Links */}
            <div className="flex space-x-5">
              <a
                href="#"
                aria-label="Twitter"
                className={`transition transform hover:scale-110 duration-200 ${
                  isDarkMode ? "text-gray-400 hover:text-indigo-400" : "text-gray-500 hover:text-indigo-600"
                }`}
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className={`transition transform hover:scale-110 duration-200 ${
                  isDarkMode ? "text-gray-400 hover:text-indigo-400" : "text-gray-500 hover:text-indigo-600"
                }`}
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className={`transition transform hover:scale-110 duration-200 ${
                  isDarkMode ? "text-gray-400 hover:text-indigo-400" : "text-gray-500 hover:text-indigo-600"
                }`}
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Email"
                className={`transition transform hover:scale-110 duration-200 ${
                  isDarkMode ? "text-gray-400 hover:text-indigo-400" : "text-gray-500 hover:text-indigo-600"
                }`}
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-2 px-3 py-1 rounded-md border text-sm transition ${
                isDarkMode
                  ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                  : "border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
