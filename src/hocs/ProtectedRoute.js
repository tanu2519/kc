// // ProtectedRoute.js

// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

// const ProtectedRoute = ({ element: Component, requiredPerms, ...rest }) => {
//   const {
//     initKeycloak,
//     isAuthenticated,
//     loading,
//     roles,
//     login,
//   } = useAuth();

//   const [initDone, setInitDone] = useState(false);

//   useEffect(() => {
//     console.log("ProtectedRoute mounted.");
//     if (!initDone) {
//       initKeycloak().finally(() => setInitDone(true));
//     }
//   }, [initDone, initKeycloak]);

//   if (loading || !initDone) {
//     return <div>Loading...</div>; // Render a loading state or spinner
//   }

//   if (!isAuthenticated) {
//     login(); // Redirect to Keycloak login if not authenticated
//     return <div>Redirecting...</div>; // Optionally show a redirecting message
//   }

//   const isAuthorized = requiredPerms.some((permission) => roles.includes(permission));

//   if (!isAuthorized) {
//     return <Navigate to="/not-authorized" />;
//   }

//   return <Component {...rest} />;
// };

// export default ProtectedRoute;


// ProtectedRoute.js

import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ element: Component, requiredPerms, ...rest }) => {
  const {
    initKeycloak,
    isAuthenticated,
    loading,
    roles,
    login,
  } = useAuth();

  const [initDone, setInitDone] = useState(false);

  useEffect(() => {
    console.log("ProtectedRoute mounted.");
    if (!initDone) {
      initKeycloak()
        .then(() => {
          console.log("Keycloak initialization complete.");
          setInitDone(true);
        })
        .catch((error) => {
          console.error("Error during Keycloak initialization:", error);
          setInitDone(true);
        });
    }
  }, [initDone, initKeycloak]);

  if (loading || !initDone) {
    console.log("Loading state active:", loading, "Init done:", initDone);
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to login.");
    login();
    return <div>Redirecting...</div>;
  }

  const isAuthorized = requiredPerms.some((permission) =>
    roles.includes(permission)
  );

  if (!isAuthorized) {
    console.log("User not authorized for this route.");
    return <Navigate to="/not-authorized" />;
  }

  console.log("User is authorized. Rendering component.");
  return <Component {...rest} />;
};

export default ProtectedRoute;
