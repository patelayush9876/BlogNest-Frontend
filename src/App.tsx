import { Suspense, type ComponentType } from "react";
import { BrowserRouter, useRoutes, Navigate } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import LoadingSpinner from "./components/ common/ loadingSpinner";
import LoginPage from "./pages/Auth/LoginPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import CreateNewPasswordPage from "./pages/Auth/CreateNewPasswordPage";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import UserLayout from "./layouts/userLayout";
import SettingsPage from "./pages/user/settings/SettingsPage";
import UserProfile from "./pages/user/UserProfile";
import ContentLayout from "./layouts/ContentLayout";
import PostEditor from "./pages/user/PostEditor";
import SignupPage from "./pages/Auth/SignupPage";
import PublicUserProfile from "./pages/user/PublicUserProfile";
import AboutPage from "./pages/user/About";
import CommunityPage from "./pages/CommunityPage";
import LegalPage from "./pages/LegalPage";
import ResourcesPage from "./pages/ResourcesPage";
import Terms from "./pages/Legal/Terms";
import Privacy from "./pages/Legal/Privacy";
import CookiePolicy from "./pages/Legal/Cookies";
import ContentOwnership from "./pages/Legal/ContentOwnership";
import WritingTips from "./pages/Resources/WritingTips";
import PublishingGuide from "./pages/Resources/PublishingGuide";
import Help from "./pages/Resources/Help";
import FAQ from "./pages/Resources/FAQ";
import WriterGuidelines from "./pages/Community/WriterGuidelines";
import ReportIssue from "./pages/Community/ReportIssue";
import CommunityStandards from "./pages/Community/CommunityStandards";
import BecomeContributor from "./pages/Community/BecomeContributor";

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
        { path: "signup", element: lazyLoad(SignupPage) },
        { path: "forgot-password", element: lazyLoad(ForgotPasswordPage) },
        { path: "create-password", element: lazyLoad(CreateNewPasswordPage) },
      ],
    },
    {
      path: "/user",
      element: <UserLayout />,
      children: [
        { path: "", element: lazyLoad(ContentLayout) },
        { path: "settings", element: lazyLoad(SettingsPage) },
        { path: "profile", element: lazyLoad(UserProfile) },
        { path: "userProfile/:authorId", element: lazyLoad(PublicUserProfile) },
        { path: "blogs/new", element: lazyLoad(PostEditor) }, // Create new blog
        { path: "blogs/:id/edit", element: lazyLoad(PostEditor) }, // Edit published blog
        { path: "drafts/:id/edit", element: lazyLoad(PostEditor) }, // Edit draft
        { path: "about", element: lazyLoad(AboutPage) },
        { path: "community", element: lazyLoad(CommunityPage) },
        { path: "legal", element: lazyLoad(LegalPage) },
        { path: "resources", element: lazyLoad(ResourcesPage) },
        { path: "becomeContributer", element: lazyLoad(BecomeContributor) },
        { path: "communityStandards", element: lazyLoad(CommunityStandards) },
        { path: "reportAnIssue", element: lazyLoad(ReportIssue) },
        { path: "writerGuidelines", element: lazyLoad(WriterGuidelines) },
        { path: "faq", element: lazyLoad(FAQ) },
        { path: "help", element: lazyLoad(Help) },
        { path: "publishingGuide", element: lazyLoad(PublishingGuide) },
        { path: "writingTips", element: lazyLoad(WritingTips) },
        { path: "contentOwnership", element: lazyLoad(ContentOwnership) },
        { path: "cookies", element: lazyLoad(CookiePolicy) },
        { path: "privacy", element: lazyLoad(Privacy) },
        { path: "terms", element: lazyLoad(Terms) },

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
