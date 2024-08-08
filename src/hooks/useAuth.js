// // useAuth.js

// import { useState, useEffect, useRef, useCallback } from "react";
// import Keycloak from "keycloak-js";

// // var KEYCLOAK_URL = "http://10.3.0.12/";
// // var REACT_URL = "http://10.3.0.12/react";

// var KEYCLOAK_URL = "http://localhost:8080";
// var REACT_URL = "http://localhost:3000";

// const client = new Keycloak({
// 	url: KEYCLOAK_URL,
// 	realm: "master",
// 	clientId: "frontend",
// });

// const useAuth = () => {
// 	const isRun = useRef(false);
// 	const [token, setToken] = useState(null);
// 	const [refreshToken, setRefreshToken] = useState(null);
// 	const [idToken, setIdToken] = useState(null);
// 	const [isAuthenticated, setIsAuthenticated] = useState(false);
// 	const [user, setUser] = useState(null);
// 	const [roles, setRoles] = useState([]);
// 	const [loading, setLoading] = useState(true);

// 	const initKeycloak = useCallback(() => {
// 		if (isRun.current) return;

// 		isRun.current = true;
// 		client
// 			.init({ onLoad: "login-required", checkLoginIframe: false })
// 			.then((authenticated) => {
// 				setIsAuthenticated(authenticated);
// 				if (authenticated) {
// 					setToken(client.token);
// 					setRefreshToken(client.refreshToken);
// 					setIdToken(client.idToken);
// 					setUser(client.profile);
// 					setRoles(client.realmAccess?.roles || []);

// 					client.onTokenExpired = () => {
// 						client.updateToken(30).then((refreshed) => {
// 							if (refreshed) {
// 								setToken(client.token);
// 								setRefreshToken(client.refreshToken);
// 							}
// 						});
// 					};
// 				}
// 				setLoading(false);
// 			})
// 			.catch((error) => {
// 				console.error("Authentication failed", error);
// 				setIsAuthenticated(false);
// 			});
// 	}, []);

// 	// useEffect(() => {
// 	// 	initKeycloak();
// 	// }, [initKeycloak]);

// 	const login = useCallback(() => client.login(), []);
// 	const logout = useCallback(
// 		() => client.logout({ redirectUri: REACT_URL }),
// 		[]
// 	);
// 	const hasRole = useCallback(
// 		(roles) => roles.some((role) => client.hasRealmRole(role)),
// 		[]
// 	);

// 	return {
// 		isAuthenticated,
// 		token,
// 		refreshToken,
// 		idToken,
// 		user,
// 		roles,
// 		login,
// 		logout,
// 		hasRole,
// 		keycloak: client,
// 		loading
// 	};
// };

// export default useAuth;


// useAuth.js

import { useState, useRef, useCallback } from "react";
import Keycloak from "keycloak-js";

const KEYCLOAK_URL = "http://localhost:8080";
const REACT_URL = "http://localhost:3000";

const client = new Keycloak({
  url: KEYCLOAK_URL,
  realm: "master",
  clientId: "frontend",
});

const useAuth = () => {
  const isRun = useRef(false);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const initKeycloak = useCallback(async () => {
    if (isRun.current) return;

    console.log("Initializing Keycloak...");
    isRun.current = true;

    try {
      const authenticated = await client.init({
        onLoad: "check-sso", // Use check-sso to avoid forced login
        checkLoginIframe: false,
      });

      console.log("Keycloak initialized, authenticated:", authenticated);
      setIsAuthenticated(authenticated);

      if (authenticated) {
        setToken(client.token);
        setRefreshToken(client.refreshToken);
        setIdToken(client.idToken);

        try {
          const profile = await client.loadUserProfile();
          setUser(profile);
          console.log("User profile loaded:", profile);
        } catch (profileError) {
          console.error("Failed to load user profile:", profileError);
        }

        setRoles(client.realmAccess?.roles || []);
        console.log("Roles set:", client.realmAccess?.roles || []);

        client.onTokenExpired = async () => {
          console.log("Token expired. Attempting to refresh token...");
          try {
            const refreshed = await client.updateToken(30);
            if (refreshed) {
              setToken(client.token);
              setRefreshToken(client.refreshToken);
            } else {
              logout();
            }
          } catch (refreshError) {
            console.error("Error during token refresh:", refreshError);
            logout();
          }
        };
      } else {
        console.warn("User is not authenticated.");
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(() => {
    client.login();
  }, []);

  const logout = useCallback(() => {
    client.logout({ redirectUri: REACT_URL });
  }, []);

  const hasRole = useCallback(
    (roles) => roles.some((role) => client.hasRealmRole(role)),
    []
  );

  return {
    initKeycloak,
    isAuthenticated,
    token,
    refreshToken,
    idToken,
    user,
    roles,
    login,
    logout,
    hasRole,
    keycloak: client,
    loading,
  };
};

export default useAuth;
