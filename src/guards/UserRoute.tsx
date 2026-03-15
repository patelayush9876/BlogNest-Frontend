// utils/UserRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const UserRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== 'user') {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

export default UserRoute;