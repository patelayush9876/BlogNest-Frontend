import { Suspense, type ComponentType } from 'react';
import { BrowserRouter, useRoutes, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import LoadingSpinner from './components/ common/ loadingSpinner';
import LoginPage from './pages/Auth/LoginPage';
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import UserLayout from './layouts/userLayout';
import SettingsPage from './pages/user/settings/SettingsPage';
import UserProfile from './pages/user/UserProfile';
import ContentLayout from './layouts/ContentLayout';
import PostEditor from './pages/user/PostEditor';
import SignupPage from './pages/Auth/SignupPage';
import PublicUserProfile from './pages/user/PublicUserProfile';
import AboutPage from './pages/user/About';
import CommunityPage from './pages/CommunityPage';
import LegalPage from './pages/LegalPage';
import ResourcesPage from './pages/ResourcesPage';
import Terms from './pages/Legal/Terms';
import Privacy from './pages/Legal/Privacy';
import CookiePolicy from './pages/Legal/Cookies';
import ContentOwnership from './pages/Legal/ContentOwnership';
import WritingTips from './pages/Resources/WritingTips';
import PublishingGuide from './pages/Resources/PublishingGuide';
import Help from './pages/Resources/Help';
import FAQ from './pages/Resources/FAQ';
import WriterGuidelines from './pages/Community/WriterGuidelines';
import ReportIssue from './pages/Community/ReportIssue';
import CommunityStandards from './pages/Community/CommunityStandards';
import BecomeContributor from './pages/Community/BecomeContributor';
import AdminLayout from './layouts/AdminLayout/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminPosts from './pages/admin/Posts';
import AdminUsers from './pages/admin/Users';
import AdminAnalytics from './pages/admin/Analytics';
import AdminSettingsPage from './pages/admin/settings/SettingsPage';
import VerifyEmailPage from './pages/Auth/VerifyEmailPage';
import OnboardingLayout from './layouts/OnboardingLayout/OnboardingLayout';
import Welcome from './pages/Auth/Welcome';
import VerifyOtpPage from './pages/Auth/VerifyOtpPage';
import CreateNewPasswordPage from './pages/Auth/CreateNewPasswordPage';
import BlogDetailsPage from './pages/user/BlogDetailsPage';
import ScrollToTop from './utils/ScrollToTop';
import PublicRoute from './guards/PublicRoute';
import AdminRoute from './guards/AdminRoute';
import UserRoute from './guards/UserRoute';

const lazyLoad = (Component: ComponentType) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
);

function AppRoutes() {
  const routes = useRoutes([
    {
      path: '/',
      element: <PublicRoute />,
      children: [
        {
          element: <AuthLayout />,
          children: [
            { path: '', element: lazyLoad(LoginPage) },
            { path: 'signup', element: lazyLoad(SignupPage) },
            { path: 'verify-email', element: lazyLoad(VerifyEmailPage) },
            { path: 'verify-otp', element: lazyLoad(VerifyOtpPage) },
            { path: 'forgot-password', element: lazyLoad(ForgotPasswordPage) },
            { path: 'create-password', element: lazyLoad(CreateNewPasswordPage) },
          ],
        },
      ],
    },

    {
      path: '/onboard',
      element: <UserRoute />,
      children: [
        {
          element: <OnboardingLayout />,
          children: [{ path: 'welcome', element: lazyLoad(Welcome) }],
        },
      ],
    },

    {
      path: '/admin',
      element: <AdminRoute />,
      children: [
        {
          element: <AdminLayout />,
          children: [
            { path: '', element: lazyLoad(AdminDashboard) },
            { path: 'posts', element: lazyLoad(AdminPosts) },
            { path: 'posts/new', element: lazyLoad(PostEditor) },
            { path: 'users', element: lazyLoad(AdminUsers) },
            { path: 'userProfile/:authorId', element: lazyLoad(PublicUserProfile) },
            { path: 'analytics', element: lazyLoad(AdminAnalytics) },
            { path: 'settings', element: lazyLoad(AdminSettingsPage) },
          ],
        },
      ],
    },

    {
      path: '/user',
      element: <UserRoute />,
      children: [
        {
          element: <UserLayout />,
          children: [
            { path: '', element: lazyLoad(ContentLayout) },
            { path: 'settings', element: lazyLoad(SettingsPage) },
            { path: 'profile', element: lazyLoad(UserProfile) },
            { path: 'userProfile/:authorId', element: lazyLoad(PublicUserProfile) },
            { path: 'blogs/new', element: lazyLoad(PostEditor) },
            { path: 'blogs/:id', element: lazyLoad(BlogDetailsPage) },
            { path: 'blogs/:id/edit', element: lazyLoad(PostEditor) },
            { path: 'drafts/:id/edit', element: lazyLoad(PostEditor) },
            { path: 'about', element: lazyLoad(AboutPage) },
            { path: 'community', element: lazyLoad(CommunityPage) },
            { path: 'legal', element: lazyLoad(LegalPage) },
            { path: 'resources', element: lazyLoad(ResourcesPage) },
            { path: 'becomeContributer', element: lazyLoad(BecomeContributor) },
            { path: 'communityStandards', element: lazyLoad(CommunityStandards) },
            { path: 'reportAnIssue', element: lazyLoad(ReportIssue) },
            { path: 'writerGuidelines', element: lazyLoad(WriterGuidelines) },
            { path: 'faq', element: lazyLoad(FAQ) },
            { path: 'help', element: lazyLoad(Help) },
            { path: 'publishingGuide', element: lazyLoad(PublishingGuide) },
            { path: 'writingTips', element: lazyLoad(WritingTips) },
            { path: 'contentOwnership', element: lazyLoad(ContentOwnership) },
            { path: 'cookies', element: lazyLoad(CookiePolicy) },
            { path: 'privacy', element: lazyLoad(Privacy) },
            { path: 'terms', element: lazyLoad(Terms) },
          ],
        },
      ],
    },

    { path: '*', element: <Navigate to="/" replace /> },
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
        <ScrollToTop />
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
