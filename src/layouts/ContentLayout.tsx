import React, { useState } from "react";
import ArticleCard from "../components/ArticleCard";
import Sidebar from "../components/Sidebar";

const trendingArticles = [
  {
    image:
      "https://images.unsplash.com/photo-1627398242478-f471167905f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
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

  return (
    <div className="container p-4 mx-auto mt-4 md:p-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content Area */}
        <div className="lg:col-span-2">
          {/* Tabs Navigation */}
          <div className="relative w-full h-10 flex border border-gray-200 dark:border-gray-700 rounded-full overflow-hidden bg-gray-50 dark:bg-gray-900/50 backdrop-blur-md shadow-sm">
            {/* Sliding Active Indicator */}
            <div
              className="tabs-indicator tabs-indicator-offset"
              style={{
                width: `${98 / tabs.length}%`,
                left: `${
                  (tabs.findIndex((t) => t.id === activeTab) * 100) /
                  tabs.length
                }%`,
              }}
            />

            {/* Tab Buttons */}
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-button relative flex-1 text-center py-3 text-sm md:text-base font-semibold z-10 transition-all duration-300 rounded-full ${
                    isActive
                      ? "text-gray-700"
                      : "text-gray-700 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
                  }`}
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
            <ArticleCard {...trendingArticles[0]} />
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
