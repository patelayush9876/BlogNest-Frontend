import { useEffect, useState } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import Switch from "../../../components/molecules/Switch";
import {
  getMySettings,
  updateMySettings,
} from "../../../services/userSettings.service";

export const NotificationsTab: React.FC = () => {
  const { isDarkMode } = useTheme();

  const [enableEmail, setEnableEmail] = useState(true);
  const [newComments, setNewComments] = useState(true);
  const [newFollowers, setNewFollowers] = useState(true);
  const [enablePush, setEnablePush] = useState(true);

  /* =======================
     Fetch settings on mount
  ======================= */
  useEffect(() => {
    (async () => {
      try {
        const res = await getMySettings();
        const s = res.data;

        setEnableEmail(s.notifications.email.enabled);
        setNewComments(s.notifications.email.newComments);
        setNewFollowers(s.notifications.email.newFollowers);
        setEnablePush(s.notifications.push.enabled);
      } catch (err) {
        console.error("Failed to load notification settings", err);
      }
    })();
  }, []);

  /* =======================
     Optimistic toggle helper
  ======================= */
  const toggle = async (
    setter: (v: boolean) => void,
    current: boolean,
    payload: Record<string, boolean>,
  ) => {
    setter(!current);
    try {
      await updateMySettings(payload);
    } catch (err) {
      setter(current); // rollback
      console.error("Failed to update setting", err);
    }
  };

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
              toggle: () =>
                toggle(setEnableEmail, enableEmail, {
                  "notifications.email.enabled": !enableEmail,
                }),
            },
            {
              title: "New Comments",
              desc: "When someone comments on your posts",
              state: newComments,
              toggle: () =>
                toggle(setNewComments, newComments, {
                  "notifications.email.newComments": !newComments,
                }),
            },
            {
              title: "New Followers",
              desc: "When someone follows you",
              state: newFollowers,
              toggle: () =>
                toggle(setNewFollowers, newFollowers, {
                  "notifications.email.newFollowers": !newFollowers,
                }),
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
              toggle: () =>
                toggle(setEnablePush, enablePush, {
                  "notifications.push.enabled": !enablePush,
                }),
            },
          ],
        },
      ].map((section, idx) => (
        <div
          key={idx}
          className={`p-4 sm:p-6 rounded-lg shadow-sm border ${
            isDarkMode
              ? "bg-gray-800 border-gray-700 text-gray-200"
              : "bg-white border-gray-100 text-gray-900"
          }`}
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            {section.title}
          </h3>
          <p className="text-sm mb-6 opacity-70">{section.desc}</p>

          {section.items.map((item, i) => (
            <div
              key={i}
              className={`flex items-center justify-between py-2 border-b last:border-b-0 ${
                isDarkMode ? "border-gray-700" : "border-gray-100"
              }`}
            >
              <div>
                <p className="text-base font-medium">{item.title}</p>
                <p className="text-sm opacity-70">{item.desc}</p>
              </div>
              <Switch isOn={item.state} handleToggle={item.toggle} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
