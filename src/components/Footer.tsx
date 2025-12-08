// Footer.tsx
import React from "react";
import { Twitter, Linkedin, Github, Mail, Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

interface FooterLink {
  label: string;
  href: string; // will convert to navigate path
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const footerColumns: FooterColumn[] = [
  {
    title: "Community",
    links: [
      { label: "Become a Contributor", href: "/user/becomeContributer" },
      { label: "Writer Guidelines", href: "/user/writerGuidelines" },
      { label: "Community Standards", href: "/user/communityStandards" },
      { label: "Report an Issue", href: "/user/reportAnIssue" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Technical Writing Tips", href: "/user/writingTips" },
      { label: "Publishing Guide", href: "/user/publishingGuide" },
      { label: "Help Center", href: "/user/help" },
      { label: "FAQ", href: "/user/faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/user/privacy" },
      { label: "Terms of Service", href: "/user/terms" },
      { label: "Content Ownership Policy", href: "/user/contentOwnership" },
      { label: "Cookie Policy", href: "/user/cookies" },
    ],
  },
];

const Footer: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <footer
      className={`w-full px-10 border-t transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"
      }`}
    >
      <div className="px-4 py-12 md:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 md:gap-16">
          {/* Logo */}
          <div className="col-span-2">
            <div
              className="flex items-center space-x-2 mb-3 cursor-pointer"
              onClick={() => navigate("/user")}
            >
              <img
                src={
                  isDarkMode
                    ? "/Images/logo-dark.png"
                    : "/Images/logo-light.png"
                }
                alt="BlogNest"
                className="w-34"
              />
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

          {/* Dynamic Footer Columns Using navigate */}
          {footerColumns.map((column, index) => (
            <div key={index}>
              <h3
                onClick={() => {
                  if (column.title === "Community") {
                    navigate("/user/community");
                  } else if (column.title === "Resources") {
                    navigate("/user/resources");
                  } else if (column.title === "Legal") {
                    navigate("/user/legal");
                  }
                }}
                className={`mb-4 text-lg font-semibold cursor-pointer ${
                  isDarkMode
                    ? "text-gray-200 hover:text-indigo-400"
                    : "text-gray-900 hover:text-indigo-600"
                }`}
              >
                {column.title}
              </h3>

              <ul className="space-y-3">
                {column.links.map((link, i) => (
                  <li key={i}>
                    <button
                      onClick={() => navigate(link.href)}
                      className={`text-left text-base transition duration-150 cursor-pointer ${
                        isDarkMode
                          ? "text-gray-400 hover:text-indigo-400"
                          : "text-gray-600 hover:text-indigo-600"
                      }`}
                    >
                      {link.label}
                    </button>
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

        {/* Bottom Row */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
          <p className={`${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
            © 2025 BlogNest. All rights reserved.
          </p>

          <div className="flex items-center space-x-5">
            {/* Social Links — still href, but you can switch to navigate if internal */}
            <div className="flex space-x-5">
              {[Twitter, Linkedin, Github, Mail].map((Icon, idx) => (
                <button
                  aria-label="social"
                  key={idx}
                  className={`transition transform hover:scale-110 duration-200 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-indigo-400"
                      : "text-gray-500 hover:text-indigo-600"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
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
