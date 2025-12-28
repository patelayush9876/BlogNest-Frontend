import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/navbar/Navbar";
import { useEffect, useState } from "react";
import type { IUserProfile } from "../interfaces/userProfileInterface";
import { getMyProfile } from "../services/profile.service";
import { useAuth } from "../contexts/AuthContext";

interface UserLayoutProps {
  toggleTheme?: () => void; // optional for now
}

const UserLayout: React.FC<UserLayoutProps> = () => {
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { logoutUser } = useAuth();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile();
        setProfile(data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      {/* Navbar */}
      <Navbar
        userProfileImage={profile?.profilePic || ""}
        userName={profile?.user?.name as any}
        onLogout={logoutUser}
      />

      {/* Main content */}
      <main className="flex-1 w-full pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UserLayout;
