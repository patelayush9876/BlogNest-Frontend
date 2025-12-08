import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import {
  FileText,
  UserCheck,
  ListChecks,
  Shield,
  PenSquare,
  AlertTriangle,
  Slash,
} from "lucide-react";

const Terms: React.FC = () => {
  const { isDarkMode } = useTheme();

  const sections = [
    {
      title: "Eligibility",
      icon: <UserCheck className="w-6 h-6 text-indigo-500" />,
      content: (
        <p className="text-sm">
          You must be at least <strong>13 years old</strong> to use BlogNest. By
          using the platform, you confirm that you meet this requirement and have
          the legal capacity to agree to these terms.
        </p>
      ),
    },
    {
      title: "User Responsibilities",
      icon: <ListChecks className="w-6 h-6 text-indigo-500" />,
      content: (
        <ul className="list-disc ml-5 space-y-2 text-sm">
          <li>You are responsible for all activity under your account.</li>
          <li>Do not publish harmful, plagiarized, or illegal content.</li>
          <li>Respect community guidelines and other members of the platform.</li>
        </ul>
      ),
    },
    {
      title: "Platform Rights",
      icon: <Shield className="w-6 h-6 text-indigo-500" />,
      content: (
        <>
          <p className="text-sm mb-2">BlogNest reserves the right to:</p>
          <ul className="list-disc ml-5 space-y-2 text-sm">
            <li>Modify, suspend, or discontinue parts of the service.</li>
            <li>Remove content that violates our policies or legal obligations.</li>
            <li>Restrict access to users engaging in harmful or abusive behavior.</li>
          </ul>
        </>
      ),
    },
    {
      title: "Content Ownership & License",
      icon: <PenSquare className="w-6 h-6 text-indigo-500" />,
      content: (
        <p className="text-sm">
          You retain ownership of the content you create. By publishing on
          BlogNest, you grant us a license to display, distribute, and promote
          your content on the platform and related services.
        </p>
      ),
    },
    {
      title: "Liability Disclaimer",
      icon: <AlertTriangle className="w-6 h-6 text-indigo-500" />,
      content: (
        <p className="text-sm">
          BlogNest is provided “as is.” We are not responsible for losses caused
          by technical issues, misuse, data loss, or third-party actions related
          to your use of the platform.
        </p>
      ),
    },
    {
      title: "Termination",
      icon: <Slash className="w-6 h-6 text-indigo-500" />,
      content: (
        <p className="text-sm">
          We may suspend or terminate your account if you violate these terms,
          breach our policies, or harm the community or platform in any way.
        </p>
      ),
    },
  ];

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
            Terms of <span className="text-indigo-500">Service</span>
          </h1>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            By accessing or using <strong>BlogNest</strong>, you agree to follow
            these terms and conditions that keep the platform safe and fair.
          </p>
        </div>

        {/* Overview Card */}
        <div
          className={`p-8 rounded-xl shadow-sm border mb-10 transition ${
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-7 h-7 text-indigo-500" />
            Overview
          </h2>
          <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
            These Terms of Service define your rights and responsibilities when
            using BlogNest, including content rules, platform rights, and what
            happens if policies are violated.
          </p>
        </div>

        {/* Terms Grid */}
        <div className="grid md:grid-cols-2 gap-10 mb-14">
          {sections.map((section, idx) => (
            <TermsCard
              key={idx}
              isDarkMode={isDarkMode}
              icon={section.icon}
              title={section.title}
            >
              {section.content}
            </TermsCard>
          ))}
        </div>

        {/* Footer */}
        <div
          className={`p-6 rounded-xl shadow-sm border text-center ${
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Using BlogNest means you accept these terms. If you do not agree, you
            should discontinue use of the platform.
          </p>
          <p
            className={`text-xs mt-3 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Last updated: January 2025
          </p>
        </div>
      </div>
    </div>
  );
};

const TermsCard = ({
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
    <div className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
      {children}
    </div>
  </div>
);

export default Terms;
