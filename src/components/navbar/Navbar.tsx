import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, Bookmark, Menu, X, Sun, Moon, PenSquare } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useSearchParams } from 'react-router-dom';

interface NavbarProps {
  userProfileImage: string;
  onLogout: () => void;
  userName: string;
}

const Navbar: React.FC<NavbarProps> = ({ userProfileImage, onLogout, userName }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3 border-b shadow-sm backdrop-blur-lg transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white/90 border-gray-100'
      }`}
    >
      {/* Left Section */}
      <div className="flex items-center space-x-4 sm:space-x-6">
        <img
          src={isDarkMode ? '/Images/logo-dark.png' : '/Images/logo-light.png'}
          alt="BlogNest"
          className="w-34 cursor-pointer"
          onClick={() => navigate('/user')}
        />

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-6 text-base font-medium">
          <p
            onClick={() => navigate('/user')}
            className={`cursor-pointer ${
              isDarkMode
                ? 'text-gray-200 hover:text-indigo-400'
                : 'text-gray-800 hover:text-indigo-700'
            }`}
          >
            Home
          </p>
          <p
            onClick={() => navigate('/user/about')}
            className={`cursor-pointer ${
              isDarkMode
                ? 'text-gray-200 hover:text-indigo-400'
                : 'text-gray-800 hover:text-indigo-700'
            }`}
          >
            About
          </p>
        </div>
      </div>

      {/* Center Search */}
      <div className="hidden md:flex flex-1 max-w-lg mx-4">
        <div className="relative flex items-center w-full">
          <Search
            className={`absolute w-5 h-5 ml-3 pointer-events-none ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          />
          <input
            type="search"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value;
              setSearchQuery(value);

              if (value.trim() === '') {
                navigate('/user');
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                navigate(`/user?search=${encodeURIComponent(searchQuery.trim())}`);
              }
            }}
            className={`w-full py-2 pl-10 pr-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
              isDarkMode
                ? 'bg-gray-800 text-gray-200 placeholder-gray-400'
                : 'bg-gray-100 text-gray-800 placeholder-gray-500'
            }`}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Create Blog */}
        <button
          onClick={() => navigate('/user/blogs/new')}
          className={`hidden sm:flex flex-row items-center px-3 py-2 rounded-lg border transition ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700'
              : 'bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200'
          }`}
        >
          <PenSquare className="w-4 h-4 mr-2" />
          Create
        </button>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className={`p-2 rounded-full transition ${
            isDarkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'
          }`}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Bookmark */}
        <button
          type="button"
          title="Bookmarks"
          aria-label="Bookmarks"
          onClick={() => navigate('/user/profile', { state: { activeTab: 'Saved Blogs' } })}
          className={`hidden sm:block p-2 rounded-full transition ${
            isDarkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'
          }`}
        >
          <Bookmark className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <div className="relative hidden sm:block">
          <button
            type="button"
            title="Notifications"
            aria-label="Notifications"
            className={`p-2 rounded-full transition ${
              isDarkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'
            }`}
          >
            <Bell className="w-5 h-5" />
          </button>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* Profile */}
        <div ref={dropdownRef} className="relative hidden sm:block">
          <button
            type="button"
            onClick={() => setIsProfileOpen((prev) => !prev)}
            aria-label="User profile menu"
            className={`flex items-center justify-center w-9 h-9 rounded-full border-2 border-transparent hover:border-indigo-500 transition ${
              isDarkMode ? 'text-gray-200' : 'text-gray-800'
            }`}
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
                className={`w-6 h-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}
              />
            )}
          </button>

          {isProfileOpen && (
            <div
              className={`absolute right-0 w-48 mt-3 rounded-lg shadow-lg border overflow-hidden z-50 ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
              }`}
            >
              <div
                className={`block px-4 py-2 text-sm ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}
              >
                @{userName}
              </div>
              <button
                onClick={() => navigate('/user/profile')}
                className={`w-full text-left px-4 py-2 text-sm ${
                  isDarkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-50'
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => navigate('/user/settings')}
                className={`w-full text-left px-4 py-2 text-sm ${
                  isDarkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-50'
                }`}
              >
                Settings
              </button>
              <button
                onClick={() => navigate('/user/blogs/new')}
                className={`w-full text-left px-4 py-2 text-sm ${
                  isDarkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-50'
                }`}
              >
                Create Blog
              </button>
              <hr className={isDarkMode ? 'border-gray-700' : 'border-gray-100'} />
              <button
                onClick={onLogout}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-red-50 ${
                  isDarkMode ? 'text-red-400' : 'text-red-600'
                }`}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          title="Menu"
          aria-label="Toggle mobile menu"
          className={`p-2 rounded-full md:hidden transition ${
            isDarkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'
          }`}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" aria-hidden="true" />
          ) : (
            <Menu className="w-6 h-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div
          className={`absolute top-full left-0 w-full flex flex-col md:hidden border-t z-40 ${
            isDarkMode
              ? 'bg-gray-900 border-gray-700 text-gray-200'
              : 'bg-white border-gray-200 text-gray-800'
          }`}
        >
          <button
            onClick={() => {
              navigate('/user');
              setIsMobileMenuOpen(false);
            }}
            className="px-6 py-3 text-left hover:bg-indigo-600 hover:text-white"
          >
            Home
          </button>
          <button
            onClick={() => {
              navigate('/user/explore');
              setIsMobileMenuOpen(false);
            }}
            className="px-6 py-3 text-left hover:bg-indigo-600 hover:text-white"
          >
            Explore
          </button>
          <button
            onClick={() => {
              navigate('/user/profile');
              setIsMobileMenuOpen(false);
            }}
            className="px-6 py-3 text-left hover:bg-indigo-600 hover:text-white"
          >
            Profile
          </button>
          <button
            onClick={() => {
              navigate('/user/create');
              setIsMobileMenuOpen(false);
            }}
            className="px-6 py-3 text-left hover:bg-indigo-600 hover:text-white"
          >
            Create Blog
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
      )}
    </nav>
  );
};

export default Navbar;
