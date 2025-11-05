import { useState } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import Switch from "../../../components/molecules/Switch";

export const NotificationsTab: React.FC = () => {
  const [enableEmail, setEnableEmail] = useState(true);
  const [newComments, setNewComments] = useState(true);
  const [newFollowers, setNewFollowers] = useState(true);
  const [enablePush, setEnablePush] = useState(true);
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-8">
      {[
        {
          title: "Email Notifications",
          desc: "Manage when you receive email updates",
          items: [
            {
              title: "Enable Email Notifications",
              desc: "Receive updates via email",
              state: enableEmail,
              toggle: () => setEnableEmail(!enableEmail),
            },
            {
              title: "New Comments",
              desc: "When someone comments on your posts",
              state: newComments,
              toggle: () => setNewComments(!newComments),
            },
            {
              title: "New Followers",
              desc: "When someone follows you",
              state: newFollowers,
              toggle: () => setNewFollowers(!newFollowers),
            },
          ],
        },
        {
          title: "Push Notifications",
          desc: "Manage push notifications on this device",
          items: [
            {
              title: "Enable Push Notifications",
              desc: "Receive notifications on this device",
              state: enablePush,
              toggle: () => setEnablePush(!enablePush),
            },
          ],
        },
      ].map((section, idx) => (
        <div
          key={idx}
          className={`p-4 sm:p-6 rounded-lg shadow-sm border transition-colors duration-300 ${
            isDarkMode
              ? "bg-gray-800 border-gray-700 text-gray-200"
              : "bg-white border-gray-100 text-gray-900"
          }`}
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            {section.title}
          </h3>
          <p
            className={`text-sm mb-6 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {section.desc}
          </p>

          {section.items.map((item, i) => (
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
      ))}
    </div>
  );
};