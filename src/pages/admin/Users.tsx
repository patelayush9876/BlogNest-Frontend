import React, { useEffect, useMemo, useState } from "react";
import {
  getAllUsers,
  changeUserStatus,
  deleteUser,
} from "../../services/user.service";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";

interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  status: "active" | "inactive" | "banned";
  createdAt?: string;
}

const AdminUsers: React.FC = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive" | "banned"
  >("all");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [totalUsers, setTotalUsers] = useState(0);
  const debouncedSearchHandler = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value);
        setCurrentPage(1);
      }, 400),
    []
  );

  useEffect(() => {
    debouncedSearchHandler(searchTerm);
    return () => debouncedSearchHandler.cancel();
  }, [searchTerm, debouncedSearchHandler]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await getAllUsers({
          page: currentPage,
          limit: itemsPerPage,
          search: debouncedSearch || undefined,
          status: statusFilter === "all" ? undefined : statusFilter,
        });

        setUsers(response.data.users);
        setTotalUsers(response.data.total);
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, debouncedSearch, statusFilter]);

  /* -------- Close dropdown on outside click -------- */
  useEffect(() => {
    const close = () => setOpenDropdown(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const totalPages = Math.ceil(totalUsers / itemsPerPage);

  const handleChangeStatus = async (
    id: string,
    newStatus: "active" | "inactive" | "banned"
  ) => {
    try {
      await changeUserStatus(id, newStatus);
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, status: newStatus } : u))
      );
    } catch (err) {
      console.error("Failed to change status", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  return (
  <div
    className={`min-h-auto transition-colors duration-300 ${
      isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
    }`}
  >
    <div className="container pb-16">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          User Management
        </h1>
        <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
          Manage users and account status
        </p>
      </div>

      {/* Card */}
      <div
        className={`rounded-xl shadow-sm border ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-3 p-4">
          <input
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full md:w-64 px-3 py-2 text-sm rounded-lg border transition ${
              isDarkMode
                ? "bg-gray-900 border-gray-700 text-gray-200"
                : "bg-gray-100 border-gray-300 text-gray-800 focus:bg-white focus:border-gray-400"
            }`}
          />

          <select
            aria-label="status"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as any);
              setCurrentPage(1);
            }}
            className={`px-3 py-2 text-sm rounded-lg border transition ${
              isDarkMode
                ? "bg-gray-900 border-gray-700 text-gray-200"
                : "bg-gray-100 border-gray-300 text-gray-800 focus:bg-white focus:border-gray-400"
            }`}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="banned">Banned</option>
          </select>
        </div>

        {/* Table */}
        {loading ? (
          <div className="p-4 text-sm text-gray-500">Loading users…</div>
        ) : (
          <table className="w-full text-sm">
            <thead
              className={
                isDarkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-100 text-gray-700 border-b border-gray-200"
              }
            >
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-center">Role</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className={
                    isDarkMode
                      ? "border-t border-gray-700 hover:bg-gray-700/40"
                      : "border-t border-gray-200 hover:bg-gray-100"
                  }
                >
                  <td className="px-4 py-3 font-medium">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3 text-center capitalize">
                    {user.role}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3 text-center relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdown(
                          openDropdown === user._id ? null : user._id
                        );
                      }}
                      className={`w-24 px-3 py-1 rounded-lg text-xs font-medium capitalize border ${
                        user.status === "active"
                          ? isDarkMode
                            ? "bg-green-900/40 text-green-300 border-transparent"
                            : "bg-green-50 text-green-700 border-green-200"
                          : user.status === "inactive"
                          ? isDarkMode
                            ? "bg-yellow-900/40 text-yellow-300 border-transparent"
                            : "bg-yellow-50 text-yellow-700 border-yellow-200"
                          : isDarkMode
                          ? "bg-red-900/40 text-red-300 border-transparent"
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {user.status}
                    </button>

                    {openDropdown === user._id && user.role != 'admin' && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className={`absolute z-50 mt-1 w-24 rounded-lg border shadow-lg ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-700"
                            : "bg-white border-gray-200"
                        }`}
                      >
                        {["active", "inactive", "banned"].map((status) => (
                          <button
                            key={status}
                            onClick={() => {
                              handleChangeStatus(user._id, status as any);
                              setOpenDropdown(null);
                            }}
                            className={`block w-full px-3 py-2 text-left text-xs capitalize transition ${
                              isDarkMode
                                ? "hover:bg-gray-700 text-gray-200"
                                : "hover:bg-gray-100 text-gray-800"
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/userProfile/${user._id}`)
                      }
                      className={`px-3 py-1 text-xs rounded-lg transition ${
                        isDarkMode
                          ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                      }`}
                    >
                      View
                    </button>

                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleDelete(user._id)}
                        className={`px-3 py-1 text-xs rounded-lg transition ${
                          isDarkMode
                            ? "bg-red-900/40 text-red-300 hover:bg-red-900/60"
                            : "bg-red-100 text-red-600 hover:bg-red-200"
                        }`}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between px-4 py-3 border-t text-xs">
            <span className="text-gray-500">
              Page {currentPage} of {totalPages}
            </span>

            <div className="space-x-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className={`px-3 py-1 rounded transition disabled:opacity-50 ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }`}
              >
                Prev
              </button>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className={`px-3 py-1 rounded transition disabled:opacity-50 ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

};

export default AdminUsers;
