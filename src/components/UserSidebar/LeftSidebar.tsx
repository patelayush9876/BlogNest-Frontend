import React, { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { getTrendingTopics } from '../../services/blog.service';
import { getAllCategories } from '../../services/blogCategory.service';

interface Category {
  _id: string;
  name: string;
}

const LeftSidebar: React.FC = () => {
  const { isDarkMode } = useTheme();

  const [trendingTopics, setTrendingTopics] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [trendingCategoryIds, setTrendingCategoryIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch trending tags
        const tags = await getTrendingTopics('tag', 8);
        setTrendingTopics(tags.map((t) => t._id));

        // Fetch trending categories
        const trendingCats = await getTrendingTopics('category', 10);
        setTrendingCategoryIds(trendingCats.map((c) => c._id));

        // Fetch all categories
        const allCategories = await getAllCategories();
        setCategories(allCategories);
      } catch (error) {
        console.error('Failed to fetch sidebar data', error);
      }
    };

    fetchData();
  }, []);

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
      {/* Trending Topics */}
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
          {categories.map((category) => {
            const isTrending = trendingCategoryIds.includes(category._id);

            return (
              <li
                key={category._id}
                className={`text-sm cursor-pointer transition flex items-center justify-left gap-3 ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-indigo-400'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                <span>{category.name}</span>

                {isTrending && <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
