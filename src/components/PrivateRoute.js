import React from "react";
import { Navigate } from "react-router-dom";
import UserService from "../keycloak";

const PrivateRoute = ({ children, roles }) => {
  const isAuthenticated = UserService.isLoggedIn();
  const hasRequiredRole = roles ? UserService.hasRole(roles) : true;

  return isAuthenticated && hasRequiredRole ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
