import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import {
  UserCircle,
  PenSquare,
  BookOpen,
  AlertTriangle,
  ShieldCheck,
  LifeBuoy,
} from 'lucide-react';

const Help: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen pt-20 pb-16 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-14">
          <h1
            className={`text-4xl font-bold mb-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}
          >
            Help <span className="text-indigo-500">Center</span>
          </h1>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Find quick answers, troubleshoot common issues, and learn how to get the most out of{' '}
            <strong>BlogNest</strong>.
          </p>
        </div>

        {/* Overview Card */}
        <div
          className={`p-8 rounded-xl shadow-sm border mb-10 transition ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            The Help Center covers everything from account management to writing, publishing, and
            troubleshooting. Browse the sections below to find what you need.
          </p>
        </div>

        {/* Help Sections Grid */}
        <div className="grid md:grid-cols-2 gap-10 mb-14">
          <HelpCard
            isDarkMode={isDarkMode}
            icon={<UserCircle className="w-6 h-6 text-indigo-500" />}
            title="Account & Profile"
          >
            <ul className="list-disc ml-5 space-y-2">
              <li>How to create or delete your account</li>
              <li>Updating profile information</li>
              <li>Resetting your password</li>
              <li>Managing notification settings</li>
            </ul>
          </HelpCard>

          <HelpCard
            isDarkMode={isDarkMode}
            icon={<PenSquare className="w-6 h-6 text-indigo-500" />}
            title="Writing & Publishing"
          >
            <ul className="list-disc ml-5 space-y-2">
              <li>Using the article editor</li>
              <li>Saving drafts and publishing articles</li>
              <li>Adding images and media</li>
              <li>Fixing formatting and preview issues</li>
            </ul>
          </HelpCard>

          <HelpCard
            isDarkMode={isDarkMode}
            icon={<BookOpen className="w-6 h-6 text-indigo-500" />}
            title="Reading & Interacting"
          >
            <ul className="list-disc ml-5 space-y-2">
              <li>Liking and saving posts</li>
              <li>Commenting guidelines</li>
              <li>Following writers and tags</li>
            </ul>
          </HelpCard>

          <HelpCard
            isDarkMode={isDarkMode}
            icon={<AlertTriangle className="w-6 h-6 text-indigo-500" />}
            title="Troubleshooting"
          >
            <ul className="list-disc ml-5 space-y-2">
              <li>Editor not loading</li>
              <li>Images not uploading</li>
              <li>Navigation or login errors</li>
              <li>Dark mode not working</li>
            </ul>
          </HelpCard>

          <HelpCard
            isDarkMode={isDarkMode}
            icon={<ShieldCheck className="w-6 h-6 text-indigo-500" />}
            title="Policies & Safety"
          >
            <ul className="list-disc ml-5 space-y-2">
              <li>Community Standards</li>
              <li>Reporting inappropriate content</li>
              <li>Copyright violation concerns</li>
            </ul>
          </HelpCard>
        </div>

        {/* Footer / Contact Card */}
        <div
          className={`p-6 rounded-xl shadow-sm border flex flex-col items-center text-center gap-3 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <LifeBuoy className="w-7 h-7 text-indigo-500" />
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Still need help? Visit the <strong>Report Issue</strong> page or contact our support
            team. We’re here to help you resolve problems quickly.
          </p>
        </div>
      </div>
    </div>
  );
};

const HelpCard = ({
  isDarkMode,
  icon,
  title,
  children,
}: {
  isDarkMode: boolean;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div
    className={`p-7 rounded-xl shadow-sm border transition ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}
  >
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <div className={isDarkMode ? 'text-gray-300 text-sm' : 'text-gray-700 text-sm'}>{children}</div>
  </div>
);

export default Help;
