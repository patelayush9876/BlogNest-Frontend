import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

/* ---------------- Blog Data ---------------- */
const blogStatus = [
  { name: 'Draft', value: 3, color: '#6366F1' },
  { name: 'Inactive', value: 1, color: '#EF4444' },
  { name: 'Published', value: 25, color: '#22C55E' },
  { name: 'Archived', value: 5, color: '#F59E0B' },
];

const interactionStatus = [
  { name: 'Views', value: 2100, color: '#3B82F6' },
  { name: 'Likes', value: 420, color: '#22C55E' },
  { name: 'Comments', value: 86, color: '#F59E0B' },
  { name: 'Shares', value: 34, color: '#A855F7' },
];

const usersData = [
  { name: 'Readers', active: 36, inactive: 0 },
  { name: 'Authors', active: 13, inactive: 2 },
  { name: 'Admins', active: 3, inactive: 0 },
];

const AdminDashboard: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [view, setView] = useState<'column' | 'graph'>('column');

  /* ---------------- Theme Helpers ---------------- */
  const pageBg = isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900';

  const muted = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  const surfaceSoft = isDarkMode ? 'bg-gray-800/60 border-gray-700' : 'bg-white border-gray-200';

  const surfaceStrong = isDarkMode ? 'bg-gray-900/70 border-gray-700' : 'bg-white border-gray-200';

  /* pastel cards */
  const cardBase = 'rounded-xl border p-4 transition';

  const cardColors = isDarkMode
    ? [
        'bg-indigo-900/30 border-indigo-800',
        'bg-emerald-900/30 border-emerald-800',
        'bg-purple-900/30 border-purple-800',
        'bg-orange-900/30 border-orange-800',
        'bg-blue-900/30 border-blue-800',
      ]
    : [
        'bg-indigo-50 border-indigo-200',
        'bg-emerald-50 border-emerald-200',
        'bg-purple-50 border-purple-200',
        'bg-orange-50 border-orange-200',
        'bg-blue-50 border-blue-200',
      ];

  return (
    <div className={`min-h-auto  ${pageBg}`}>
      <div className="max-w-screen  space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Welcome back!</h1>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Here's a quick overview of your blog activity.
          </p>
        </div>
        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              title: 'Total Blogs',
              value: 34,
              note: 'Published: 25 · Drafts: 3',
            },
            {
              title: 'Interactions',
              value: '2.6K',
              note: 'Likes · Comments · Shares',
            },
            { title: 'Readers', value: 36, note: 'Mostly active users' },
            { title: 'Authors', value: 15, note: 'Active: 13 · Inactive: 2' },
            { title: 'Total Users', value: 51, note: 'Across all roles' },
          ].map((c, i) => (
            <div key={c.title} className={`${cardBase} ${cardColors[i]}`}>
              <p className="text-sm font-medium">{c.title}</p>
              <p className="text-2xl font-bold mt-2">{c.value}</p>
              <p className={`text-xs mt-1 ${muted}`}>{c.note}</p>
            </div>
          ))}
        </div>

        {/* Data View Toggle */}
        <div className={`rounded-xl border p-4 ${surfaceSoft}`}>
          <h3 className="font-medium mb-1">Data View</h3>
          <p className={`text-sm mb-4 ${muted}`}>Switch between summary and visual insights</p>

          <div className="flex gap-3">
            {['column', 'graph'].map((v) => (
              <button
                key={v}
                onClick={() => setView(v as any)}
                className={`flex-1 py-2 rounded-lg border text-sm font-medium transition ${
                  view === v
                    ? 'border-blue-500 text-blue-600'
                    : isDarkMode
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-gray-100 border-gray-300'
                }`}
              >
                {v === 'column' ? 'Column View' : 'Graph View'}
              </button>
            ))}
          </div>
        </div>

        {/* ---------------- COLUMN VIEW ---------------- */}
        {view === 'column' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`rounded-xl border p-4 ${surfaceSoft}`}>
              <h4 className="font-medium mb-3">Blogs</h4>
              {blogStatus.map((b) => (
                <div key={b.name} className="flex justify-between text-sm py-2">
                  <span>{b.name}</span>
                  <span className="font-medium">{b.value}</span>
                </div>
              ))}
            </div>

            <div className={`rounded-xl border p-4 ${surfaceSoft}`}>
              <h4 className="font-medium mb-3">Engagement</h4>
              {interactionStatus.map((i) => (
                <div key={i.name} className="flex justify-between text-sm py-2">
                  <span>{i.name}</span>
                  <span className="font-medium">{i.value}</span>
                </div>
              ))}
            </div>

            <div className={`rounded-xl border p-4 ${surfaceSoft}`}>
              <h4 className="font-medium mb-3">Users</h4>
              {usersData.map((u) => (
                <div key={u.name} className="flex justify-between text-sm py-2">
                  <span>{u.name}</span>
                  <span className="font-medium text-green-500">{u.active}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- GRAPH VIEW ---------------- */}
        {view === 'graph' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`rounded-xl border p-4 ${surfaceStrong}`}>
              <h4 className="font-medium mb-3">Blog Status</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={blogStatus}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={isDarkMode ? '#374151' : '#E5E7EB'}
                  />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value">
                    {blogStatus.map((b) => (
                      <Cell key={b.name} fill={b.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className={`rounded-xl border p-4 ${surfaceStrong}`}>
              <h4 className="font-medium mb-3">Engagement Distribution</h4>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={interactionStatus} dataKey="value" label>
                    {interactionStatus.map((i) => (
                      <Cell key={i.name} fill={i.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
