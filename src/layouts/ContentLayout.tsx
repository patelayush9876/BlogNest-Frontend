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

  // Fetch blogs on mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const blogs = await BlogService.getAllBlogs();
        const formattedBlogs = blogs.map((blog: any) => {
          let parsedTags = [];
          try {
            if (Array.isArray(blog.tags)) {
              if (
                blog.tags.length === 1 &&
                typeof blog.tags[0] === "string" &&
                blog.tags[0].startsWith("[")
              ) {
                parsedTags = JSON.parse(blog.tags[0]);
              } else {
                parsedTags = blog.tags;
              }
            }
          } catch (err) {
            console.warn("Error parsing tags for blog:", blog._id, err);
            parsedTags = [];
          }

          return { ...blog, tags: parsedTags };
        });

        setBlogs(formattedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
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
        {/* Main Content Area */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div
            className={clsx(
              "relative w-full h-12 flex rounded-full overflow-hidden shadow-sm border transition-colors duration-300",
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-gray-100 border-gray-200"
            )}
          >
            <div
              className={clsx(
                "absolute top-1 left-1 h-10 w-[calc(33.333%-0.5rem)] rounded-full transition-transform duration-300 ease-in-out shadow-md",
                "bg-indigo-500 dark:bg-indigo-600",
                indicatorPosition[activeTab as keyof typeof indicatorPosition]
              )}
            />
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "relative flex-1 text-center z-10 font-semibold text-sm md:text-base transition-colors duration-300",
                  activeTab === tab.id
                    ? isDarkMode
                      ? "text-indigo-200"
                      : "text-indigo-900"
                    : isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Article Feed */}
          <div className="mt-6 space-y-8">
            {loading ? (
              <p className="text-center text-gray-500">Loading blogs...</p>
            ) : blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <ArticleCard
                  key={index}
                  image={blog.attachment}
                  user={blog.author?.name || "Unknown"}
                  date={new Date(blog.createdAt).toLocaleDateString()}
                  readTime={blog.readTime || "5 min read"}
                  title={blog.title}
                  excerpt={(blog.content || "").slice(0, 100) + "..."}
                  tags={blog.tags || []}
                  likes={blog.likes?.length || 0}
                  comments={blog.comments?.length || 0}
                  author={blog?.author as any}
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
