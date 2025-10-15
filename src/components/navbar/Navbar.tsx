import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Bell,
  Bookmark,
  Menu,
  Sun,
  Moon,
  PenSquare,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

interface NavbarProps {
  userProfileImage: string;
  onLogout: () => void;
  userName: string;
}

const Navbar: React.FC<NavbarProps> = ({
  userProfileImage,
  onLogout,
  userName,
}) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 border-b shadow-sm backdrop-blur-lg transition-colors duration-300 ${
        isDarkMode
          ? "bg-gray-900/80 border-gray-800"
          : "bg-white/80 border-gray-100"
      }`}
    >
      {/* Left Section */}
      <div className="flex items-center space-x-8">
        <img
          src="/Images/BlogNest.png"
          alt="BlogNest"
          className="h-10 cursor-pointer"
          onClick={() => navigate("/user")}
        />

        <div className="hidden md:flex space-x-6 text-base font-medium">
          <p
            onClick={() => navigate("/user")}
            className={`cursor-pointer ${
              isDarkMode
                ? "text-gray-200 hover:text-indigo-400"
                : "text-gray-800 hover:text-indigo-700"
            }`}
          >
            Home
          </p>
          <p
            onClick={() => navigate("/user/explore")}
            className={`cursor-pointer ${
              isDarkMode
                ? "text-gray-200 hover:text-indigo-400"
                : "text-gray-800 hover:text-indigo-700"
            }`}
          >
            Explore
          </p>
        </div>
      </div>

      {/* Center Search */}
      <div className="flex-1 max-w-lg mx-4">
        <div className="relative flex items-center w-full">
          <Search className="absolute w-5 h-5 ml-3 text-gray-400 dark:text-gray-500 pointer-events-none" />
          <input
            type="search"
            placeholder="Search articles..."
            className="w-full py-2 pl-10 pr-4 text-gray-700 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Create Blog */}
        <button
          onClick={() => navigate("/user/create")}
          className={`flex flex-row items-center btn-primary`}
        >
          <PenSquare className="w-4 h-4 mr-2" />
          Create
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        {/* Bookmark */}
        <button
          title="Bookmarks"
          className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <Bookmark className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            title="Notifications"
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <Bell className="w-5 h-5" />
          </button>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* Profile */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-transparent hover:border-indigo-500 transition"
          >
            {userProfileImage ? (
              <img
                src={userProfileImage}
                alt="User profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <FontAwesomeIcon
                icon={faUser}
                className="w-6 h-6 text-gray-600 dark:text-gray-300"
              />
            )}
          </button>

          {isProfileOpen && (
            <div
              className={`absolute right-0 w-48 mt-3 rounded-lg shadow-lg border overflow-hidden z-50 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-100"
              }`}
            >
              <div
                className={`block px-4 py-2 text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                @{userName}
              </div>
              <button
                onClick={() => navigate("/user/profile")}
                className={`w-full text-left px-4 py-2 text-sm ${
                  isDarkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => navigate("/user/settings")}
                className={`w-full text-left px-4 py-2 text-sm ${
                  isDarkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                Settings
              </button>
              <button
                onClick={() => navigate("/user/create")}
                className={`w-full text-left px-4 py-2 text-sm ${
                  isDarkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                Create Blog
              </button>
              <hr
                className={isDarkMode ? "border-gray-700" : "border-gray-100"}
              />
              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <button className="p-2 rounded-full text-gray-600 dark:text-gray-300 md:hidden hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
