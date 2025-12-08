import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import {
  Shield,
  UserCheck,
  Database,
  Share2,
  Lock,
  FileText,
  RefreshCcw,
} from "lucide-react";

const Privacy: React.FC = () => {
  const { isDarkMode } = useTheme();

  const sections = [
    {
      title: "Information We Collect",
      icon: <Database className="w-6 h-6 text-indigo-500" />,
      content: (
        <>
          <p className="mb-2">
            We collect information to improve our services and enhance your
            experience:
          </p>
          <ul className="list-disc ml-5 space-y-2">
            <li><strong>Account Data:</strong> Name, email, username, and profile details.</li>
            <li><strong>Content:</strong> Articles, comments, likes, drafts.</li>
            <li><strong>Technical Data:</strong> IP, browser, device information.</li>
            <li><strong>Cookies:</strong> For personalization and performance.</li>
          </ul>
        </>
      ),
    },
    {
      title: "How We Use Your Information",
      icon: <UserCheck className="w-6 h-6 text-indigo-500" />,
      content: (
        <ul className="list-disc ml-5 space-y-2">
          <li>To manage your account and enable content publishing.</li>
          <li>To enhance user experience & improve performance.</li>
          <li>To ensure platform safety and prevent misuse.</li>
          <li>To deliver platform features smoothly.</li>
        </ul>
      ),
    },
    {
      title: "Sharing of Information",
      icon: <Share2 className="w-6 h-6 text-indigo-500" />,
      content: (
        <>
          <p className="mb-2">
            We do <strong>not sell</strong> personal information. Data is shared only when needed:
          </p>
          <ul className="list-disc ml-5 space-y-2">
            <li>To comply with legal requirements.</li>
            <li>To protect platform integrity and user safety.</li>
            <li>With trusted service providers (hosting, analytics, security).</li>
          </ul>
        </>
      ),
    },
    {
      title: "Data Security",
      icon: <Lock className="w-6 h-6 text-indigo-500" />,
      content: (
        <p>
          We use encryption, secure servers, and strict access controls to safeguard
          information from unauthorized access.
        </p>
      ),
    },
    {
      title: "Your Rights",
      icon: <Shield className="w-6 h-6 text-indigo-500" />,
      content: (
        <ul className="list-disc ml-5 space-y-2">
          <li>Access or correct your personal data anytime.</li>
          <li>Request deletion of your account and stored data.</li>
          <li>Manage cookie and communication preferences.</li>
        </ul>
      ),
    },
    {
      title: "Policy Updates",
      icon: <RefreshCcw className="w-6 h-6 text-indigo-500" />,
      content: (
        <p>
          This policy may be updated periodically. Continued use of BlogNest means you
          accept future terms.
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
            Privacy <span className="text-indigo-500">Policy</span>
          </h1>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Your privacy is important to us. This page explains how BlogNest
            collects, protects and uses your information responsibly.
          </p>
        </div>

        {/* Overview */}
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
            This document details what information we collect, how we use it,
            security measures, user rights, and policy updates.
          </p>
        </div>

        {/* Policy Cards */}
        <div className="grid md:grid-cols-2 gap-10 mb-14">
          {sections.map((item, idx) => (
            <PrivacyCard
              key={idx}
              title={item.title}
              icon={item.icon}
              isDarkMode={isDarkMode}
            >
              {item.content}
            </PrivacyCard>
          ))}
        </div>

        {/* Footer */}
        <div
          className={`p-6 rounded-xl shadow-sm border text-center ${
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            BlogNest is committed to transparent data use. Feel free to contact us
            for privacy queries or data requests.
          </p>
          <p
            className={`text-xs mt-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
          >
            Last updated: January 2025
          </p>
        </div>
      </div>
    </div>
  );
};

/* Card Component */
const PrivacyCard = ({
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

export default Privacy;
