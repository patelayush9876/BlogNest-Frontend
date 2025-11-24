import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";


import {
  followUser,
  unfollowUser,
} from "../../services/follow.service";

import ArticleCard from "../../components/ArticleCard";
import { getProfileById } from "../../services/profile.service";

const PublicUserProfile: React.FC = () => {
  const { authorId : userId } = useParams(); // /user/:userId
  const { isDarkMode, toggleTheme } = useTheme();

  const [profile, setProfile] = useState<any>(null);
  const [blogs, setBlogs] = useState<any[]>([]);
//   const [followers, setFollowers] = useState<any[]>([]);
//   const [following, setFollowing] = useState<any[]>([]);

  const [activeTab, setActiveTab] = useState("Posts");
  const [isFollowingUser, setIsFollowingUser] = useState(false);

  const [loading, setLoading] = useState(true);
  const [blogsLoading, setBlogsLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!userId) return;

        const data = await getProfileById(userId);
        console.log("data", data)
        setProfile(data);

        // check if current user follows this profile
        setIsFollowingUser(data.isFollowedByCurrentUser || false);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  useEffect(() => {
    if (activeTab === "Posts" && userId) {
      const fetchPosts = async () => {
        setBlogsLoading(true);
        try {
        //   const data = await getBlogsByUser(userId);
        //   setBlogs(data);
        } catch (err) {
          console.error("Failed to fetch posts:", err);
        } finally {
          setBlogsLoading(false);
        }
      };
      fetchPosts();
    }
  }, [activeTab, userId]);

  const handleFollow = async () => {
    if (!userId) return;

    try {
      if (isFollowingUser) {
        await unfollowUser(userId);
        setIsFollowingUser(false);
        setProfile((prev: any) => ({
          ...prev,
          followersCount: prev.followersCount - 1,
        }));
      } else {
        await followUser(userId);
        setIsFollowingUser(true);
        setProfile((prev: any) => ({
          ...prev,
          followersCount: prev.followersCount + 1,
        }));
      }
    } catch (err) {
      console.error("Follow error:", err);
    }
  };

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

  if (!profile) {
    return (
      <div className="text-center py-10 text-red-500">
        User not found.
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
          {profile.profilePic ? (
            <img
              src={profile.profilePic}
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

          {/* Info */}
          <div className="flex-1">
            <h2 className="text-xl font-bold">@{profile.username}</h2>
            <p className="opacity-80">{profile.user.name}</p>
            <p className="opacity-80">{profile.bio}</p>

            {/* Stats */}
            <div className="text-sm flex space-x-4 mt-3 opacity-80">
              <span>
                <strong>{profile.postsCount}</strong> Posts
              </span>
              <span>
                <strong>{profile.followersCount}</strong> Followers
              </span>
              <span>
                <strong>{profile.followingCount}</strong> Following
              </span>
            </div>

            {/* Follow / Unfollow Button */}
            <div className="mt-4">
              <button
                onClick={handleFollow}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  isFollowingUser
                    ? isDarkMode
                      ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                      : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                    : isDarkMode
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-gray-900 hover:bg-gray-800 text-white"
                }`}
              >
                {isFollowingUser ? "Following" : "Follow"}
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
            {["Posts", "Followers", "Following"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-1 pb-3 transition ${
                  activeTab === tab
                    ? `border-b-2 border-indigo-500 font-semibold`
                    : "opacity-60 hover:opacity-90"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* -------------------- POSTS -------------------- */}
        {activeTab === "Posts" &&
          (blogsLoading ? (
            <div className="py-12 text-center opacity-70">
              Loading posts...
            </div>
          ) : blogs.length > 0 ? (
            <div className="space-y-8">
              {blogs.map((blog) => (
                <ArticleCard
                  key={blog._id}
                  id={blog._id}
                  image={blog.attachment}
                  user={blog.author?.name}
                  date={blog.createdAt}
                  title={blog.title}
                  content={blog.content}
                  tags={blog.tags}
                  likes={blog.likeCount}
                  comments={blog.commentCount}
                  author={blog.author}
                  profile={blog.profile}
                  likedByCurrentUser={blog.likedByCurrentUser}
                />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center opacity-70">
              No posts available.
            </div>
          ))}

        {/* -------------------- FOLLOWERS -------------------- */}
        {activeTab === "Followers" && (
          <div className="py-6 text-center opacity-70">
            Followers list goes here.
          </div>
        )}

        {/* -------------------- FOLLOWING -------------------- */}
        {activeTab === "Following" && (
          <div className="py-6 text-center opacity-70">
            Following list goes here.
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicUserProfile;
