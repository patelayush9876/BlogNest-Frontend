import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import {
  Cookie,
  BookText,
  Settings2,
  ShieldCheck,
  BarChart3,
  SlidersHorizontal,
} from 'lucide-react';

const CookiePolicy: React.FC = () => {
  const { isDarkMode } = useTheme();

  const sections = [
    {
      title: 'What Are Cookies?',
      icon: <Cookie className="w-6 h-6 text-indigo-500" />,
      content: (
        <p className="text-sm">
          Cookies are small text files stored on your device. They help websites remember
          preferences, improve loading speed, and personalize experience.
        </p>
      ),
    },
    {
      title: 'Types of Cookies We Use',
      icon: <BookText className="w-6 h-6 text-indigo-500" />,
      content: (
        <ul className="list-disc ml-5 space-y-2 text-sm">
          <li>
            <strong>Essential Cookies</strong> – enable login, navigation, and security.
          </li>
          <li>
            <strong>Performance Cookies</strong> – track loading speed and feature usage.
          </li>
          <li>
            <strong>Analytics Cookies</strong> – help us understand user activity.
          </li>
          <li>
            <strong>Preference Cookies</strong> – remember theme and UI settings.
          </li>
        </ul>
      ),
    },
    {
      title: 'Managing Cookies',
      icon: <Settings2 className="w-6 h-6 text-indigo-500" />,
      content: (
        <p className="text-sm">
          You can disable cookies from your browser settings. However, some features of BlogNest may
          not function fully without them.
        </p>
      ),
    },
    {
      title: 'Third-Party Cookies',
      icon: <BarChart3 className="w-6 h-6 text-indigo-500" />,
      content: (
        <p className="text-sm">
          We may use third-party analytics or service tools that store cookies to enhance
          performance and platform insights.
        </p>
      ),
    },
  ];

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
            Cookie <span className="text-indigo-500">Policy</span>
          </h1>
          <p
            className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            Learn how BlogNest uses cookies to improve functionality, personalize experience, and
            analyze platform usage.
          </p>
        </div>

        {/* Overview */}
        <div
          className={`p-8 rounded-xl shadow-sm border mb-10 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <SlidersHorizontal className="w-7 h-7 text-indigo-500" />
            Overview
          </h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            Cookies allow BlogNest to remember preferences, improve navigation, and provide a better
            reading and writing experience for users.
          </p>
        </div>

        {/* Policy Points */}
        <div className="grid md:grid-cols-2 gap-10 mb-14">
          {sections.map((sec, index) => (
            <CookieCard key={index} title={sec.title} icon={sec.icon} isDarkMode={isDarkMode}>
              {sec.content}
            </CookieCard>
          ))}
        </div>

        {/* Footer Notice */}
        <div
          className={`p-6 rounded-xl shadow-sm border text-center ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
            You can modify cookie settings anytime through your browser. Continued use of BlogNest
            implies consent to our cookie usage.
          </p>
          <p className={`text-xs mt-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Last updated: January 2025
          </p>
        </div>
      </div>
    </div>
  );
};

const CookieCard = ({
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
    <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>{children}</div>
  </div>
);

export default CookiePolicy;
