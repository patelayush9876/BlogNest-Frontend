
import { useState } from "react";
import { Users, ShieldAlert } from "lucide-react";
import { useTheme } from "../../../../contexts/ThemeContext";
import Switch from "../../../../components/molecules/Switch";

export const AdminUsersTab: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [autoBan, setAutoBan] = useState(true);
  const [emailVerification, setEmailVerification] = useState(true);
  const [allowAdminsCreate, setAllowAdminsCreate] = useState(false);

  return (
    <div className="space-y-8">

      {/* User Controls */}
      <div
        className={`p-6 rounded-lg shadow-sm border ${
          isDarkMode
            ? "bg-gray-800 border-gray-700 text-gray-200"
            : "bg-white border-gray-100 text-gray-900"
        }`}
      >
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Users className="w-5 h-5" />
          User Management Rules
        </h3>
        <p className={`text-sm mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          Control how users interact with the platform
        </p>

        {[
          {
            title: "Require Email Verification",
            desc: "Users must verify email before posting",
            state: emailVerification,
            toggle: () => setEmailVerification(!emailVerification),
          },
          {
            title: "Auto-ban Reported Users",
            desc: "Automatically ban users after multiple reports",
            state: autoBan,
            toggle: () => setAutoBan(!autoBan),
          },
          {
            title: "Allow Admins to Create Users",
            desc: "Admins can manually create user accounts",
            state: allowAdminsCreate,
            toggle: () => setAllowAdminsCreate(!allowAdminsCreate),
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`flex items-center justify-between py-3 border-b last:border-b-0 ${
              isDarkMode ? "border-gray-700" : "border-gray-100"
            }`}
          >
            <div>
              <p className="text-base font-medium">{item.title}</p>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                {item.desc}
              </p>
            </div>
            <Switch isOn={item.state} handleToggle={item.toggle} />
          </div>
        ))}
      </div>

      {/* Moderation */}
      <div
        className={`p-6 rounded-lg border ${
          isDarkMode
            ? "bg-red-900/10 border-red-700 text-red-300"
            : "bg-red-50 border-red-300 text-red-700"
        }`}
      >
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5" />
          Moderation Controls
        </h3>
        <p className="text-sm mb-4">
          Sensitive actions that affect users globally
        </p>

        <button className="px-5 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition">
          Review Reported Users
        </button>
      </div>
    </div>
  );
};
