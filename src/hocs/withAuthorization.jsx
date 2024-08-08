import React from "react";
import { Navigate } from "react-router-dom";

/**
 * HOC to wrap protected components and handle permission checks
 * @param {React.ComponentType} WrappedComponent - The component to wrap
 * @param {Array} requiredPerms - Permissions required to access the component
 * @returns {React.ComponentType} - A component that checks permissions and renders conditionally
 */
const withAuthorization = (WrappedComponent, requiredPerms) => {
  return (props) => {
    const userPerms = props.roles; // Assuming you pass roles as props

    // Check if the user has at least one of the required permissions
    const isAuthorized = requiredPerms.some((permission) =>
      userPerms.includes(permission)
    );

    // Render the wrapped component if authorized, otherwise redirect
    return isAuthorized ? (
      <WrappedComponent {...props} />
    ) : (
      <Navigate to="/not-authorized" />
    );
  };
};

export default withAuthorization;
