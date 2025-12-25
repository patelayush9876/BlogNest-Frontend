import React from "react";
import { Link } from "react-router-dom";

const AdminPosts: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Posts Management</h1>
        <Link to="/admin/posts/new" className="px-3 py-2 rounded bg-indigo-600 text-white text-sm">Create Post</Link>
      </div>

      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow">
        <table className="min-w-full divide-y">
          <thead>
            <tr className="text-left">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* map posts here */}
            <tr>
              <td className="px-4 py-3">Example Post Title</td>
              <td className="px-4 py-3">John Doe</td>
              <td className="px-4 py-3">Published</td>
              <td className="px-4 py-3">
                <button className="mr-2 text-sm underline">Edit</button>
                <button className="text-sm text-red-600">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPosts;
