import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PublicRoute = () => {
  const { user } = useAuth();

  if (user) {
    return user.role === 'admin'
      ? <Navigate to="/admin" replace />
      : <Navigate to="/user" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;