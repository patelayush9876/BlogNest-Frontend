import React from "react";
import { TrendingUp } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Sidebar: React.FC = () => {
  const { isDarkMode } = useTheme();

  const trendingTopics = [
    "React", "JavaScript", "TypeScript", "CSS", "Web Development",
    "Design", "Programming", "Tutorial"
  ];

  const categories = [
    "Web Development", "JavaScript", "React", "TypeScript", "Design",
    "UX/UI", "Backend", "DevOps", "Career", "Tutorial"
  ];

  const recommendedReading = [
    { title: "10 Tips for Better Code Reviews", author: "Sarah Chen" },
    { title: "The Future of Web Development", author: "Mike Rodriguez" },
    { title: "Mastering CSS Animations", author: "Lisa Park" },
  ];

  const TopicTag: React.FC<{ children: string }> = ({ children }) => (
    <span
      className={`inline-block px-3 py-1 mr-2 mt-2 text-xs font-medium rounded-full cursor-pointer transition duration-150
      ${
        isDarkMode
          ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {children}
    </span>
  );

  return (
    <div className="space-y-8 sticky top-4">
      {/* Trending Topics */}
      <div
        className={`p-5 border rounded-xl transition-colors duration-200
        ${isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}
      >
        <div
          className={`flex items-center mb-3 text-sm font-semibold
          ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
        >
          <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
          Trending Topics
        </div>
        <div className="flex flex-wrap">
          {trendingTopics.map((topic, i) => (
            <TopicTag key={i}>{topic}</TopicTag>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div
        className={`p-5 border rounded-xl transition-colors duration-200
        ${isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}
      >
        <h3
          className={`mb-3 text-lg font-semibold
          ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
        >
          Categories
        </h3>
        <ul className="space-y-2">
          {categories.map((category, i) => (
            <li
              key={i}
              className={`text-sm cursor-pointer transition
              ${
                isDarkMode
                  ? "text-gray-300 hover:text-indigo-400"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Recommended Reading */}
      <div
        className={`p-5 border rounded-xl transition-colors duration-200
        ${isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}
      >
        <h3
          className={`mb-4 text-lg font-semibold
          ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
        >
          Recommended Reading
        </h3>
        <div className="space-y-4">
          {recommendedReading.map((item, i) => (
            <div key={i}>
              <p
                className={`font-medium cursor-pointer transition
                ${
                  isDarkMode
                    ? "text-gray-200 hover:text-indigo-400"
                    : "text-gray-800 hover:text-indigo-600"
                }`}
              >
                {item.title}
              </p>
              <p
                className={`text-sm
                ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
              >
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
