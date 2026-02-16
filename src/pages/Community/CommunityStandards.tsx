import React from 'react';
import { Heart, Users, ShieldCheck, Ban } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const CommunityStandards: React.FC = () => {
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
            Community <span className="text-indigo-500">Standards</span>
          </h1>
          <p
            className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            We foster respectful, constructive, and inclusive interactions among all members.
          </p>
        </div>

        <div
          className={`p-8 rounded-xl shadow-sm border mb-10 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
        >
          <h2 className="text-2xl font-semibold mb-4">Core Principles</h2>
          <ul
            className={
              isDarkMode
                ? 'text-gray-300 list-disc ml-6 space-y-2'
                : 'text-gray-700 list-disc ml-6 space-y-2'
            }
          >
            <li>Respect — treat others with kindness and professionalism.</li>
            <li>Constructive feedback — focus on solutions, not attacks.</li>
            <li>Inclusivity — do not exclude or demean protected groups.</li>
            <li>Transparency — disclose affiliations or conflicts of interest.</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-20">
          <StandardCard
            isDarkMode={isDarkMode}
            icon={<Heart className="w-6 h-6 text-indigo-500 mr-2" />}
            title="Be Respectful"
            description="Use civil language, avoid ad hominem attacks, and assume good intent."
          />
          <StandardCard
            isDarkMode={isDarkMode}
            icon={<Users className="w-6 h-6 text-indigo-500 mr-2" />}
            title="Be Helpful"
            description="Provide actionable feedback and resources. Share examples or references when possible."
          />
          <StandardCard
            isDarkMode={isDarkMode}
            icon={<ShieldCheck className="w-6 h-6 text-indigo-500 mr-2" />}
            title="Be Safe"
            description="Report threats, doxxing, or other dangerous behavior immediately."
          />
          <StandardCard
            isDarkMode={isDarkMode}
            icon={<Ban className="w-6 h-6 text-indigo-500 mr-2" />}
            title="Consequences"
            description="Repeated violations may lead to content removal, suspension, or account ban."
          />
        </div>

        <div
          className={`p-8 rounded-xl shadow-sm border text-center ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
        >
          <h3 className="text-xl font-semibold mb-3">Reporting & Appeals</h3>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            Use the Report an Issue page to flag violations. If you disagree with an action, you may
            request a review.
          </p>
        </div>
      </div>
    </div>
  );
};

const StandardCard = ({
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

export default CommunityStandards;
