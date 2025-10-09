// Sidebar.tsx

import React from 'react';
import { TrendingUp } from 'lucide-react';

const Sidebar: React.FC = () => {
  const trendingTopics = [
    'React', 'JavaScript', 'TypeScript', 'CSS', 'Web Development', 
    'Design', 'Programming', 'Tutorial'
  ];
  const categories = [
    'Web Development', 'JavaScript', 'React', 'TypeScript', 'Design', 
    'UX/UI', 'Backend', 'DevOps', 'Career', 'Tutorial'
  ];
  const recommendedReading = [
    { title: '10 Tips for Better Code Reviews', author: 'Sarah Chen' },
    { title: 'The Future of Web Development', author: 'Mike Rodriguez' },
    { title: 'Mastering CSS Animations', author: 'Lisa Park' },
  ];

  const TopicTag: React.FC<{ children: string }> = ({ children }) => (
    <span className="inline-block px-3 py-1 mr-2 mt-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition duration-150 cursor-pointer">
      {children}
    </span>
  );

  return (
    <div className="space-y-8 sticky top-4">
      
      {/* Trending Topics Section */}
      <div className="p-5 bg-white border border-gray-200 rounded-xl">
        <div className="flex items-center mb-3 text-sm font-semibold text-gray-900">
          <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
          Trending Topics
        </div>
        <div className="flex flex-wrap">
          {trendingTopics.map((topic, i) => (
            <TopicTag key={i}>{topic}</TopicTag>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="p-5 bg-white border border-gray-200 rounded-xl">
        <h3 className="mb-3 text-lg font-semibold text-gray-900">Categories</h3>
        <ul className="space-y-2 text-gray-600">
          {categories.map((category, i) => (
            <li key={i} className="text-sm hover:text-indigo-600 cursor-pointer">
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Recommended Reading Section */}
      <div className="p-5 bg-white border border-gray-200 rounded-xl">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Recommended Reading</h3>
        <div className="space-y-4">
          {recommendedReading.map((item, i) => (
            <div key={i}>
              <p className="font-medium text-gray-800 hover:text-indigo-600 cursor-pointer">{item.title}</p>
              <p className="text-sm text-gray-500">
                {item.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;