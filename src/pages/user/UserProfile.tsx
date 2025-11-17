import React, { useEffect, useState } from "react";
import { Mail, Edit2, User } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { getMyProfile } from "../../services/profile.service";
import { getMyBlogs } from "../../services/blog.service";
import type { IUserProfile } from "../../interfaces/userProfileInterface";
import type { BlogWithProfile } from "../../interfaces/blogInterface";
import ArticleCard from "../../components/ArticleCard";
import { useNavigate } from "react-router-dom";

const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("My Posts");
  const { isDarkMode, toggleTheme } = useTheme();
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [blogs, setBlogs] = useState<BlogWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (activeTab === "My Posts") {
      const fetchMyBlogs = async () => {
        setBlogsLoading(true);
        try {
          const data = await getMyBlogs();
          setBlogs(data);
        } catch (err) {
          console.error("Failed to fetch blogs:", err);
        } finally {
          setBlogsLoading(false);
        }
      };
      fetchMyBlogs();
    }
  }, [activeTab]);

  if (loading) {
    return (
      <div
        className={`text-center py-10 ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        Loading profile...
      </div>
    );
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
            type="button"
            onClick={toggleTheme}
            className={`px-3 py-2 text-sm border rounded-lg transition ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700"
                : "bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Profile Header */}
        <div className="mb-10 flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8">
          {/* <img
            src={profile?.profilePic}
            alt={profile?.user.name}
            className={`object-cover w-24 h-24 rounded-full flex-shrink-0 border ${
              isDarkMode ? "border-gray-700" : "border-gray-300"
            }`}
          /> */}
          {profile?.profilePic ? (
            <img
              src={profile?.profilePic}
              alt="Profile"
              className={`w-32 h-32 object-cover rounded-full border ${
                isDarkMode ? "border-gray-700" : "border-gray-300"
              }`}
            />
          ) : (
            <div
              className={`w-32 h-32 flex items-center justify-center rounded-full border ${
                isDarkMode
                  ? "border-gray-700 bg-gray-700/30 text-gray-400"
                  : "border-gray-300 bg-gray-100 text-gray-500"
              }`}
            >
              <User className="h-16 w-16" />
            </div>
          )}

          <div className="flex-1">
            <h2
              className={`text-xl font-bold ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              @{profile?.username}
            </h2>
            <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
              {profile?.user.name}
            </p>
            <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
              {profile?.bio}
            </p>

            {/* Stats */}
            <div
              className={`text-sm flex space-x-4 mt-3 ${
                isDarkMode ? "text-gray-300" : "text-gray-800"
              }`}
            >
              <span>
                <strong className="font-bold">{profile?.postsCount}</strong>{" "}
                Posts
              </span>
              <span>
                <strong className="font-bold">
                  {profile?.followers.length}
                </strong>{" "}
                Followers
              </span>
              <span>
                <strong className="font-bold">
                  {profile?.following.length}
                </strong>{" "}
                Following
              </span>
            </div>

            {/* Actions */}
            <div className="mt-4 flex space-x-3">
              <button
                type="button"
                className={`flex items-center px-4 py-2 text-sm font-semibold rounded-full transition duration-150 ${
                  isDarkMode
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-gray-900 hover:bg-gray-800 text-white"
                }`}
                onClick={() => navigate("/user/settings")}
              >
                <Edit2 className="w-4 h-4 mr-1" />
                Edit Profile
              </button>
              <button
                type="button"
                className={`flex items-center px-4 py-2 text-sm font-semibold border rounded-full transition duration-150 ${
                  isDarkMode
                    ? "text-gray-200 border-gray-600 hover:bg-gray-700"
                    : "text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                <Mail className="w-4 h-4 mr-1" />
                Follow
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          className={`border-b mb-8 ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex space-x-6 text-base font-medium">
            {["My Posts", "Drafts", "Saved Blogs", "Following", "Followers"].map(
              (tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-1 pb-3 transition duration-150 ${
                    activeTab === tab
                      ? `border-b-2 border-indigo-500 font-semibold ${
                          isDarkMode ? "text-gray-200" : "text-gray-800"
                        }`
                      : isDarkMode
                      ? "text-gray-400 hover:text-gray-200"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>
        </div>

        {/* Content */}
        {activeTab === "My Posts" ? (
          blogsLoading ? (
            <div
              className={`text-center py-10 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Loading blogs...
            </div>
          ) : blogs.length > 0 ? (
            <div className="space-y-8">
              {blogs.map((blog) => (
                <ArticleCard
                  key={blog._id}
                  id={blog._id}
                  image={blog.attachment || ""}
                  user={blog.author?.name || "Unknown"}
                  date={blog.createdAt}
                  readTime={blog.readTime || "5 min read"}
                  title={blog.title}
                  content={(blog.content || "")}
                  tags={blog.tags || []}
                  likes={blog.likeCount}
                  comments={blog.commentCount}
                  author={blog.author}
                  profile={blog.profile}
                  likedByCurrentUser={blog.likedByCurrentUser}
                />
              ))}
            </div>
          ) : (
            <div
              className={`py-16 text-center ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              You haven’t posted any blogs yet.
            </div>
          )
        ) : (
          <div
            className={`py-16 text-center ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Content for <strong>{activeTab}</strong> goes here.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
