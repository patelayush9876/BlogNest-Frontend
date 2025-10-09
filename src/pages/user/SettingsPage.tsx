// SettingsPage.tsx

import React, { useState } from 'react';
import { User, Settings, Bell, RefreshCw } from 'lucide-react';
import Switch from '../../components/molecules/Switch';


// --- 1. Content for the Preferences Tab ---
const PreferencesTab: React.FC = () => {
  const [isPrivateProfile, setIsPrivateProfile] = useState(false);
  const [isShowEmail, setIsShowEmail] = useState(false);
  const [isAllowComments, setIsAllowComments] = useState(true);

  return (
    <div className="space-y-8">
      {/* Appearance Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Appearance</h3>
        <p className="text-sm text-gray-500 mb-6">Customize how BlogSpace looks for you</p>

        {/* Theme Setting */}
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-base font-medium text-gray-800">Theme</p>
            <p className="text-sm text-gray-500">Choose between light and dark mode</p>
          </div>
          <button className="text-gray-500 hover:text-gray-900 transition duration-150 p-2">
            <RefreshCw className="w-5 h-5" /> {/* Icon to toggle theme */}
          </button>
        </div>
      </div>

      {/* Privacy Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Privacy</h3>
        <p className="text-sm text-gray-500 mb-6">Control who can see your content</p>

        {/* Private Profile Toggle */}
        <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
          <div>
            <p className="text-base font-medium text-gray-800">Private Profile</p>
            <p className="text-sm text-gray-500">Make your profile visible only to followers</p>
          </div>
          <Switch isOn={isPrivateProfile} handleToggle={() => setIsPrivateProfile(!isPrivateProfile)} />
        </div>

        {/* Show Email Toggle */}
        <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
          <div>
            <p className="text-base font-medium text-gray-800">Show Email</p>
            <p className="text-sm text-gray-500">Display email on your public profile</p>
          </div>
          <Switch isOn={isShowEmail} handleToggle={() => setIsShowEmail(!isShowEmail)} />
        </div>

        {/* Allow Comments Toggle */}
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-base font-medium text-gray-800">Allow Comments</p>
            <p className="text-sm text-gray-500">Let others comment on your posts</p>
          </div>
          <Switch isOn={isAllowComments} handleToggle={() => setIsAllowComments(!isAllowComments)} />
        </div>
      </div>
    </div>
  );
};


// --- 2. Content for the Account Tab ---
const AccountTab: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Profile Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Profile Information</h3>
        <p className="text-sm text-gray-500 mb-6">Update your account details</p>

        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              defaultValue="sarahjohnson"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 mt-1 bg-gray-50"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              defaultValue="sarah@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 mt-1 bg-gray-50"
            />
          </div>
          <button type="submit" className="px-5 py-2 mt-4 text-sm font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition duration-150">
            Save Changes
          </button>
        </form>
      </div>

      {/* Change Password */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Change Password</h3>
        <p className="text-sm text-gray-500 mb-6">Ensure your account is using a strong password</p>

        <form className="space-y-4">
          <div>
            <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">Current Password</label>
            <input type="password" id="current-password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 mt-1 bg-gray-50" />
          </div>
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">New Password</label>
            <input type="password" id="new-password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 mt-1 bg-gray-50" />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input type="password" id="confirm-password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 mt-1 bg-gray-50" />
          </div>
          <button type="submit" className="px-5 py-2 mt-4 text-sm font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition duration-150">
            Update Password
          </button>
        </form>
      </div>
      
      {/* Danger Zone */}
      <div className="p-6 rounded-lg border-2 border-red-300 bg-red-50">
        <h3 className="text-xl font-semibold text-red-700 mb-2">Danger Zone</h3>
        <p className="text-sm text-red-500 mb-4">Irreversible actions</p>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-medium text-red-800">Delete Account</p>
            <p className="text-sm text-red-500">Permanently delete your account and all data</p>
          </div>
          <button className="px-5 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-150">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};


// --- 3. Content for the Notifications Tab ---
const NotificationsTab: React.FC = () => {
  const [enableEmail, setEnableEmail] = useState(true);
  const [newComments, setNewComments] = useState(true);
  const [newFollowers, setNewFollowers] = useState(true);
  const [enablePush, setEnablePush] = useState(true);

  return (
    <div className="space-y-8">
      {/* Email Notifications */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Notifications</h3>
        <p className="text-sm text-gray-500 mb-6">Manage when you receive email notifications</p>

        {/* Enable Email Toggle */}
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <div>
            <p className="text-base font-medium text-gray-800">Enable Email Notifications</p>
            <p className="text-sm text-gray-500">Receive updates via email</p>
          </div>
          <Switch isOn={enableEmail} handleToggle={() => setEnableEmail(!enableEmail)} />
        </div>

        {/* New Comments Toggle */}
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <div>
            <p className="text-base font-medium text-gray-800">New Comments</p>
            <p className="text-sm text-gray-500">When someone comments on your posts</p>
          </div>
          <Switch isOn={newComments} handleToggle={() => setNewComments(!newComments)} />
        </div>

        {/* New Followers Toggle */}
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-base font-medium text-gray-800">New Followers</p>
            <p className="text-sm text-gray-500">When someone follows you</p>
          </div>
          <Switch isOn={newFollowers} handleToggle={() => setNewFollowers(!newFollowers)} />
        </div>
      </div>

      {/* Push Notifications */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Push Notifications</h3>
        <p className="text-sm text-gray-500 mb-6">Manage push notifications on this device</p>

        {/* Enable Push Toggle */}
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-base font-medium text-gray-800">Enable Push Notifications</p>
            <p className="text-sm text-gray-500">Receive notifications on this device</p>
          </div>
          <Switch isOn={enablePush} handleToggle={() => setEnablePush(!enablePush)} />
        </div>
      </div>
    </div>
  );
};


// --- 4. Main Settings Page Component ---
const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Account'); // Default to 'Account'

  // A helper to render the correct content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Account':
        return <AccountTab />;
      case 'Preferences':
        return <PreferencesTab />;
      case 'Notifications':
        return <NotificationsTab />;
      default:
        return null;
    }
  };

  const tabs = [
    { name: 'Account', icon: User, content: AccountTab },
    { name: 'Preferences', icon: Settings, content: PreferencesTab },
    { name: 'Notifications', icon: Bell, content: NotificationsTab },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500">Manage your account settings and preferences</p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex items-center p-1 space-x-2 bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center px-4 py-2 text-base font-medium rounded-lg transition duration-150 
                ${activeTab === tab.name 
                  ? 'bg-gray-100 text-gray-900 shadow-inner' 
                  : 'text-gray-500 hover:text-gray-900'
                }`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        {renderTabContent()}
        
      </div>
    </div>
  );
};

export default SettingsPage;