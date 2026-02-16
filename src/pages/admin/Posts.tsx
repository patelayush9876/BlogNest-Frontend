import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

interface IPost {
  _id: string;
  title: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  createdAt?: string;
}

const AdminPosts: React.FC = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const [posts, setPosts] = useState<IPost[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | IPost['status']>('all');

  /* ---------------- Theme Helpers ---------------- */
  const pageBg = isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900';

  const cardBg = isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';

  const muted = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  /* ---------------- Mock Data (replace with API) ---------------- */
  useEffect(() => {
    setPosts([
      {
        _id: '1',
        title: 'Getting Started with MERN Stack',
        author: 'Ayush Patel',
        status: 'published',
        createdAt: '2025-01-10',
      },
      {
        _id: '2',
        title: 'Why Clean UI Matters',
        author: 'John Doe',
        status: 'draft',
        createdAt: '2025-01-12',
      },
      {
        _id: '3',
        title: 'Dark Mode UX Best Practices',
        author: 'Jane Smith',
        status: 'archived',
        createdAt: '2025-01-15',
      },
    ]);
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.author.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' ? true : post.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className={`min-h-auto ${pageBg}`}>
      <div className="container   space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Post Management</h1>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Manage posts and post status
            </p>
          </div>

          <Link
            to="/admin/posts/new"
            className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Create Post
          </Link>
        </div>

        {/* Posts Table */}
        <div className={`rounded-xl border shadow-sm ${cardBg}`}>
          {/* Filters */}
          <div className={`rounded-t-xl p-4 ${cardBg}`}>
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                placeholder="Search by title or author"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full md:w-64 px-3 py-2 text-sm rounded-lg border transition ${
                  isDarkMode
                    ? 'bg-gray-900 border-gray-700 text-gray-200'
                    : 'bg-gray-100 border-gray-300 text-gray-800 focus:bg-white'
                }`}
              />

              <select
                aria-label="filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className={`px-3 py-2 text-sm rounded-lg border transition ${
                  isDarkMode
                    ? 'bg-gray-900 border-gray-700 text-gray-200'
                    : 'bg-gray-100 border-gray-300 text-gray-800'
                }`}
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
          <table className="w-full text-sm">
            <thead
              className={
                isDarkMode
                  ? 'bg-gray-700 text-gray-300'
                  : 'bg-gray-100 text-gray-700 border-b border-gray-200'
              }
            >
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Author</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredPosts.map((post) => (
                <tr
                  key={post._id}
                  className={
                    isDarkMode
                      ? 'border-t border-gray-700 hover:bg-gray-700/40'
                      : 'border-t border-gray-200 hover:bg-gray-100'
                  }
                >
                  <td className="px-4 py-3 font-medium">{post.title}</td>
                  <td className="px-4 py-3">{post.author}</td>

                  <td className="px-4 py-3 text-center capitalize">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        post.status === 'published'
                          ? isDarkMode
                            ? 'bg-green-900/40 text-green-300'
                            : 'bg-green-100 text-green-700'
                          : post.status === 'draft'
                            ? isDarkMode
                              ? 'bg-yellow-900/40 text-yellow-300'
                              : 'bg-yellow-100 text-yellow-700'
                            : isDarkMode
                              ? 'bg-gray-700 text-gray-300'
                              : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right space-x-3">
                    <button
                      onClick={() => navigate(`/admin/posts/edit/${post._id}`)}
                      className="text-indigo-600 text-xs font-medium hover:underline"
                    >
                      Edit
                    </button>

                    <button className="text-red-600 text-xs font-medium hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredPosts.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                    No posts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPosts;
