import React, { useState } from "react";
import { User, Settings, Bell } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";
import { AccountTab } from "./AccountTab";
import { PreferencesTab } from "./PreferencesTab";
import { NotificationsTab } from "./NotificationTab";

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Account");
  const { isDarkMode } = useTheme();

  const tabs = [
    { name: "Account", icon: User },
    { name: "Preferences", icon: Settings },
    { name: "Notifications", icon: Bell },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Account":
        return <AccountTab />;
      case "Preferences":
        return <PreferencesTab />;
      case "Notifications":
        return <NotificationsTab />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl pt-8 pb-16">
        {/* Header */}
        <div className="mb-6 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
          <p
            className={`text-sm sm:text-base ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Manage your account settings and preferences
          </p>
        </div>

        {/* Tabs */}
        <div
          className={`flex overflow-x-auto no-scrollbar px-1 rounded-xl shadow-sm border mb-8 transition-colors ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-100"
          }`}
        >
          <div className="flex flex-nowrap gap-2 min-w-max p-2">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                type="button"
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center flex-shrink-0 px-4 py-2 text-sm sm:text-base font-medium rounded-lg transition 
              ${
                activeTab === tab.name
                  ? isDarkMode
                    ? "bg-gray-700 text-gray-200"
                    : "bg-gray-100 text-gray-900 shadow-inner"
                  : isDarkMode
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default SettingsPage;
