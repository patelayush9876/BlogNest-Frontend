import React, { useState } from "react";
import { User, Settings, Bell, RefreshCw } from "lucide-react";
import Switch from "../../components/molecules/Switch";

// --- Preferences Tab ---
const PreferencesTab: React.FC = () => {
  const [isPrivateProfile, setIsPrivateProfile] = useState(false);
  const [isShowEmail, setIsShowEmail] = useState(false);
  const [isAllowComments, setIsAllowComments] = useState(true);

  return (
    <div className="space-y-8">
      {/* Appearance */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
          Appearance
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Customize how BlogSpace looks for you
        </p>

        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-base font-medium text-gray-800">Theme</p>
            <p className="text-sm text-gray-500">
              Choose between light and dark mode
            </p>
          </div>
          <button
            type="button"
            title="Toggle theme"
            className="text-gray-500 hover:text-gray-900 transition p-2 rounded-lg hover:bg-gray-100"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Privacy */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
          Privacy
        </h3>
        <p className="text-sm text-gray-500 mb-6">
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
            className="flex items-center justify-between py-2 border-b last:border-b-0 border-gray-100"
          >
            <div>
              <p className="text-base font-medium text-gray-800">
                {item.title}
              </p>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
            <Switch isOn={item.state} handleToggle={item.toggle} />
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Account Tab ---
const AccountTab: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Profile Info */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
          Profile Information
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Update your account details
        </p>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              defaultValue="sarahjohnson"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 mt-1 bg-gray-50"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              defaultValue="sarah@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 mt-1 bg-gray-50"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2 text-sm font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition"
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* Change Password */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
          Change Password
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Ensure your account uses a strong password
        </p>

        <form className="space-y-4">
          {["Current Password", "New Password", "Confirm New Password"].map(
            (label, i) => (
              <div key={i}>
                <label
                  htmlFor={label.toLowerCase().replace(/ /g, "-")}
                  className="block text-sm font-medium text-gray-700"
                >
                  {label}
                </label>
                <input
                  type="password"
                  id={label.toLowerCase().replace(/ /g, "-")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 mt-1 bg-gray-50"
                />
              </div>
            )
          )}
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2 text-sm font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="p-4 sm:p-6 rounded-lg border-2 border-red-300 bg-red-50">
        <h3 className="text-lg sm:text-xl font-semibold text-red-700 mb-2">
          Danger Zone
        </h3>
        <p className="text-sm text-red-500 mb-4">Irreversible actions</p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-base font-medium text-red-800">Delete Account</p>
            <p className="text-sm text-red-500">
              Permanently delete your account and all data
            </p>
          </div>
          <button
            type="button"
            title="Delete Account"
            className="px-5 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Notifications Tab ---
const NotificationsTab: React.FC = () => {
  const [enableEmail, setEnableEmail] = useState(true);
  const [newComments, setNewComments] = useState(true);
  const [newFollowers, setNewFollowers] = useState(true);
  const [enablePush, setEnablePush] = useState(true);

  return (
    <div className="space-y-8">
      {/* Email */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
          Email Notifications
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Manage when you receive email updates
        </p>

        {[
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
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-2 border-b last:border-b-0 border-gray-100"
          >
            <div>
              <p className="text-base font-medium text-gray-800">
                {item.title}
              </p>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
            <Switch isOn={item.state} handleToggle={item.toggle} />
          </div>
        ))}
      </div>

      {/* Push */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
          Push Notifications
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Manage push notifications on this device
        </p>

        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-base font-medium text-gray-800">
              Enable Push Notifications
            </p>
            <p className="text-sm text-gray-500">
              Receive notifications on this device
            </p>
          </div>
          <Switch
            isOn={enablePush}
            handleToggle={() => setEnablePush(!enablePush)}
          />
        </div>
      </div>
    </div>
  );
};

// --- Main Settings Page ---
const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Account");

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
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="mb-6 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Settings
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto no-scrollbar px-1 bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-nowrap gap-2 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                type="button"
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center flex-shrink-0 px-4 py-2 text-sm sm:text-base font-medium rounded-lg transition 
          ${
            activeTab === tab.name
              ? "bg-gray-100 text-gray-900 shadow-inner"
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
