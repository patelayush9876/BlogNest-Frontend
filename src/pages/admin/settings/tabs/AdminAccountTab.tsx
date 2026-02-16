import { useState } from 'react';
import { Shield, Mail, Key } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

export const AdminAccountTab: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState('admin@blogspace.com');

  return (
    <div className="space-y-8">
      {/* Admin Identity */}
      <div
        className={`p-6 rounded-lg shadow-sm border ${
          isDarkMode
            ? 'bg-gray-800 border-gray-700 text-gray-200'
            : 'bg-white border-gray-100 text-gray-900'
        }`}
      >
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Admin Account
        </h3>
        <p className={`text-sm mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Manage your administrator credentials and security
        </p>

        <div className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                aria-label="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-200'
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <input
              aria-label="role"
              type="text"
              value="Super Admin"
              disabled
              className={`w-full px-4 py-2 rounded-lg border opacity-70 cursor-not-allowed ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-300'
                  : 'bg-gray-100 border-gray-300 text-gray-700'
              }`}
            />
          </div>

          <button className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition">
            Save Changes
          </button>
        </div>
      </div>

      {/* Security */}
      <div
        className={`p-6 rounded-lg shadow-sm border ${
          isDarkMode
            ? 'bg-gray-800 border-gray-700 text-gray-200'
            : 'bg-white border-gray-100 text-gray-900'
        }`}
      >
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Key className="w-5 h-5" />
          Security
        </h3>
        <p className={`text-sm mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Change admin password and access security
        </p>

        <div className="space-y-4">
          {['Current Password', 'New Password', 'Confirm New Password'].map((label, i) => (
            <div key={i}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                aria-label="password"
                type="password"
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-200'
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}
              />
            </div>
          ))}

          <button className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};
