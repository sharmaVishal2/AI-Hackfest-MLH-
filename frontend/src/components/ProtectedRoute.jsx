import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <LoadingSpinner label="Checking your session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
