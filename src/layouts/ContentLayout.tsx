import React, { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";
import Sidebar from "../components/Sidebar";
import clsx from "clsx";
import * as BlogService from "../services/blogService"

const ContentLayout: React.FC = () => {
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
      setBlogs(blogs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };
  fetchBlogs();
}, []);


  return (
    <div className="container p-4 mx-auto mt-4 md:p-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content Area */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="relative w-full h-12 flex bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden shadow-sm">
            <div
              className={clsx(
                "absolute top-1 left-1 h-10 w-[calc(33.333%-0.5rem)] bg-indigo-500 dark:bg-indigo-600 rounded-full transition-transform duration-300 ease-in-out shadow-md",
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
                    ? "text-indigo-900"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
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
                  excerpt={blog.content?.slice(0, 100) + "..."}
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
