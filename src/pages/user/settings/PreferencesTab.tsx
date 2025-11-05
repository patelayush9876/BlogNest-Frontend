import { useState } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import Switch from "../../../components/molecules/Switch";
import { RefreshCw } from "lucide-react";

export const PreferencesTab: React.FC = () => {
  const [isPrivateProfile, setIsPrivateProfile] = useState(false);
  const [isShowEmail, setIsShowEmail] = useState(false);
  const [isAllowComments, setIsAllowComments] = useState(true);
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="space-y-8">
      {/* Appearance */}
      <div
        className={`p-4 sm:p-6 rounded-lg shadow-sm border transition-colors duration-300 ${
          isDarkMode
            ? "bg-gray-800 border-gray-700 text-gray-200"
            : "bg-white border-gray-100 text-gray-900"
        }`}
      >
        <h3 className="text-lg sm:text-xl font-semibold mb-2">Appearance</h3>
        <p
          className={`text-sm mb-6 ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Customize how BlogSpace looks for you
        </p>

        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-base font-medium">Theme</p>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Choose between light and dark mode
            </p>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            title="Toggle theme"
            className={`transition p-2 rounded-lg ${
              isDarkMode
                ? "text-gray-300 hover:text-white hover:bg-gray-700"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Privacy */}
      <div
        className={`p-4 sm:p-6 rounded-lg shadow-sm border transition-colors duration-300 ${
          isDarkMode
            ? "bg-gray-800 border-gray-700 text-gray-200"
            : "bg-white border-gray-100 text-gray-900"
        }`}
      >
        <h3 className="text-lg sm:text-xl font-semibold mb-2">Privacy</h3>
        <p
          className={`text-sm mb-6 ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Control who can see your content
        </p>

        {[
          {
            title: "Private Profile",
            desc: "Make your profile visible only to followers",
            state: isPrivateProfile,
            toggle: () => setIsPrivateProfile(!isPrivateProfile),
          },
          {
            title: "Show Email",
            desc: "Display email on your public profile",
            state: isShowEmail,
            toggle: () => setIsShowEmail(!isShowEmail),
          },
          {
            title: "Allow Comments",
            desc: "Let others comment on your posts",
            state: isAllowComments,
            toggle: () => setIsAllowComments(!isAllowComments),
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`flex items-center justify-between py-2 border-b last:border-b-0 ${
              isDarkMode ? "border-gray-700" : "border-gray-100"
            }`}
          >
            <div>
              <p className="text-base font-medium">{item.title}</p>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {item.desc}
              </p>
            </div>
            <Switch isOn={item.state} handleToggle={item.toggle} />
          </div>
        ))}
      </div>
    </div>
  );
};