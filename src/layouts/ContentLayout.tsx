import React, { useState } from "react";
import ArticleCard from "../components/ArticleCard";
import Sidebar from "../components/Sidebar";
import clsx from "clsx";

const trendingArticles = [
  {
    image: "/assets/sample.jpeg",
    user: "John Doe",
    date: "Oct 1, 2025",
    readTime: "8 min read",
    title: "Getting Started with React 19: What's New and Exciting",
    excerpt: "React 19 brings a host of new features...",
    tags: ["React", "JavaScript", "Web Development"],
    likes: 342,
    comments: 45,
  },
  {
    image: "/assets/sample.jpeg",
    user: "Jane Smith",
    date: "Oct 2, 2025",
    readTime: "6 min read",
    title: "Mastering TailwindCSS in 2025",
    excerpt: "Tailwind CSS has evolved with new utilities...",
    tags: ["Tailwind", "CSS", "Design"],
    likes: 270,
    comments: 36,
  },
  {
    image: "/assets/sample.jpeg",
    user: "Alex Turner",
    date: "Oct 3, 2025",
    readTime: "10 min read",
    title: "Exploring Next.js 15 Server Components",
    excerpt: "Server Components bring exciting possibilities...",
    tags: ["Next.js", "React", "SSR"],
    likes: 190,
    comments: 22,
  },
  {
    image: "/assets/sample.jpeg",
    user: "John Doe",
    date: "Oct 1, 2025",
    readTime: "8 min read",
    title: "Getting Started with React 19: What's New and Exciting",
    excerpt: "React 19 brings a host of new features...",
    tags: ["React", "JavaScript", "Web Development"],
    likes: 342,
    comments: 45,
  },
];

const ContentLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState("forYou");

  const tabs = [
    { id: "forYou", label: "For You" },
    { id: "following", label: "Following" },
    { id: "trending", label: "Trending" },
  ];

  // Map active tab to translate percentage
  const indicatorPosition = {
    forYou: "translate-x-[0%]",
    following: "translate-x-[100%]",
    trending: "translate-x-[200%]",
  };

  return (
    <div className="container p-4 mx-auto mt-4 md:p-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content Area */}
        <div className="lg:col-span-2">
          {/* Tabs Navigation */}
          <div className="relative w-full h-10 flex border border-gray-200 dark:border-gray-700 rounded-full overflow-hidden bg-gray-50 dark:bg-gray-900/50 backdrop-blur-md shadow-sm">
            {/* Sliding Active Indicator */}
            <div
              className={clsx(
                "absolute top-0 left-0 h-full w-1/3 bg-indigo-100 dark:bg-indigo-600/40 transition-transform duration-300 ease-in-out rounded-full",
                indicatorPosition[activeTab as keyof typeof indicatorPosition]
              )}
            />

            {/* Tab Buttons */}
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    "relative flex-1 text-center py-3 text-sm md:text-base font-semibold z-10 transition-all duration-300 rounded-full focus:outline-none",
                    isActive
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Article Feed */}
          <div className="mt-6 space-y-8">
            {trendingArticles.map((article, index) => (
              <ArticleCard key={index} {...article} />
            ))}
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
