import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setRole,
  setUserId,
  setName,
  setImage,
  setIsPremium,
} from "../Redux/Slice/authSlice";
import type { RootState } from "../Redux/store";

const ProtectedRoute = ({ role }) => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const currentRole = useSelector((state: RootState) => state.auth.role);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`);

        dispatch(setRole(response.data.user.role));
        dispatch(setUserId(response.data.user.userId));
        dispatch(setName(response.data.user.name));
        dispatch(setImage(response.data.user.image));
        dispatch(setIsPremium(response.data.user.isPremium));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentRole) {
    return <Navigate to="/login" replace />;
  }

  if (role && currentRole !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
