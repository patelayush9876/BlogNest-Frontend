import { useTheme } from "../../../../contexts/ThemeContext";

export const AdminSystemTab: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`p-6 rounded-lg border ${
        isDarkMode
          ? "bg-red-900/10 border-red-700 text-red-300"
          : "bg-red-50 border-red-300 text-red-700"
      }`}
    >
      <h3 className="text-xl font-semibold mb-2">System Controls</h3>
      <p className="text-sm mb-4">
        Dangerous operations that affect the entire platform
      </p>

      <button className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
        Clear Cache & Rebuild Index
      </button>
    </div>
  );
};
