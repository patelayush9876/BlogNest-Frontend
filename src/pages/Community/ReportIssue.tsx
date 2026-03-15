import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { AlertTriangle, FileText, Mail } from 'lucide-react';
import { ReportIssueService } from '../../services/reportIssue.service';
import { IssueCategoryService } from '../../services/issueCategory.service';
import BirdLoader from '../../components/loaders/BirdLoader/BirdLoader';

const ReportIssue: React.FC = () => {
  const { isDarkMode } = useTheme();

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [email, setEmail] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [_error, setError] = useState('');
  const [issueType, setIssueType] = useState('content');
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await IssueCategoryService.getActiveCategories();
        const fetched = res.data?.categories || [];

        setCategories(fetched);

        if (fetched.length > 0) {
          setIssueType(fetched[0]._id); // default select first category
        }
        setLoading(false);
      } catch (error: any) {
        console.error('Failed to fetch categories', error.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitted(false);

    if (!title.trim() || !details.trim()) {
      setError('Please provide a title and detailed description.');
      return;
    }

    try {
      setLoading(true);

      await ReportIssueService.createIssue({
        title,
        description: details,
        category: issueType, // assuming issueType maps to category ID
        attachment: attachment || undefined,
      });

      setSubmitted(true);

      // Optional: reset fields after success
      setTitle('');
      setDetails('');
      setAttachment(null);
      setEmail('');
      setLoading(false);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loaderScreen">
        <BirdLoader />
      </div>
    );
  }
  return (
    <div
      className={`min-h-screen pt-20 pb-16 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <h1
            className={`text-3xl font-bold mb-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}
          >
            <span className="text-indigo-500">Report an Issue</span>
          </h1>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            Help us keep BlogNest safe and reliable — report bugs, abusive content, or other
            concerns.
          </p>
        </div>

        <div
          className={`p-8 rounded-xl shadow-sm border mb-8 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <h2 className="text-xl font-semibold mb-3">Before you report</h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            Try reproducing the issue, capture screenshots, and note URLs or steps. For content
            issues, include links to the offending post.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`p-8 rounded-xl shadow-sm border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <div className="mb-4">
            <label htmlFor="issue-type" className="block mb-2 text-sm font-medium">
              Issue Type
            </label>
            <select
              id="issue-type"
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              className={`w-full p-2 rounded-md border ${
                isDarkMode
                  ? 'bg-gray-900 border-gray-600 text-gray-100'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Short descriptive title"
              className={`w-full p-2 rounded-md border ${
                isDarkMode
                  ? 'bg-gray-900 border-gray-600 text-gray-100'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Details</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe the issue with steps to reproduce, links, and context"
              rows={6}
              className={`w-full p-2 rounded-md border resize-none ${
                isDarkMode
                  ? 'bg-gray-900 border-gray-600 text-gray-100'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Your email (optional)</label>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-indigo-500" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={`w-full p-2 rounded-md border ${
                  isDarkMode
                    ? 'bg-gray-900 border-gray-600 text-gray-100'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 mb-4">
            <label
              htmlFor="file-upload"
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md cursor-pointer border transition ${
                isDarkMode
                  ? 'bg-gray-900 border-gray-600 hover:bg-gray-700 text-gray-100'
                  : 'bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-800'
              }`}
            >
              <FileText className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-medium">
                {attachment ? 'Change Attachment' : 'Upload Screenshot'}
              </span>
            </label>

            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={(e) => setAttachment(e.target.files?.[0] ?? null)}
              className="hidden"
            />

            {attachment && (
              <div
                className={`text-sm px-3 py-2 rounded-md ${
                  isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Selected: <span className="font-medium">{attachment.name}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`px-4 py-2 rounded-md font-medium ${
                isDarkMode
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'bg-indigo-500 hover:bg-indigo-600 text-white'
              }`}
            >
              Submit Report
            </button>

            <div className="text-sm text-gray-500 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>We will review your report and respond as needed.</span>
            </div>
          </div>

          {submitted && (
            <div className="mt-6 p-4 rounded-md bg-green-50 text-green-800">
              Thank you — your report has been submitted. Our team will review it shortly.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ReportIssue;
