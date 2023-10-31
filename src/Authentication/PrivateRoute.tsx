import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isAuthenticated,
  authenticationPath,
  children
}) => {
  let navigate = useNavigate();
  let location = useLocation();

  if (!isAuthenticated) {
    navigate(authenticationPath, { state: { from: location } });
    return null; 
  }

  return <>{children}</>; 
};

export default PrivateRoute;
