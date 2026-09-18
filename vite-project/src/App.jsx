import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import AdminHome from "./components/AdminHome";
import { ToastContainer, toast } from "react-toastify";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import SalespersonHome from "./components/SalesPerson/SalespersonHome";
import CustomerHome from "./components/Customer/CustomerHome";
import Unauthorized from "./components/Unauthorized";
import Forgotpassword from "./components/ForgotPassword/Forgotpassword";
import OTPAuthenticator from "./components/ForgotPassword/OTPAuthenticator";
import ResetPassword from "./components/ForgotPassword/ResetPassword";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />}></Route>
          <Route path="/forgot-password" element={<Forgotpassword />}></Route>
          <Route path="/otp-page" element={<OTPAuthenticator />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
          <Route path="/unauthorized" element={<Unauthorized />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route element={<ProtectedRoute role="admin" />}>
            <Route path="/home" element={<AdminHome />}></Route>
          </Route>
          <Route element={<ProtectedRoute role="salesperson" />}>
            <Route
              path="/salespersonhome"
              element={<SalespersonHome />}
            ></Route>
          </Route>
          <Route element={<ProtectedRoute role="customer" />}>
            <Route path="/customerhome" element={<CustomerHome />}></Route>
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
};

export default App;
