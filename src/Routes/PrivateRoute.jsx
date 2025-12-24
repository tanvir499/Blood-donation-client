import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router";
import { PropagateLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const { user, loading, roleLoading, userStatus } = useContext(AuthContext);

  if (loading || roleLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <PropagateLoader />
      </div>
    );
  }
  if (!user || !userStatus == "active") {
    return <Navigate to={"/login"}></Navigate>;
  }
  return children;
};

export default PrivateRoute;
