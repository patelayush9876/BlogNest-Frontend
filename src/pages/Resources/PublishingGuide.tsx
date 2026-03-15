import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { FilePlus, PencilRuler, Tags, Image as ImageIcon, Eye, Upload, Share2 } from 'lucide-react';

const PublishingGuide: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen pt-20 pb-16 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-14">
          <h1
            className={`text-4xl font-bold mb-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}
          >
            Blog <span className="text-indigo-500">Publishing Guide</span>
          </h1>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            A smooth process from drafting to publishing. Learn how to format, tag, preview, and
            publish blog articles effectively on <strong>BlogNest</strong>.
          </p>
        </div>

        {/* Overview Card */}
        <div
          className={`p-8 rounded-xl shadow-sm border mb-10 transition ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            BlogNest supports formatting tools, markdown, image uploads, preview mode, and draft
            saving features — making publishing seamless for creators.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 gap-10 mb-14">
          <StepCard
            isDarkMode={isDarkMode}
            icon={<FilePlus className="w-6 h-6 text-indigo-500" />}
            title="Start a New Draft"
          >
            <p>Open the editor from your dashboard, add a title and start writing.</p>
            <p className="mt-1">Insert images, code blocks or embed content easily.</p>
          </StepCard>

          <StepCard
            isDarkMode={isDarkMode}
            icon={<PencilRuler className="w-6 h-6 text-indigo-500" />}
            title="Use Formatting Tools"
          >
            <ul className="list-disc ml-5 space-y-2">
              <li>Headings (H1–H4)</li>
              <li>Markdown or rich text</li>
              <li>Syntax-highlighted code blocks</li>
            </ul>
          </StepCard>

          <StepCard
            isDarkMode={isDarkMode}
            icon={<Tags className="w-6 h-6 text-indigo-500" />}
            title="Add Relevant Tags"
          >
            <p>Use 2–5 tags that match your topic.</p>
            <p className="mt-1">Example: JavaScript, Web Dev, Cloud, DevOps.</p>
          </StepCard>

          <StepCard
            isDarkMode={isDarkMode}
            icon={<ImageIcon className="w-6 h-6 text-indigo-500" />}
            title="Add a Feature Image"
          >
            <p>Use a clean and engaging cover image for better visibility.</p>
          </StepCard>

          <StepCard
            isDarkMode={isDarkMode}
            icon={<Eye className="w-6 h-6 text-indigo-500" />}
            title="Preview Before Publishing"
          >
            <p>Check layout, spacing, readability, SEO metadata and media placement.</p>
          </StepCard>

          <StepCard
            isDarkMode={isDarkMode}
            icon={<Upload className="w-6 h-6 text-indigo-500" />}
            title="Publish or Save as Draft"
          >
            <ul className="list-disc ml-5 space-y-2">
              <li>Publish when ready</li>
              <li>Save as draft anytime</li>
            </ul>
          </StepCard>

          <StepCard
            isDarkMode={isDarkMode}
            icon={<Share2 className="w-6 h-6 text-indigo-500" />}
            title="Share & Engage"
          >
            <p>Reply to comments, improve content later, and share your post widely.</p>
          </StepCard>
        </div>

        {/* Footer */}
        <div
          className={`p-6 rounded-xl shadow-sm border text-center ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Publishing is a skill that grows with experience. Every article you post shapes your
            voice and contributes to the community.
          </p>

          <p className={`text-xs mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Last updated: January 2025
          </p>
        </div>
      </div>
    </div>
  );
};

// Reusable Step Card
const StepCard = ({
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
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}
  >
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <div className={isDarkMode ? 'text-gray-300 text-sm' : 'text-gray-700 text-sm'}>{children}</div>
  </div>
);

export default PublishingGuide;
