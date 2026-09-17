import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({role}) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentRole, setcurrentRole] = useState("");

  axios.defaults.withCredentials = true;
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/profile");
        setIsLoggedIn(true);
        setcurrentRole(response.data.user.role);
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  console.log("Current Role:", currentRole);
console.log("Allowed Role:", role);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

   if (!currentRole) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but wrong role
  if (currentRole !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
