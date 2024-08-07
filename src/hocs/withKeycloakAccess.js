import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import UserService from '../keycloak';


function withKeycloakAccess(Component) {
  function PrivateComponent(props) {
    const { isAuthenticated, keycloak } = useAuth();
   // const [authState] = useContext(AuthContext);
    const navigate = useNavigate();
    const keycloakRoles = keycloak?.tokenParsed?.realm_access?.roles ;

    console.log(keycloak.authenticated, keycloak, "testststs")
    if(UserService.doLogin){
      navigate('/page1')
    }else{
      navigate('/page2');
    }
    
    return <Component {...props} />;

  }
  const displayName = Component.displayName || Component.name || 'Component';
  PrivateComponent.displayName = `WithPrivateAccess(${displayName})`;

  return PrivateComponent;
}

export default withKeycloakAccess;
