import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // Fetch the authToken directly from localStorage
  const token = localStorage.getItem('authToken');

  // If no user is authenticated or if the token is missing, redirect to the login page
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If authenticated and token exists, render the protected route components
  return <>{children}</>;
};

export default PrivateRoute;
