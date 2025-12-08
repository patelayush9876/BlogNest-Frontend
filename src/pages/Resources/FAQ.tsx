import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { HelpCircle, Info, Edit3, CheckCircle, FileCode, KeyRound, AlertCircle } from "lucide-react";

const FAQ: React.FC = () => {
  const { isDarkMode } = useTheme();

  const faqs = [
    {
      q: "What is BlogNest?",
      a: "BlogNest is a modern platform for publishing articles, learning from others, and engaging in tech-focused discussions.",
      icon: <Info className="w-5 h-5 text-indigo-500" />,
    },
    {
      q: "Is BlogNest free to use?",
      a: "Yes. Writing, publishing, and reading articles are completely free.",
      icon: <CheckCircle className="w-5 h-5 text-indigo-500" />,
    },
    {
      q: "How do I publish an article?",
      a: "Go to your dashboard → open editor → write article → add tags/image → Publish.",
      icon: <Edit3 className="w-5 h-5 text-indigo-500" />,
    },
    {
      q: "Can I edit my article after publishing?",
      a: "Yes. You can update your article anytime from your profile’s ‘My Posts’ section.",
      icon: <HelpCircle className="w-5 h-5 text-indigo-500" />,
    },
    {
      q: "Does BlogNest support code blocks?",
      a: "Absolutely. Enjoy syntax-highlighted code blocks directly in the editor.",
      icon: <FileCode className="w-5 h-5 text-indigo-500" />,
    },
    {
      q: "How can I reset my password?",
      a: "Go to login page → click 'Forgot Password' → follow email reset link.",
      icon: <KeyRound className="w-5 h-5 text-indigo-500" />,
    },
    {
      q: "How do I report a problem?",
      a: "Use the Report Issue page to submit bugs, security concerns, or feedback.",
      icon: <AlertCircle className="w-5 h-5 text-indigo-500" />,
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
            Frequently Asked <span className="text-indigo-500">Questions</span>
          </h1>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Quick answers to the most common queries about using BlogNest.
          </p>
        </div>

        {/* FAQ Cards */}
        <div className="space-y-6 mb-14">
          {faqs.map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl shadow-sm border transition ${
                isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <h3 className="text-lg font-semibold">{item.q}</h3>
              </div>
              <p
                className={`mt-2 text-sm leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {item.a}
              </p>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div
          className={`p-6 rounded-xl shadow-sm border text-center ${
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} text-sm`}>
            Didn’t find your answer? Visit the <strong>Help Center</strong> or reach out
            to our support team for assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
