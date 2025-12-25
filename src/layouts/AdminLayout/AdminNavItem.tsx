import { NavLink } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

type IconName = "dashboard" | "posts" | "users" | "chart" | "settings";

export default function AdminNavItem({
  to,
  label,
  icon,
  collapsed,
}: {
  to: string;
  label: string;
  icon: IconName;
  collapsed: boolean;
}) {
  const { isDarkMode } = useTheme();

  return (
    <NavLink
      to={to}
      end={to === "/admin"}
      className={({ isActive }) =>
        `
        flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200
        ${
          isActive
            ? isDarkMode
              ? "bg-gray-700 text-gray-100"
              : "bg-gray-100 text-gray-900 shadow-inner"
            : isDarkMode
            ? "text-gray-400 hover:bg-gray-700/50 hover:text-gray-200"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }
        `
      }
    >
      {/* Icon */}
      <span className="w-6 h-6 flex items-center justify-center shrink-0">
        {icon === "dashboard" && (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zM13 21h8v-10h-8v10zm0-18v6h8V3h-8z" />
          </svg>
        )}
        {icon === "posts" && (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 4v16h18V4H3zm16 14H5V6h14v12zM7 8h10v2H7z" />
          </svg>
        )}
        {icon === "users" && (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zM8 13c-2.67 0-8 1.34-8 4v2h18v-2c0-2.66-5.33-4-10-4zM16 13c-.29 0-.62.02-.97.05 2.16.86 3.97 2.2 3.97 3.95v2h4v-2c0-2.66-5.33-4-7-4z" />
          </svg>
        )}
        {icon === "chart" && (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 9.2V19h14V9.2L12 3 5 9.2zM7 17H9v-4H7v4zm4 0h2v-7h-2v7zm4 0h2v-10h-2v10z" />
          </svg>
        )}
        {icon === "settings" && (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.43 12.98c.04-.32.07-.66.07-1s-.03-.68-.07-1l2.11-1.65a.5.5 0 00.11-.64l-2-3.46a.5.5 0 00-.61-.22l-2.49 1a7.03 7.03 0 00-1.73-1l-.38-2.65A.5.5 0 0013 2h-4a.5.5 0 00-.5.42L8.12 5.07a7.03 7.03 0 00-1.73 1l-2.49-1a.5.5 0 00-.61.22l-2 3.46a.5.5 0 00.11.64L4.57 11c-.04.32-.07.66-.07 1s.03.68.07 1L2.46 14.65a.5.5 0 00-.11.64l2 3.46c.14.24.43.34.68.22l2.49-1c.52.4 1.08.73 1.73 1l.38 2.65c.07.3.34.53.65.53h4c.31 0 .58-.22.65-.53l.38-2.65c.65-.27 1.21-.6 1.73-1l2.49 1c.25.12.54.02.68-.22l2-3.46a.5.5 0 00-.11-.64L19.43 12.98zM12 15.5A3.5 3.5 0 1112 8.5a3.5 3.5 0 010 7z" />
          </svg>
        )}
      </span>

      {!collapsed && (
        <span className="truncate text-sm font-medium">{label}</span>
      )}
    </NavLink>
  );
}
