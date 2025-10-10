import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/navbar/Navbar";

interface UserLayoutProps {
  toggleTheme?: () => void; // optional for now
}

const UserLayout: React.FC<UserLayoutProps> = () => {
  return (
    <div className="flex flex-col min-h-screen w-screen">
      {/* Navbar */}
      <Navbar userProfileImage="/vite.svg" />

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
