import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const SidebarSkeleton: React.FC = () => {
  const { isDarkMode } = useTheme();
  const bg = isDarkMode ? 'bg-gray-700/40' : 'bg-gray-200/60';

  return (
    <div className="space-y-8 sticky top-4 animate-pulse">
      {/* Box 1 */}
      <div
        className={`p-5 border rounded-xl ${
          isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <div className={`h-5 w-32 rounded mb-4 ${bg}`} />

        <div className="flex flex-wrap gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`h-6 w-20 rounded-full ${bg}`} />
          ))}
        </div>
      </div>

      {/* Box 2 */}
      <div
        className={`p-5 border rounded-xl ${
          isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <div className={`h-5 w-28 rounded mb-4 ${bg}`} />

        <div className="space-y-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`h-4 w-24 rounded ${bg}`} />
          ))}
        </div>
      </div>

      {/* Box 3 */}
      <div
        className={`p-5 border rounded-xl ${
          isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <div className={`h-5 w-40 rounded mb-4 ${bg}`} />

        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i}>
              <div className={`h-4 w-48 rounded mb-2 ${bg}`} />
              <div className={`h-3 w-20 rounded ${bg}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarSkeleton;
