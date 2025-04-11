import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import accountManager from "../utils/AccountManager";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const user = accountManager.getUser();

  if (!user && window.location.pathname !== "/login" && window.location.pathname !== "/signup") {
    return (
      <Navigate
        to="/login"
        replace
        state={{ backgroundLocation: location }}
      />
    );
  } else if (!user && window.location.pathname !== "/login" && window.location.pathname !== "/signup") {
	return (
	  <Navigate
		to="/signup"
		replace
		state={{ backgroundLocation: location }}
	  />
	);
  } else if (user) { 
	return children;
  }
};

export default ProtectedRoute;
