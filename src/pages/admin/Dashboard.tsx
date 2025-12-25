import React from "react";

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg p-4 shadow bg-white dark:bg-gray-800 border dark:border-gray-700">
          <h3 className="text-sm text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold">1,234</p>
        </div>

        <div className="rounded-lg p-4 shadow bg-white dark:bg-gray-800 border dark:border-gray-700">
          <h3 className="text-sm text-gray-500">Published Posts</h3>
          <p className="text-2xl font-bold">567</p>
        </div>

        <div className="rounded-lg p-4 shadow bg-white dark:bg-gray-800 border dark:border-gray-700">
          <h3 className="text-sm text-gray-500">Drafts</h3>
          <p className="text-2xl font-bold">42</p>
        </div>
      </div>

      <section className="rounded-lg p-4 shadow bg-white dark:bg-gray-800 border dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">Recent Activity</h2>
        <p className="text-sm text-gray-500 mt-2">Placeholder for recent signups, posts, moderation logs, etc.</p>
      </section>
    </div>
  );
};

export default AdminDashboard;
