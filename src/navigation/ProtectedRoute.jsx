import React from 'react';
import {Navigate, Outlet} from 'react-router';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({requiredRole,children}) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.role);

  if (!isAuthenticated || (requiredRole !== userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;