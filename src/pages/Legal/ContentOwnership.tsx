import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Crown, PenTool, FileBadge, Stamp, ShieldAlert, Mail } from 'lucide-react';

const ContentOwnership: React.FC = () => {
  const { isDarkMode } = useTheme();

  const sections = [
    {
      title: 'Your Content, Your Rights',
      icon: <Crown className="w-6 h-6 text-indigo-500" />,
      content: (
        <ul className="list-disc ml-5 space-y-2 text-sm">
          <li>You fully retain ownership of all content you publish.</li>
          <li>You may edit, delete, or republish your work anywhere.</li>
          <li>BlogNest does not claim ownership of your articles, comments, or media.</li>
        </ul>
      ),
    },
    {
      title: 'License You Grant Us',
      icon: <PenTool className="w-6 h-6 text-indigo-500" />,
      content: (
        <>
          <p className="text-sm mb-2">
            By publishing content on BlogNest, you grant a non-exclusive license allowing the
            platform to:
          </p>
          <ul className="list-disc ml-5 space-y-2 text-sm">
            <li>Publicly display your content on the platform.</li>
            <li>Promote content in listings, tags, search, and feeds.</li>
            <li>Use content for platform marketing with proper attribution.</li>
          </ul>
        </>
      ),
    },
    {
      title: 'Plagiarism & Violations',
      icon: <ShieldAlert className="w-6 h-6 text-indigo-500" />,
      content: (
        <p className="text-sm">
          Publishing plagiarized or copyright-infringing material may lead to removal or account
          suspension. Undisclosed AI-generated work may also be flagged for review.
        </p>
      ),
    },
    {
      title: 'Copyright Claims',
      icon: <Mail className="w-6 h-6 text-indigo-500" />,
      content: (
        <p className="text-sm">
          If your work has been copied without permission, you may file a DMCA claim via the Report
          Issue page. We will review and take appropriate action.
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
            Content <span className="text-indigo-500">Ownership</span> Policy
          </h1>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            BlogNest protects creators and ensures fair intellectual property rights. Here's how
            ownership works on the platform.
          </p>
        </div>

        {/* Overview Card */}
        <div
          className={`p-8 rounded-xl shadow-sm border mb-10 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
            <FileBadge className="w-7 h-7 text-indigo-500" />
            Overview
          </h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            Creators own their work. BlogNest provides visibility and promotion while respecting
            intellectual property.
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid md:grid-cols-2 gap-10 mb-14">
          {sections.map((sec, index) => (
            <OwnershipCard key={index} isDarkMode={isDarkMode} icon={sec.icon} title={sec.title}>
              {sec.content}
            </OwnershipCard>
          ))}
        </div>

        {/* Footer */}
        <div
          className={`p-6 rounded-xl shadow-sm border text-center ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            BlogNest exists to empower writers. Your ideas remain yours — always.
          </p>
          <p className={`text-xs mt-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Last updated: January 2025
          </p>
        </div>
      </div>
    </div>
  );
};

const OwnershipCard = ({
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
    <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm leading-relaxed`}>
      {children}
    </div>
  </div>
);

export default ContentOwnership;
