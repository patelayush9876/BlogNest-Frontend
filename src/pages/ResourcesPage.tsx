import React from 'react';
import { BookOpen, FileText, LifeBuoy, HelpCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ResourcesPage: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen pt-20 pb-16 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <h1
            className={`text-4xl font-bold mb-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}
          >
            BlogNest <span className="text-indigo-500">Resources</span>
          </h1>
          <p
            className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            Tools, guides, and help materials designed to enhance your writing and publishing
            experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-20">
          <ResourceCard
            isDarkMode={isDarkMode}
            icon={<BookOpen className="w-6 h-6 text-indigo-500 mr-2" />}
            title="Technical Writing Tips"
            description="Improve your writing clarity, structure, and depth with engineering-focused tips."
          />
          <ResourceCard
            isDarkMode={isDarkMode}
            icon={<FileText className="w-6 h-6 text-indigo-500 mr-2" />}
            title="Publishing Guide"
            description="Step-by-step instructions for drafting, optimizing, and publishing your blog."
          />
          <ResourceCard
            isDarkMode={isDarkMode}
            icon={<LifeBuoy className="w-6 h-6 text-indigo-500 mr-2" />}
            title="Help Center"
            description="Find answers to account issues, writing problems, and platform features."
          />
          <ResourceCard
            isDarkMode={isDarkMode}
            icon={<HelpCircle className="w-6 h-6 text-indigo-500 mr-2" />}
            title="FAQ"
            description="Quick answers to commonly asked questions about writing and the platform."
          />
        </div>
      </div>
    </div>
  );
};

const ResourceCard = ({
  isDarkMode,
  icon,
  title,
  description,
}: {
  isDarkMode: boolean;
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div
    className={`p-7 rounded-xl shadow-sm border transition ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}
  >
    <div className="flex items-center mb-3">
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{description}</p>
  </div>
);

export default ResourcesPage;
