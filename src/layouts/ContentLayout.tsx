import React, { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";
import Sidebar from "../components/Sidebar";
import clsx from "clsx";
import * as BlogService from "../services/blogService";
import { useTheme } from "../contexts/ThemeContext";

const ContentLayout: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("forYou");
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: "forYou", label: "For You" },
    { id: "following", label: "Following" },
    { id: "trending", label: "Trending" },
  ];

  const indicatorPosition = {
    forYou: "translate-x-[0%]",
    following: "translate-x-[100%]",
    trending: "translate-x-[200%]",
  };

  useEffect(() => {
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const blogs = await BlogService.getAllBlogs(); // blogs is already Blog[]
      const blogsData = blogs.map((blog: any) => {
        let parsedTags: string[] = [];
        try {
          if (Array.isArray(blog.tags)) {
            parsedTags =
              blog.tags.length === 1 && blog.tags[0].startsWith("[")
                ? JSON.parse(blog.tags[0])
                : blog.tags;
          }
        } catch (err) {
          console.log("Error fetching blogs",err)
          parsedTags = [];
        }

        return {
          ...blog,
          tags: parsedTags,
          likes: blog.likeCount || 0,
          comments: blog.commentCount || 0,
        };
      });
      setBlogs(blogsData);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchBlogs();
}, []);


  return (
    <div
      className={clsx(
        "p-4 w-full md:p-8 transition-colors duration-300",
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      )}
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className={`p-1 tab-container ${isDarkMode ? "dark" : ""}`}>
            <div
              className={clsx(
                "tab-indicator",
                indicatorPosition[activeTab as keyof typeof indicatorPosition]
              )}
            />
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx("tab-button", { active: activeTab === tab.id })}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Blog Feed */}
          <div className="mt-6 space-y-8">
            {loading ? (
              <p className="text-center text-gray-500">Loading blogs...</p>
            ) : blogs.length > 0 ? (
              blogs.map((blog) => (
                <ArticleCard
                  key={blog._id}
                  id={blog._id}
                  image={blog.attachment || ""}
                  user={blog.author?.name || "Unknown"}
                  date={blog.createdAt}
                  readTime={blog.readTime || "5 min read"}
                  title={blog.title}
                  content={(blog.content)}
                  tags={blog.tags || []}
                  likes={blog.likes}
                  comments={blog.comments}
                  author={blog.author}
                  profile={blog.profile}
                  likedByCurrentUser={blog.likedByCurrentUser}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">No blogs found.</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default ContentLayout;
