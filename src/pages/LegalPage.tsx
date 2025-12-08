import React from "react";
import { Shield, ScrollText, FileLock, Cookie } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";


const LegalPage: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen pt-20 pb-16 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-10">

        <div className="text-center mb-14">
          <h1 className={`text-4xl font-bold mb-3 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
            Legal <span className="text-indigo-500">Policies</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Transparency and trust matter. Review our policies to understand how BlogNest protects you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-20">
          <LegalCard
            isDarkMode={isDarkMode}
            icon={<Shield className="w-6 h-6 text-indigo-500 mr-2" />}
            title="Privacy Policy"
            description="How we collect, store, and safeguard your personal data across the platform."
          />
          <LegalCard
            isDarkMode={isDarkMode}
            icon={<ScrollText className="w-6 h-6 text-indigo-500 mr-2" />}
            title="Terms of Service"
            description="The rules, rights, and responsibilities involved in using BlogNest."
          />
          <LegalCard
            isDarkMode={isDarkMode}
            icon={<FileLock className="w-6 h-6 text-indigo-500 mr-2" />}
            title="Content Ownership Policy"
            description="You own your content — learn how BlogNest manages rights, usage, and attribution."
          />
          <LegalCard
            isDarkMode={isDarkMode}
            icon={<Cookie className="w-6 h-6 text-indigo-500 mr-2" />}
            title="Cookie Policy"
            description="Understanding how cookies help improve performance, analytics, and personalization."
          />
        </div>
      </div>
    </div>
  );
};

const LegalCard = ({
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
    <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>{description}</p>
  </div>
);

export default LegalPage;
