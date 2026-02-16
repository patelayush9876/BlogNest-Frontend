import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const RightSidebar: React.FC = () => {
  const { isDarkMode } = useTheme();

  const recommendedReading = [
    { title: '10 Tips for Better Code Reviews', author: 'Sarah Chen' },
    { title: 'The Future of Web Development', author: 'Mike Rodriguez' },
    { title: 'Mastering CSS Animations', author: 'Lisa Park' },
  ];

  return (
    <div
      className={`p-5 border rounded-xl ${
        isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      }`}
    >
      <h3
        className={`mb-4 text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}
      >
        Recommended Reading
      </h3>

      <div className="space-y-4">
        {recommendedReading.map((item) => (
          <div key={item.title}>
            <p
              className={`font-medium cursor-pointer transition ${
                isDarkMode
                  ? 'text-gray-200 hover:text-indigo-400'
                  : 'text-gray-800 hover:text-indigo-600'
              }`}
            >
              {item.title}
            </p>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {item.author}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;
