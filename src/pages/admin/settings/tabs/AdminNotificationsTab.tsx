import { useState } from "react";
import { useTheme } from "../../../../contexts/ThemeContext";
import Switch from "../../../../components/molecules/Switch";

export const AdminNotificationsTab: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [userReports, setUserReports] = useState(true);
  const [systemUpdates, setSystemUpdates] = useState(true);

  return (
    <div
      className={`p-6 rounded-lg border ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
      }`}
    >
      <h3 className="text-xl font-semibold mb-2">Admin Notifications</h3>
      <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
        Get notified about critical platform events
      </p>

      {[
        {
          title: "Security Alerts",
          desc: "Suspicious activity & login alerts",
          state: securityAlerts,
          toggle: () => setSecurityAlerts(!securityAlerts),
        },
        {
          title: "User Reports",
          desc: "Reported content or users",
          state: userReports,
          toggle: () => setUserReports(!userReports),
        },
        {
          title: "System Updates",
          desc: "Platform updates & migrations",
          state: systemUpdates,
          toggle: () => setSystemUpdates(!systemUpdates),
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
  );
};
