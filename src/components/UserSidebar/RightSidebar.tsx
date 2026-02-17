import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import {
  getMostSavedBlogs,
  getRecommendedBlogs,
  getTrendingTopics,
} from '../../services/blog.service';
// import { getSuggestedUsers } from '../../services/profile.service';

interface Author {
  _id: string;
  name: string;
}

interface BlogItem {
  _id: string;
  title: string;
  author: Author;
}

interface SuggestedUser {
  _id: string;
  name: string;
}

const RightSidebar: React.FC = () => {
  const { isDarkMode } = useTheme();

  const [recommended, setRecommended] = useState<BlogItem[]>([]);
  const [popularTags, setPopularTags] = useState<string[]>([]);
  const [mostSaved, setMostSaved] = useState<BlogItem[]>([]);
  // const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUser[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rec = await getRecommendedBlogs(3);
        setRecommended(rec);

        const tags = await getTrendingTopics('tag', 6);
        setPopularTags(tags.map((t) => t._id));

        const saved = await getMostSavedBlogs(3);
        setMostSaved(saved);

        // const users = await getSuggestedUsers(3);
        // setSuggestedUsers(users);
      } catch (err) {
        console.error('Right sidebar fetch error:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Recommended Reading */}
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
          {recommended.map((item) => (
            <div key={item._id}>
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
                {item.author.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Who to Follow */}
      {/* <div
        className={`p-5 border rounded-xl ${
          isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <h3
          className={`mb-4 text-lg font-semibold ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}
        >
          Who to Follow
        </h3>

        <div className="space-y-4">
          {suggestedUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between"
            >
              <p
                className={`font-medium ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}
              >
                {user.name}
              </p>

              <button
                className="text-xs px-3 py-1 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
              >
                Follow
              </button>
            </div>
          ))}
        </div>
      </div> */}

      {/* Popular Tags */}
      <div
        className={`p-5 border rounded-xl ${
          isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <h3
          className={`mb-4 text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}
        >
          Popular Tags
        </h3>

        <div className="flex flex-wrap">
          {popularTags.map((tag) => (
            <span
              key={tag}
              className={`inline-block px-3 py-1 mr-2 mt-2 text-xs font-medium rounded-full cursor-pointer transition ${
                isDarkMode
                  ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Most Saved Posts */}
      <div
        className={`p-5 border rounded-xl ${
          isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <h3
          className={`mb-4 text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}
        >
          Most Saved
        </h3>

        <div className="space-y-4">
          {mostSaved.map((item) => (
            <div key={item._id}>
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
                {item.author.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
