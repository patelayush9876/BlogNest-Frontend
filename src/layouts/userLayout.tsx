import { type ReactNode } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/navbar/Navbar";

interface UserLayoutProps {
  children: ReactNode;
  toggleTheme: () => void;
}

const UserLayout = ({ children }: UserLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen w-screen">
      {/* Navbar */}
      <Navbar userProfileImage="/vite.svg" />

      {/* Main content */}
      <main className="flex-1 w-full pt-16">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};


export default UserLayout;
