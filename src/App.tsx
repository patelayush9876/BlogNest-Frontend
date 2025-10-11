import  { Suspense, type ComponentType } from "react";
import { BrowserRouter, useRoutes, Navigate } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import LoadingSpinner from "./components/ common/ loadingSpinner";
import LoginPage from "./pages/Auth/LoginPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import CreateNewPasswordPage from "./pages/Auth/CreateNewPasswordPage";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import UserLayout from "./layouts/userLayout";
import SettingsPage from "./pages/user/SettingsPage";
import UserProfile from "./pages/user/UserProfile";
import ContentLayout from "./layouts/ContentLayout";
import PostEditor from "./pages/user/PostEditor";


const lazyLoad = (Component: ComponentType) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
);

function AppRoutes() {
  const routes = useRoutes([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { path: "", element: lazyLoad(LoginPage) },
        { path: "forgot-password", element: lazyLoad(ForgotPasswordPage) },
        { path: "create-password", element: lazyLoad(CreateNewPasswordPage) },
      ],
    },
    {
      path: "/user",
      element: <UserLayout/>,
      children: [
        { path: "", element: lazyLoad(ContentLayout) },
        { path: "settings", element: lazyLoad(SettingsPage) },
        { path: "profile", element: lazyLoad(UserProfile) },
        { path: "create", element: lazyLoad(PostEditor) },
        // You can later add more routes like:
        // { path: "profile", element: lazyLoad(UserProfilePage) },
      ],
    
    },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);

  return routes;
}

function App() {
  return <AppRoutes />;
}

export default function WrappedApp() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthProvider>
    </BrowserRouter>
  );
}
