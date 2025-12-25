import React, { useEffect, useRef, useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../contexts/ThemeContext";
import type { IUserProfile } from "../../interfaces/userProfileInterface";
import { useNavigate } from "react-router-dom";

const Topbar: React.FC<{
  profile: IUserProfile | null;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  onLogout: () => void;
}> = ({ profile, collapsed, setCollapsed, onLogout }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`w-full h-16 ${
        isDarkMode
          ? "bg-gray-800 border-b border-gray-700"
          : "bg-white border-b border-gray-100"
      } flex items-center px-6 fixed top-0 left-0 right-0 z-40`}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCollapsed((c) => !c)}
          className={`p-2 rounded-md md:hidden ${
            isDarkMode
              ? "text-gray-200 hover:bg-gray-700"
              : "text-gray-800 hover:bg-gray-100"
          }`}
          aria-label="Toggle sidebar"
        >
          {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </button>
        {/* Left Section */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <img
            src={
              isDarkMode ? "/Images/logo-dark.png" : "/Images/logo-light.png"
            }
            alt="BlogNest"
            className="w-34 cursor-pointer"
            onClick={() => navigate("/user")}
          />
        </div>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-4">
        <div
          className={`text-sm ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {profile?.user?.email}
        </div>

        {/* theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className={`p-2 rounded-full transition ${
            isDarkMode
              ? "text-gray-200 hover:bg-gray-700"
              : "text-gray-800 hover:bg-gray-100"
          }`}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        {/* profile */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setIsProfileOpen((p) => !p)}
            aria-label="User profile"
            className={`w-9 h-9 rounded-full flex items-center justify-center border-2 border-transparent ${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            <FontAwesomeIcon
              icon={faUser}
              className={`w-6 h-6 ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            />
          </button>

          {isProfileOpen && (
            <div
              className={`absolute right-0 w-48 mt-3 rounded-lg shadow-lg border overflow-hidden z-50 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 text-gray-200"
                  : "bg-white border-gray-100 text-gray-800"
              }`}
            >
              <div
                className={`block px-4 py-2 text-sm ${
                  isDarkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                @{profile?.user?.name}
              </div>

              <button
                onClick={() => {
                  navigate("/admin/profile");
                  setIsProfileOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm ${
                  isDarkMode
                    ? "text-gray-200 hover:bg-gray-700"
                    : "text-gray-800 hover:bg-gray-50"
                }`}
              >
                Profile
              </button>

              <button
                onClick={() => {
                  navigate("/admin/settings");
                  setIsProfileOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm ${
                  isDarkMode
                    ? "text-gray-200 hover:bg-gray-700"
                    : "text-gray-800 hover:bg-gray-50"
                }`}
              >
                Settings
              </button>

              <hr
                className={isDarkMode ? "border-gray-700" : "border-gray-100"}
              />

              <button
                onClick={() => {
                  onLogout();
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 ${
                  isDarkMode ? "text-red-400" : "text-red-600"
                }`}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* mobile menu toggle */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((s) => !s)}
          className={`p-2 rounded-full md:hidden ${
            isDarkMode
              ? "text-gray-200 hover:bg-gray-700"
              : "text-gray-800 hover:bg-gray-100"
          }`}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* mobile dropdown (simple) */}
      {isMobileMenuOpen && (
        <div
          className={`absolute top-full left-0 w-full md:hidden z-30 ${
            isDarkMode
              ? "bg-gray-900 border-t border-gray-700 text-gray-200"
              : "bg-white border-t border-gray-100 text-gray-800"
          }`}
        >
          <div className="flex flex-col">
            <button
              onClick={() => {
                navigate("/admin");
                setIsMobileMenuOpen(false);
              }}
              className="px-6 py-3 text-left hover:bg-indigo-600 hover:text-white"
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                navigate("/admin/posts");
                setIsMobileMenuOpen(false);
              }}
              className="px-6 py-3 text-left hover:bg-indigo-600 hover:text-white"
            >
              Posts
            </button>
            <button
              onClick={() => {
                navigate("/admin/users");
                setIsMobileMenuOpen(false);
              }}
              className="px-6 py-3 text-left hover:bg-indigo-600 hover:text-white"
            >
              Users
            </button>
            <button
              onClick={() => {
                onLogout();
                setIsMobileMenuOpen(false);
              }}
              className="px-6 py-3 text-left text-red-500 hover:bg-red-500 hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Topbar;
