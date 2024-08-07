import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, roles, requiredRoles, useMatchRoles }) => {
  // Ensure useMatchRoles is a function
  if (typeof useMatchRoles !== 'function') {
    throw new Error('useMatchRoles should be a function');
  }

  // Initialize the matchRoles function using useMatchRoles
  const matchRoles = useMatchRoles(roles);

  // Check if the user has at least one of the required roles
  const hasRequiredRoles = matchRoles(requiredRoles);

  console.log("Has required roles:", hasRequiredRoles);

  // If the user has the required roles, render the element; otherwise, redirect to a different page
  return hasRequiredRoles ? element : <Navigate to="/not-authorized" />;
};

export default PrivateRoute;
