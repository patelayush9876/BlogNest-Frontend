import React from 'react';
import { PenTool, FileText, CheckCircle, AlertOctagon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const WriterGuidelines: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen pt-20 pb-16 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <h1
            className={`text-4xl font-bold mb-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}
          >
            <span className="text-indigo-500">Writer</span> Guidelines
          </h1>
          <p
            className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            Maintain clarity, accuracy, and respect — these guidelines help keep BlogNest
            high-quality and trustworthy.
          </p>
        </div>

        <div
          className={`p-8 rounded-xl shadow-sm border mb-10 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
        >
          <h2 className="text-2xl font-semibold mb-4">Essential Rules</h2>
          <ul
            className={
              isDarkMode
                ? 'text-gray-300 list-disc ml-6 space-y-2'
                : 'text-gray-700 list-disc ml-6 space-y-2'
            }
          >
            <li>Write original content. No plagiarism.</li>
            <li>Be accurate — verify code and facts.</li>
            <li>Use clear structure: intro, sections, summary.</li>
            <li>Label and cite external sources where applicable.</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-20">
          <GuidelineCard
            isDarkMode={isDarkMode}
            icon={<PenTool className="w-6 h-6 text-indigo-500 mr-2" />}
            title="Formatting"
            description="Use headings, lists, and code blocks. Keep paragraphs short and scannable."
          />
          <GuidelineCard
            isDarkMode={isDarkMode}
            icon={<FileText className="w-6 h-6 text-indigo-500 mr-2" />}
            title="Quality"
            description="Prefer practical examples and minimal but correct code snippets. Avoid excessive length without substance."
          />
          <GuidelineCard
            isDarkMode={isDarkMode}
            icon={<CheckCircle className="w-6 h-6 text-indigo-500 mr-2" />}
            title="Attribution"
            description="Give credit for borrowed ideas and licensed media. Link to original sources."
          />
          <GuidelineCard
            isDarkMode={isDarkMode}
            icon={<AlertOctagon className="w-6 h-6 text-indigo-500 mr-2" />}
            title="Prohibited Content"
            description="No hate speech, deliberate misinformation, or copyrighted content without permission."
          />
        </div>

        <div
          className={`p-8 rounded-xl shadow-sm border text-center ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
        >
          <h3 className="text-xl font-semibold mb-3">Editing & Review</h3>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            Posts might be reviewed for policy compliance. Minor edits may be applied for formatting
            or safety.
          </p>
        </div>
      </div>
    </div>
  );
};

const GuidelineCard = ({
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
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}
  >
    <div className="flex items-center mb-3">
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{description}</p>
  </div>
);

export default WriterGuidelines;
