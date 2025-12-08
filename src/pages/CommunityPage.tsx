import React from "react";
import { Users, PenTool, ShieldCheck, AlertTriangle } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";


const CommunityPage: React.FC = () => {
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
          <h1 className={`text-4xl font-bold mb-3 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
            BlogNest <span className="text-indigo-500">Community</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            A place where tech writers, engineers, and learners collaborate, share ideas,
            and help each other grow.
          </p>
        </div>

        {/* Section Cards */}
        <div className="grid md:grid-cols-2 gap-10 mb-20">
          <CommunityCard
            isDarkMode={isDarkMode}
            icon={<Users className="w-6 h-6 text-indigo-500 mr-2" />}
            title="Become a Contributor"
            description="Join our network of engineers and writers. Publish meaningful blogs that help others learn."
          />
          <CommunityCard
            isDarkMode={isDarkMode}
            icon={<PenTool className="w-6 h-6 text-indigo-500 mr-2" />}
            title="Writer Guidelines"
            description="Follow our writing standards to maintain quality, clarity, and authenticity across all content."
          />
          <CommunityCard
            isDarkMode={isDarkMode}
            icon={<ShieldCheck className="w-6 h-6 text-indigo-500 mr-2" />}
            title="Community Standards"
            description="A healthy community thrives on respect, transparency, and constructive feedback."
          />
          <CommunityCard
            isDarkMode={isDarkMode}
            icon={<AlertTriangle className="w-6 h-6 text-indigo-500 mr-2" />}
            title="Report an Issue"
            description="Found a bug or inappropriate content? Help us improve by reporting issues."
          />
        </div>
      </div>
    </div>
  );
};

const CommunityCard = ({
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
      isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
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

export default CommunityPage;
