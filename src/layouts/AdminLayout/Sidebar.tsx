import React, { useEffect } from "react";
import type { IUserProfile } from "../../interfaces/userProfileInterface";
import AdminNavItem from "./AdminNavItem";
import { useTheme } from "../../contexts/ThemeContext";

interface SidebarProps {
  profile: IUserProfile | null;
  onLogout: () => void;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  profile,
  onLogout,
  collapsed,
  setCollapsed,
}) => {
  const { isDarkMode } = useTheme();

  // auto-collapse on small screens
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      if (window.innerWidth < 768 && !collapsed) setCollapsed(true);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [collapsed, setCollapsed]);

  return (
    <aside
      className={`flex flex-col transition-all duration-200 ${
        isDarkMode
          ? "bg-gray-800 border-r border-gray-700 text-gray-300"
          : "bg-white border-r border-gray-100 text-gray-700"
      } ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* Header */}
      <div
        className={`mt-16 px-4 py-4 flex items-center justify-between border-b ${
          isDarkMode ? "border-gray-700" : "border-gray-100"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
              isDarkMode
                ? "bg-indigo-500 text-white"
                : "bg-indigo-600 text-white"
            }`}
          >
            AD
          </div>

          {!collapsed && (
            <div>
              <h3
                className={`text-sm font-semibold ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Admin Panel
              </h3>
              <p
                className={`text-xs ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {profile?.user?.name}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={() => setCollapsed((c) => !c)}
          className={`p-2 rounded-lg transition ${
            isDarkMode
              ? "hover:bg-gray-700 text-gray-300"
              : "hover:bg-gray-100 text-gray-600"
          }`}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M6 6h8v2H6zM6 12h8v2H6z" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-auto">
        <AdminNavItem
          to="/admin"
          icon="dashboard"
          label="Dashboard"
          collapsed={collapsed}
        />
        <AdminNavItem
          to="/admin/posts"
          icon="posts"
          label="Post Management"
          collapsed={collapsed}
        />
        <AdminNavItem
          to="/admin/users"
          icon="users"
          label="User Management"
          collapsed={collapsed}
        />
        <AdminNavItem
          to="/admin/analytics"
          icon="chart"
          label="Analytics"
          collapsed={collapsed}
        />
        <AdminNavItem
          to="/admin/settings"
          icon="settings"
          label="Settings"
          collapsed={collapsed}
        />
      </nav>

      {/* Logout */}
      <div
        className={`px-3 py-3 border-t ${
          isDarkMode ? "border-gray-700" : "border-gray-100"
        }`}
      >
        <button
          onClick={onLogout}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
            isDarkMode
              ? "text-red-400 hover:bg-red-900/30"
              : "text-red-600 hover:bg-red-50"
          }`}
        >
          Log out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
