import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

import ContentLayout from "./layouts/ContentLayout"; // main content
import Explore from "./pages/user/Explore";
import UserProfile from "./pages/user/UserProfile";
import UserLayout from "./layouts/userLayout";

function App() {
  const toggleTheme = () => {
    const current = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", current === "dark" ? "light" : "dark");
  };

  return (
    <Router>
      <Routes>
        {/* Home / Main Feed */}
        <Route
          path="/"
          element={
            <UserLayout toggleTheme={toggleTheme}>
              <ContentLayout />
            </UserLayout>
          }
        />

        {/* Explore Page */}
        <Route
          path="/explore"
          element={
            <UserLayout toggleTheme={toggleTheme}>
              <Explore />
            </UserLayout>
          }
        />

        {/* Profile Page */}
        <Route
          path="/profile"
          element={
            <UserLayout toggleTheme={toggleTheme}>
              <UserProfile />
            </UserLayout>
          }
        />

        {/* Redirect unknown paths to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
