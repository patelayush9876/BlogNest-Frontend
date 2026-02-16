import React from 'react';
import { Users, Sparkles, Award, Globe } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const BecomeContributor: React.FC = () => {
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
            Become a <span className="text-indigo-500">Contributor</span>
          </h1>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Share your engineering experience, build a portfolio, and help the tech community grow.
          </p>
        </div>

        <div
          className={`p-8 rounded-xl shadow-sm border mb-10 transition ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            BlogNest welcomes contributors at all skill levels. Publish tutorials, deep-dives,
            architecture notes, or practical guides that help other engineers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-20">
          <FeatureCard
            isDarkMode={isDarkMode}
            icon={<Users className="w-6 h-6 text-indigo-500 mr-2" />}
            title="Join the Network"
            description="Create an account and start drafting. Contributors gain visibility and engagement from a focused tech audience."
          />
          <FeatureCard
            isDarkMode={isDarkMode}
            icon={<Sparkles className="w-6 h-6 text-indigo-500 mr-2" />}
            title="Get Featured"
            description="High-quality posts may be featured in trending sections and newsletters to amplify reach."
          />
          <FeatureCard
            isDarkMode={isDarkMode}
            icon={<Award className="w-6 h-6 text-indigo-500 mr-2" />}
            title="Earn Recognition"
            description="Earn badges and reputation as readers interact with your work."
          />
          <FeatureCard
            isDarkMode={isDarkMode}
            icon={<Globe className="w-6 h-6 text-indigo-500 mr-2" />}
            title="Global Audience"
            description="Reach readers worldwide — from juniors learning basics to experts exploring advanced topics."
          />
        </div>

        <div
          className={`p-8 rounded-xl shadow-sm border text-center ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <h3 className="text-xl font-semibold mb-3">How to Start</h3>
          <ol className={`list-decimal ml-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <li>Create an account or log in.</li>
            <li>Read our Writer Guidelines and Community Standards.</li>
            <li>Open the editor and publish your first post.</li>
          </ol>
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

export default BecomeContributor;
