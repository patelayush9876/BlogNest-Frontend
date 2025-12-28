import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useTheme } from "../../contexts/ThemeContext";

/* ---------------- Mock Analytics Data ---------------- */

const engagementFunnel = [
  { stage: "Views", value: 4200 },
  { stage: "Likes", value: 920 },
  { stage: "Comments", value: 260 },
  { stage: "Shares", value: 80 },
];

const contentHealth = [
  { name: "Published", value: 25, color: "#22C55E" },
  { name: "Draft", value: 6, color: "#F59E0B" },
  { name: "Archived", value: 3, color: "#6B7280" },
];

const trafficSources = [
  { name: "Direct", value: 45, color: "#6366F1" },
  { name: "Search", value: 30, color: "#22C55E" },
  { name: "Social", value: 20, color: "#3B82F6" },
  { name: "Referral", value: 5, color: "#F59E0B" },
];

const topBlogs = [
  { title: "Mastering MERN Stack", views: 1200 },
  { title: "Clean UI Principles", views: 980 },
  { title: "Dark Mode UX", views: 760 },
];

const authorPerformance = [
  { author: "Ayush Patel", posts: 12 },
  { author: "John Doe", posts: 8 },
  { author: "Jane Smith", posts: 6 },
];

const AdminAnalytics: React.FC = () => {
  const { isDarkMode } = useTheme();

  /* ---------------- Theme Helpers ---------------- */
  const pageBg = isDarkMode
    ? "bg-gray-900 text-gray-100"
    : "bg-gray-50 text-gray-900";

  const muted = isDarkMode ? "text-gray-400" : "text-gray-600";

  const surface = isDarkMode
    ? "bg-gray-900/70 border-gray-700"
    : "bg-white border-gray-200";

  const gridStroke = isDarkMode ? "#374151" : "#E5E7EB";
  const axisStroke = isDarkMode ? "#9CA3AF" : "#4B5563";

  return (
    <div className={`min-h-screen ${pageBg}`}>
      <div className="max-w-screen mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Analytics & Insights
          </h1>
          <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
            Deep analysis of content performance and user engagement
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total Views", value: "4.2K" },
            { label: "Avg. Engagement Rate", value: "22%" },
            { label: "Top Author Posts", value: "12" },
            { label: "Active Readers", value: "36" },
          ].map((kpi) => (
            <div key={kpi.label} className={`rounded-xl border p-4 ${surface}`}>
              <p className={`text-sm ${muted}`}>{kpi.label}</p>
              <p className="text-2xl font-bold mt-1">{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Engagement Funnel */}
        <div className={`rounded-xl border p-4 ${surface}`}>
          <h3 className="font-medium mb-4">Engagement Funnel</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={engagementFunnel}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="stage" stroke={axisStroke} />
              <YAxis stroke={axisStroke} />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Content Health */}
          <div className={`rounded-xl border p-4 ${surface}`}>
            <h3 className="font-medium mb-3">Content Health</h3>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={contentHealth} dataKey="value" label>
                  {contentHealth.map((c) => (
                    <Cell key={c.name} fill={c.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Traffic Sources */}
          <div className={`rounded-xl border p-4 ${surface}`}>
            <h3 className="font-medium mb-3">Traffic Sources (%)</h3>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={trafficSources} dataKey="value" label>
                  {trafficSources.map((t) => (
                    <Cell key={t.name} fill={t.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Blogs */}
          <div className={`rounded-xl border p-4 ${surface}`}>
            <h3 className="font-medium mb-3">Top Performing Blogs</h3>
            <ul className="space-y-3 text-sm">
              {topBlogs.map((b) => (
                <li key={b.title} className="flex justify-between">
                  <span>{b.title}</span>
                  <span className="font-medium">{b.views} views</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Author Performance */}
          <div className={`rounded-xl border p-4 ${surface}`}>
            <h3 className="font-medium mb-3">Author Performance</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={authorPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis dataKey="author" stroke={axisStroke} />
                <YAxis stroke={axisStroke} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="posts"
                  stroke="#6366F1"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
