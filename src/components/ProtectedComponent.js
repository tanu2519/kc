import React from "react";

const ProtectedComponent = () => {
  return (
    <div>
      <h2>Protected Component</h2>
      <p>This is a protected component accessible only to users with the "admin" role.</p>
    </div>
  );
};

export default ProtectedComponent;
