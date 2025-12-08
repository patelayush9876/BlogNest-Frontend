import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { Users, FileText, Code, Layers, CheckCircle, Image as ImageIcon } from "lucide-react";

const WritingTips: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen pt-20 pb-16 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        
        {/* Header */}
        <div className="text-center mb-14">
          <h1
            className={`text-4xl font-bold mb-3 ${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Technical <span className="text-indigo-500">Writing Tips</span>
          </h1>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Turn complex engineering ideas into clear, structured articles that
            readers actually enjoy and learn from on <strong>BlogNest</strong>.
          </p>
        </div>

        {/* Overview Card */}
        <div
          className={`p-8 rounded-xl shadow-sm border mb-10 transition ${
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
            Effective technical writing transforms complex concepts into easy-to-follow 
            knowledge. These tips help you craft meaningful and clear articles for readers 
            at different skill levels.
          </p>
        </div>

        {/* Grid with Icon Cards */}
        <div className="grid md:grid-cols-2 gap-10 mb-14">
          <TipCard
            isDarkMode={isDarkMode}
            icon={<Users className="w-6 h-6 text-indigo-500" />}
            title="Know Your Audience"
          >
            <ul className="list-disc ml-5 space-y-2">
              <li>Target beginners, intermediate or advanced users clearly.</li>
              <li>Use examples relatable to the audience.</li>
              <li>Explain prerequisites when required.</li>
            </ul>
          </TipCard>

          <TipCard
            isDarkMode={isDarkMode}
            icon={<FileText className="w-6 h-6 text-indigo-500" />}
            title="Keep Writing Simple"
          >
            <ul className="list-disc ml-5 space-y-2">
              <li>Use short, direct sentences.</li>
              <li>Avoid heavy jargon unless explained.</li>
              <li>Simplicity improves readability.</li>
            </ul>
          </TipCard>

          <TipCard
            isDarkMode={isDarkMode}
            icon={<Code className="w-6 h-6 text-indigo-500" />}
            title="Use Practical Examples"
          >
            <ul className="list-disc ml-5 space-y-2">
              <li>Add real working code snippets.</li>
              <li>Share real-world use cases.</li>
              <li>Demonstrations increase clarity.</li>
            </ul>
          </TipCard>

          <TipCard
            isDarkMode={isDarkMode}
            icon={<Layers className="w-6 h-6 text-indigo-500" />}
            title="Structure the Content Well"
          >
            <ul className="list-disc ml-5 space-y-2">
              <li>Use headings and subheadings.</li>
              <li>Break content into logical sections.</li>
              <li>End with summary or call to action.</li>
            </ul>
          </TipCard>

          <TipCard
            isDarkMode={isDarkMode}
            icon={<CheckCircle className="w-6 h-6 text-indigo-500" />}
            title="Ensure Accuracy"
          >
            <ul className="list-disc ml-5 space-y-2">
              <li>Verify code and information.</li>
              <li>Check API versions and results.</li>
              <li>Update outdated knowledge.</li>
            </ul>
          </TipCard>

          <TipCard
            isDarkMode={isDarkMode}
            icon={<ImageIcon className="w-6 h-6 text-indigo-500" />}
            title="Use Visuals Smartly"
          >
            <ul className="list-disc ml-5 space-y-2">
              <li>Add screenshots and diagrams only when needed.</li>
              <li>Avoid overwhelming long code blocks.</li>
              <li>Proofread before publishing.</li>
            </ul>
          </TipCard>
        </div>

        {/* Footer Card */}
        <div
          className={`p-6 rounded-xl shadow-sm border text-center ${
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            Improving writing is a continuous journey. Each published blog becomes
            a better version of your past work.
          </p>
          <p className={`text-xs mt-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            Last updated: January 2025
          </p>
        </div>
      </div>
    </div>
  );
};

const TipCard = ({
  isDarkMode,
  icon,
  title,
  children,
}: {
  isDarkMode: boolean;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div
    className={`p-7 rounded-xl shadow-sm border transition ${
      isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
    }`}
  >
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <div className={isDarkMode ? "text-gray-300 text-sm" : "text-gray-700 text-sm"}>
      {children}
    </div>
  </div>
);

export default WritingTips;
