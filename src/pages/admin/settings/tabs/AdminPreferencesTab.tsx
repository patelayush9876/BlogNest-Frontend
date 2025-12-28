import { useTheme } from "../../../../contexts/ThemeContext";
import Switch from "../../../../components/molecules/Switch";
import { useState } from "react";

export const AdminPreferencesTab: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowRegistrations, setAllowRegistrations] = useState(true);

  return (
    <div className="space-y-8">
      <div
        className={`p-6 rounded-lg border ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        }`}
      >
        <h3 className="text-xl font-semibold mb-2">Platform Preferences</h3>
        <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
          Control global platform behavior
        </p>

        {[
          {
            title: "Maintenance Mode",
            desc: "Temporarily disable user access",
            state: maintenanceMode,
            toggle: () => setMaintenanceMode(!maintenanceMode),
          },
          {
            title: "Allow New Registrations",
            desc: "Enable or disable new user signups",
            state: allowRegistrations,
            toggle: () => setAllowRegistrations(!allowRegistrations),
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`flex justify-between items-center py-3 border-b last:border-b-0 ${
              isDarkMode ? "border-gray-700" : "border-gray-100"
            }`}
          >
            <div>
              <p className="font-medium">{item.title}</p>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                {item.desc}
              </p>
            </div>
            <Switch isOn={item.state} handleToggle={item.toggle} />
          </div>
        ))}
      </div>

      {/* Theme */}
      <div
        className={`p-6 rounded-lg border ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        }`}
      >
        <h3 className="text-xl font-semibold mb-2">Appearance</h3>
        <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
          Admin panel theme
        </p>

        <button
          onClick={toggleTheme}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
};
