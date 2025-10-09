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
interface NavbarProps {
  userProfileImage: string;
}

const Navbar: React.FC<NavbarProps> = ({ userProfileImage }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Initialize theme on load
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // Close profile dropdown on outside click
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
   <nav className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-3 bg-white border-b border-gray-100 shadow-sm dark:bg-gray-900 dark:border-gray-800 transition-colors duration-300 z-50">
      {/* Left Section: Logo and Links */}
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-full"></div>
          <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
            BlogNest
          </span>
        </div>
        {/* Navigation Links */}
        <div className="hidden space-x-6 text-base font-medium md:flex">
          <a href="#" className="nav-link">
            Home
          </a>
          <a href="#" className="nav-link">
            Explore
          </a>
        </div>
      </div>

      {/* Center Section: Search */}
      <div className="flex-1 max-w-lg mx-4">
        <div className="relative flex items-center w-full">
          <Search className="absolute w-5 h-5 ml-3 text-gray-400 dark:text-gray-500 pointer-events-none" />
          <input
            type="search"
            placeholder="Search articles..."
            className="w-full py-2 pl-10 pr-4 text-gray-700 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Create Blog */}
        <button
          className="flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 
                     rounded-lg hover:bg-indigo-700 
                     dark:bg-indigo-500 dark:hover:bg-indigo-400 
                     transition-colors duration-150"
        >
          <PenSquare className="w-4 h-4 mr-2 text-gray-800 dark:text-white" />
          <span className="text-gray-800 dark:text-white font-semibold">
            Create
          </span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        {/* Bookmark */}
        <button className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <Bookmark className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <Bell className="w-5 h-5" />
          </button>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* Profile Dropdown */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-transparent hover:border-indigo-500 transition"
          >
            {!userProfileImage ? (
              <img
                src={userProfileImage}
                alt="User"
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
            <div className="absolute right-0 w-48 mt-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-50">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Create Blog
              </a>
              <hr className="border-gray-100 dark:border-gray-700" />
              <button className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <button className="p-2 text-gray-600 dark:text-gray-300 rounded-full md:hidden hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
