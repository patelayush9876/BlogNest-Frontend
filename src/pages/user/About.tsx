import React from "react";

import { BookOpen, Users, Globe, Sparkles } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const AboutPage: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen pt-20 pb-16 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-10">

        {/* Title */}
        <div className="text-center mb-14">
          <h1
            className={`text-4xl font-bold mb-3 ${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            About <span className="text-indigo-500">BlogNest</span>
          </h1>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            A publishing space built for tech engineers — where knowledge, experience,
            and expertise turn into meaningful content.
          </p>
        </div>

        {/* Intro Card */}
        <div
          className={`p-8 rounded-xl shadow-sm border mb-16 ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4">What is BlogNest?</h2>
          <p
            className={`leading-relaxed ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            BlogNest is a dedicated platform for technology professionals — software 
            developers, network engineers, cloud architects, data engineers, AI/ML 
            enthusiasts, cybersecurity experts, and learners in tech.  
            <br /><br />
            Here, engineers can publish informative, factual, and insightful blogs 
            about programming, tools, frameworks, architectures, networking concepts, 
            industry best practices, and real-world engineering experiences. 
            <br /><br />
            Whether you're sharing knowledge or learning from others, BlogNest is 
            designed to help the tech community grow together.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-10 mb-20">
          <FeatureCard
            isDarkMode={isDarkMode}
            icon={<BookOpen className="w-6 h-6 text-indigo-500 mr-2" />}
            title="Share Technical Knowledge"
            description="Publish blogs on programming, networking, cloud, DevOps, AI, cybersecurity, and more. Your expertise becomes someone’s learning path."
          />
          <FeatureCard
            isDarkMode={isDarkMode}
            icon={<Users className="w-6 h-6 text-indigo-500 mr-2" />}
            title="Engage With Engineers"
            description="Connect with developers, IT professionals, and tech learners. Comment, follow, collaborate, and grow your network."
          />
          <FeatureCard
            isDarkMode={isDarkMode}
            icon={<Globe className="w-6 h-6 text-indigo-500 mr-2" />}
            title="Discover Tech Content"
            description="Explore trending topics, deep technical posts, and practical tutorials curated specifically for engineers and tech enthusiasts."
          />
          <FeatureCard
            isDarkMode={isDarkMode}
            icon={<Sparkles className="w-6 h-6 text-indigo-500 mr-2" />}
            title="Built for Clarity"
            description="A clean and minimal UI designed to let you read, write, and think without distractions — just pure engineering content."
          />
        </div>

        {/* Mission */}
        <div
          className={`p-8 rounded-xl shadow-sm border text-center ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <h3 className="text-xl font-semibold mb-3">
            Our Mission
          </h3>
          <p
            className={`max-w-2xl mx-auto leading-relaxed ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            To create a platform where tech engineers can share knowledge, 
            learn from each other, and contribute to the global engineering 
            community — one insightful blog at a time.
          </p>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({
  isDarkMode,
  icon,
  title,
  description,
}: {
  isDarkMode: boolean;
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div
    className={`p-7 rounded-xl shadow-sm border transition ${
      isDarkMode
        ? "bg-gray-800 border-gray-700"
        : "bg-white border-gray-200"
    }`}
  >
    <div className="flex items-center mb-3">
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
      {description}
    </p>
  </div>
);

export default AboutPage;
