import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/navbar/Navbar";
import { useEffect, useState } from "react";
import type { IUserProfile } from "../interfaces/userProfileInterface";
import { getMyProfile } from "../services/profileService";
import { useAuth } from "../contexts/AuthContext";


interface UserLayoutProps {
  toggleTheme?: () => void; // optional for now
}

const UserLayout: React.FC<UserLayoutProps> = () => {
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  console.log("profile", profile)
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
    return <div>Loading...</div>; // You can replace this with a spinner
  }


  return (
    <div className="flex flex-col min-h-screen w-screen">
      {/* Navbar */}
      <Navbar userProfileImage={profile?.profilePic || "/vite.svg"} userName={profile?.user?.name as any} onLogout={logoutUser} />

      {/* Main content */}
      <main className="flex-1 w-full pt-16">
        <Outlet /> {/* renders nested route content */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UserLayout;
