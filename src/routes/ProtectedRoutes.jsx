/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  // the children components only will be rendered if the user is authenticated
  //  return may be happening before useEffect() being executed if it not a conditional rendering
  return isAuthenticated ? children : null;
}

export default ProtectedRoutes;
