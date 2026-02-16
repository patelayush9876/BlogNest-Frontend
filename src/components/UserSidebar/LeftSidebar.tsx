import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const LeftSidebar: React.FC = () => {
  const { isDarkMode } = useTheme();

  const trendingTopics = [
    'React',
    'JavaScript',
    'TypeScript',
    'CSS',
    'Web Development',
    'Design',
    'Programming',
    'Tutorial',
  ];

  const categories = [
    'Web Development',
    'JavaScript',
    'React',
    'TypeScript',
    'Design',
    'UX/UI',
    'Backend',
    'DevOps',
    'Career',
    'Tutorial',
  ];

  const TopicTag: React.FC<{ children: string }> = ({ children }) => (
    <span
      className={`inline-block px-3 py-1 mr-2 mt-2 text-xs font-medium rounded-full cursor-pointer transition
        ${
          isDarkMode
            ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
    >
      {children}
    </span>
  );

  return (
    <div className="space-y-8">
      {/* Trending */}
      <div
        className={`p-5 border rounded-xl ${
          isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <div
          className={`flex items-center mb-3 text-sm font-semibold ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}
        >
          <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
          Trending Topics
        </div>

        <div className="flex flex-wrap">
          {trendingTopics.map((topic) => (
            <TopicTag key={topic}>{topic}</TopicTag>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div
        className={`p-5 border rounded-xl ${
          isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <h3
          className={`mb-3 text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}
        >
          Categories
        </h3>

        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category}
              className={`text-sm cursor-pointer transition ${
                isDarkMode
                  ? 'text-gray-300 hover:text-indigo-400'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
