// src/App.js

import React, { useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import { httpClient } from './hocs/HttpClient';
import Page1 from './components/Page1/page1';
import Page2 from './components/Page2/page2';
import Dashboard from './components/Dashboard';
import PrivateRoute from './hocs/PrivateRoute';

function App() {
  const { isAuthenticated, token, keycloak, roles, loading } = useAuth();

  // Hook to match roles
  const useMatchRoles = useCallback(
    (rolesToMatch) => rolesToMatch.some((role) => roles.includes(role)),
    [roles]
  );

  useEffect(() => {
    if (token && keycloak) {
      httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log('Keycloak:', keycloak);
    }
    console.log('User Roles:', roles);
  }, [token, keycloak, roles]);

  const userPermissions = ['1', '2']; // Example roles to test
  const requiredPermissions = ['1'];

  const isAuthorized = (userPerms, requiredPerms) => {
    console.log('User Permissions:', userPerms);
    console.log('Required Permissions:', requiredPerms);

    // Check if at least one of the required permissions is included in user permissions
    const match = requiredPerms.some((permission) => userPerms.includes(permission));

    console.log('Match:', match);
    return match;
  };

  // Return a loading screen until roles are loaded
  if (loading) {
    return <div>Loading...</div>; // Replace with a loading spinner or skeleton screen
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />

        {/* Using PrivateRoute to protect a route with roles */}
        <Route
          path="/protected"
          element={
            isAuthorized(roles, requiredPermissions) ? (
              <Page2 />
            ) : (
              <Navigate to="/not-authorized" />
            )
          }
        />

        {/* Another way to use PrivateRoute */}
        <Route
          path="/myhasrole"
          element={
            <PrivateRoute
              element={<div>Hello, Authorized User!</div>}
              roles={roles}
              requiredRoles={['1', '2']}
            />
          }
        />

        {/* Example of token-based authorization */}
        <Route
          path="/role"
          element={
            keycloak?.tokenParsed?.realm_access?.roles ? (
              <div>hello</div>
            ) : (
              <div>not found</div>
            )
          }
        />

        {/* Not Authorized Route */}
        <Route
          path="/not-authorized"
          element={<div>You do not have permission to view this page</div>}
        />

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
