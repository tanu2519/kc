// // src/App.js

// import React, { useEffect, useCallback } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
// import useAuth from './hooks/useAuth';
// import { httpClient } from './hocs/HttpClient';
// import Page1 from './components/Page1/page1';
// import Page2 from './components/Page2/page2';
// import Dashboard from './components/Dashboard';
// //import PrivateRoute from './hocs/ProtectedRoute';
// import withAuthorization from './hocs/withAuthorization';
// import ProtectedRoute from './hocs/ProtectedRoute';

// function App() {
//   const { isAuthenticated, token, keycloak, roles, loading } = useAuth();

//   // Hook to match roles
//   const useMatchRoles = useCallback(
//     (rolesToMatch) => rolesToMatch.some((role) => roles.includes(role)),
//     [roles]
//   );

//   //   useEffect(() => {
//   //     if (token && keycloak) {
//   //       httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   //       console.log('Keycloak:', keycloak);
//   //     }
//   //     console.log('User Roles:', roles);
//   //   }, [token, keycloak, roles]);

//   const userPermissions = ['1', '2']; // Example roles to test
//   const requiredPermissions = ['1'];

//   //   const isAuthorized = (userPerms, requiredPerms) => {
//   //     console.log('User Permissions:', userPerms);
//   //     console.log('Required Permissions:', requiredPerms);

//   //     // Check if at least one of the required permissions is included in user permissions
//   //     const match = requiredPerms.some((permission) => userPerms.includes(permission));

//   //     console.log('Match:', match);
//   //     return match;
//   //   };

//   const ProtectedPage2 = withAuthorization(Page1, requiredPermissions);

//   // Return a loading screen until roles are loaded
  

//   return (
//     <>
//       <header className="bg-blue-600 text-white py-4 shadow-md flex justify-between items-center px-4">
// 				<div className="container mx-auto px-4 flex justify-between items-center">
// 					<h1 className="text-2xl font-bold">NHAI keycloak - RBAC POC</h1>
// 				</div>
// 				<nav>
// 					<ul className="flex flex-nowrap justify-between mx-3 items-center">
// 						<li className="px-2 text-nowrap text-gray-300 font-semibold hover:text-white hover:font-bold">
// 							<Link to="/">Home</Link>
// 						</li>
// 						<li className="px-2 text-nowrap text-gray-300 font-semibold hover:text-white hover:font-bold">
// 							<Link to="/sys-admin">Sys-Admin</Link>
// 						</li>
// 					</ul>
// 				</nav>
// 			</header>
//     <Router>
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/page1" element={<Page1 />} />
//         <Route path="/page2" element={<Page2 />} />

//         {/* Using PrivateRoute to protect a route with roles */}
//         {/* <Route
//           path="/protected"
//           element={
//             isAuthorized(roles, requiredPermissions) ? (
//               <Page2 />
//             ) : (
//               <Navigate to="/not-authorized" />
//             )
//           }
//         /> */}
//         <Route path="/protected" element={<ProtectedPage2 roles={roles} />} />
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute
//               element={Page1}
//               requiredPerms={["1", "manager"]}
//             />
//           }
//         />
        
//         <Route
//           path="/sys-admin"
//           element={
//             <ProtectedRoute
//               element={Page1}
//               requiredPerms={["admin"]}
//             />
//           }
//         />

//         {/* Example of if any RBA */}
//         <Route path="/role" element={keycloak?.tokenParsed?.realm_access?.roles ? (<div>hello</div>) : (<div>not found</div>)} />

//         {/* Not Authorized Route */}
//         <Route path="/not-authorized" element={<div>You do not have permission to view this page</div>} />

//         {/* Catch-all for undefined routes */}
//         <Route path="*" element={<div>Page not found</div>} />
//       </Routes>
//     </Router>
//     </>
//   );
// }

// export default App;


// src/App.js

// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import Page1 from './components/Page1/page1';
import Page2 from './components/Page2/page2';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './hocs/ProtectedRoute';
import withAuthorization from './hocs/withAuthorization';

function App() {
  const { isAuthenticated, token, keycloak, roles } = useAuth();

  // Example role management function
  const useMatchRoles = (rolesToMatch) =>
    rolesToMatch.some((role) => roles.includes(role));

  const userPermissions = ['1', '2']; // Example roles to test
  const requiredPermissions = ['1'];

  // Wrapped component with authorization logic
  const ProtectedPage2 = withAuthorization(Page2, requiredPermissions);

  return (
    <Router>  {/* Ensure that the Router wraps your entire application */}
      <header className="bg-[#ae4141] text-white py-4 shadow-md flex justify-between items-center px-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Dashboard</h1>
        </div>
        <nav>
          <ul className="flex flex-nowrap justify-between mx-3 items-center">
            <li className="px-2 text-nowrap text-gray-300 font-semibold hover:text-white hover:font-bold">
              <Link to="/">Home</Link>
            </li>
            <li className="px-2 text-nowrap text-gray-300 font-semibold hover:text-white hover:font-bold">
              <Link to="/page1">Page 1</Link>
            </li>
            <li className="px-2 text-nowrap text-gray-300 font-semibold hover:text-white hover:font-bold">
              <Link to="/page2">Page 2</Link>
            </li>
            <li className="px-2 text-nowrap text-gray-300 font-semibold hover:text-white hover:font-bold">
              <Link to="/protected">Protected</Link>
            </li>
            <li className="px-2 text-nowrap text-gray-300 font-semibold hover:text-white hover:font-bold">
              <Link to="/admin">Admin</Link>
            </li>
            <li className="px-2 text-nowrap text-gray-300 font-semibold hover:text-white hover:font-bold">
              <Link to="/sys-admin">Pro Developer Tanya</Link>
            </li>
            <li className="px-2 text-nowrap text-gray-300 font-semibold hover:text-white hover:font-bold">
              <Link to="/role">Role</Link>
            </li>
          </ul>
        </nav>
      </header>

      <Routes>  {/* Make sure you're using the Routes component */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<ProtectedPage2 />} />  {/* Ensure protected routes are set correctly */}

        <Route
          path="/protected"
          element={
            <ProtectedRoute
              element={Page1}
              requiredPerms={requiredPermissions}
            />
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              element={Page1}
              requiredPerms={["1", "manager"]}
            />
          }
        />

        <Route
          path="/sys-admin"
          element={
            <ProtectedRoute
              element={Page2}
              requiredPerms={["admin"]}
            />
          }
        />

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

        <Route
          path="/not-authorized"
          element={<div>You do not have permission to view this page</div>}
        />

        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
