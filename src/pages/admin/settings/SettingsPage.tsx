import React, { useState } from 'react';
import { Shield, Users, Settings, Bell, Database } from 'lucide-react';

import { useTheme } from '../../../contexts/ThemeContext';
import { AdminPreferencesTab } from './tabs/AdminPreferencesTab';
import { AdminNotificationsTab } from './tabs/AdminNotificationsTab';
import { AdminSystemTab } from './tabs/AdminSystemTab';
import { AdminAccountTab } from './tabs/AdminAccountTab';
import { AdminUsersTab } from './tabs/AdminUsersTab';

const AdminSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Account');
  const { isDarkMode } = useTheme();

  const tabs = [
    { name: 'Account', icon: Shield },
    { name: 'Preferences', icon: Settings },
    { name: 'Notifications', icon: Bell },
    { name: 'User Controls', icon: Users },
    { name: 'System', icon: Database },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Account':
        return <AdminAccountTab />;
      case 'Preferences':
        return <AdminPreferencesTab />;
      case 'Notifications':
        return <AdminNotificationsTab />;
      case 'User Controls':
        return <AdminUsersTab />;
      case 'System':
        return <AdminSystemTab />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="container mx-auto px-4 max-w-5xl pt-8 pb-16">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Admin Settings</h1>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
            Manage platform, security and administrative preferences
          </p>
        </div>

        {/* Tabs */}
        <div
          className={`flex overflow-x-auto rounded-xl border mb-8 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
          }`}
        >
          <div className="flex gap-2 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition ${
                  activeTab === tab.name
                    ? isDarkMode
                      ? 'bg-gray-700 text-gray-200'
                      : 'bg-gray-100 text-gray-900'
                    : isDarkMode
                      ? 'text-gray-400 hover:text-gray-200'
                      : 'text-gray-500 hover:text-gray-900'
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

export default AdminSettingsPage;
