import React, { useEffect, useState } from "react";
import { Mail, Edit2, Heart, MessageSquare, Bookmark } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { getMyProfile } from "../../services/profileService";
import type { IUserProfile } from "../../interfaces/userProfileInterface";

interface ArticleData {
  image: string;
  author: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  tags: string[];
  likes: number;
  comments: number;
}


const mockArticle: ArticleData = {
  image:
    "https://images.unsplash.com/photo-1627398242478-f471167905f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  author: "Sarah Johnson",
  date: "Sep 28, 2025",
  readTime: "12 min read",
  title: "The Art of Code: Principles Every Developer Should Know",
  excerpt:
    "Writing clean, maintainable code is an art form. Here are the essential principles that will transform your coding practice.",
  tags: ["Programming", "Best Practices", "Clean Code"],
  likes: 629,
  comments: 57,
};

// --- Article Card ---
const ProfileArticleCard: React.FC<ArticleData> = ({
  image,
  author,
  date,
  readTime,
  title,
  excerpt,
  tags,
  likes,
  comments,
}) => (
  <div className="pb-8 mb-8 border-b border-gray-200 dark:border-gray-700">
    {/* Image */}
    <div className="relative mb-4 overflow-hidden rounded-xl">
      <img
        src={image}
        alt={title}
        className="object-cover w-full h-auto max-h-[400px]"
      />
    </div>

    {/* Meta */}
    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
      <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      <span className="font-semibold text-gray-900 dark:text-gray-100">
        {author}
      </span>
      <span>&middot;</span>
      <span>{date}</span>
      <span>&middot;</span>
      <span>{readTime}</span>
    </div>

    {/* Title */}
    <h2 className="mb-2 text-xl font-bold leading-snug text-gray-900 dark:text-white cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400">
      {title}
    </h2>

    {/* Excerpt */}
    <p className="mb-4 text-gray-600 dark:text-gray-300 line-clamp-2">
      {excerpt}
    </p>

    {/* Tags + Actions */}
    <div className="flex items-center justify-between">
      <div className="flex flex-wrap items-center space-x-2">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 dark:bg-indigo-900/40 dark:text-indigo-300 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-1">
          <Heart className="w-5 h-5 text-red-500 fill-current" />
          <span className="text-sm">{likes}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MessageSquare className="w-5 h-5" />
          <span className="text-sm">{comments}</span>
        </div>
        <button
          className="p-1 hover:text-gray-900 dark:hover:text-white"
          aria-label="bookmark"
        >
          <Bookmark className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
);

const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("My Posts");
  const { isDarkMode, toggleTheme } = useTheme();
  const [profile, setProfile] = useState<IUserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const data = await getMyProfile();
          setProfile(data);
        } catch (err) {
          console.error("Failed to fetch profile:", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProfile();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>; // You can replace this with a spinner
    }
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-8 md:px-8 max-w-4xl">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={toggleTheme}
            className="px-3 py-2 text-sm border rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Profile Header */}
        <div className="mb-10 flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8">
          <img
            src={profile?.profilePic}
            alt={profile?.user.name}
            className="object-cover w-24 h-24 rounded-full flex-shrink-0"
          />

          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              @{profile?.user.name}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              {profile?.user.name}
            </p>
            <p className="text-gray-600 dark:text-gray-300 max-w-lg text-sm">
              {profile?.bio}
            </p>

            {/* Stats */}
            <div className="flex space-x-4 text-sm mt-3 text-gray-700 dark:text-gray-300">
              <span>
                <strong className="font-bold text-gray-900 dark:text-white">
                  {profile?.postsCount}
                </strong>{" "}
                Posts
              </span>
              <span>
                <strong className="font-bold text-gray-900 dark:text-white">
                  {profile?.followers.length}
                </strong>{" "}
                Followers
              </span>
              <span>
                <strong className="font-bold text-gray-900 dark:text-white">
                  {profile?.following.length}
                </strong>{" "}
                Following
              </span>
            </div>

            {/* Actions */}
            <div className="mt-4 flex space-x-3">
              <button className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-black dark:bg-indigo-600 rounded-full hover:bg-gray-800 dark:hover:bg-indigo-700 transition duration-150">
                <Edit2 className="w-4 h-4 mr-1" />
                Edit Profile
              </button>
              <button className="flex items-center px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150">
                <Mail className="w-4 h-4 mr-1" />
                Follow
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex space-x-6 text-base font-medium">
            {["My Posts", "Saved Blogs", "Following", "Followers"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-1 pb-3 transition duration-150 ${
                  activeTab === tab
                    ? "text-gray-900 dark:text-white border-b-2 border-black dark:border-indigo-500 font-semibold"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === "My Posts" ? (
          <div className="space-y-8">
            <ProfileArticleCard {...mockArticle} />
            <ProfileArticleCard
              {...mockArticle}
              image="https://images.unsplash.com/photo-1542831371-29b0f74f9d13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              title="A Deep Dive into JavaScript Closures"
              likes={912}
              comments={105}
              date="Sep 15, 2025"
            />
          </div>
        ) : (
          <div className="py-16 text-center text-gray-500 dark:text-gray-400">
            Content for <strong>{activeTab}</strong> goes here.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
