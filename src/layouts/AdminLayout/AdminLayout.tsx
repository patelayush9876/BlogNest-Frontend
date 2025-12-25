import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import type { IUserProfile } from "../../interfaces/userProfileInterface";
import { getMyProfile } from "../../services/profile.service";
import { useAuth } from "../../contexts/AuthContext";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useTheme } from "../../contexts/ThemeContext";

const AdminLayout: React.FC = () => {
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { logoutUser } = useAuth();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile();
        setProfile(data);
        // simple guard
        if (!data?.user?.role || data.user.role !== "admin") {
          navigate("/", { replace: true });
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen w-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <Sidebar
        profile={profile}
        onLogout={logoutUser}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div className="flex-1 flex flex-col">
        <Topbar
          profile={profile}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          onLogout={logoutUser}
        />
        <main className="flex-1 p-6 pt-14">
          <Outlet />
        </main>

        <footer className={`px-6 py-4 border-t ${isDarkMode ? "border-gray-700 bg-gray-800 text-gray-400" : "border-gray-100 bg-white text-gray-600"} text-sm`}>
          © {new Date().getFullYear()} BlogNest — Admin
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
