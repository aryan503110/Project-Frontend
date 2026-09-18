import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/Public/SignUp";
import Login from "./components/Public/Login";
import AdminHome from "./components/Private/Admin/AdminHome";
import { ToastContainer, toast } from "react-toastify";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import SalespersonHome from "./components/Private/SalesPerson/SalespersonHome";
import CustomerHome from "./components/Private/Customer/CustomerHome";
import Unauthorized from "./components/Public/Unauthorized";
import Forgotpassword from "./components/Public/ForgotPassword/Forgotpassword";
import OTPAuthenticator from "./components/Public/ForgotPassword/OTPAuthenticator";
import ResetPassword from "./components/Public/ForgotPassword/ResetPassword";
import Layout from "./components/Private/Layout";
import AllSalesPerson from "./components/Private/Admin/AllSalesPerson";

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
            <Route element={<Layout />}>
              <Route path="/home" element={<AdminHome />}></Route>
              <Route path="/allsalesperson" element={<AllSalesPerson/>}></Route>
            </Route>
          </Route>
          <Route element={<ProtectedRoute role="salesperson" />}>
            <Route element={<Layout />}>
              <Route
                path="/salespersonhome"
                element={<SalespersonHome />}
              ></Route>
            </Route>
          </Route>
          <Route element={<ProtectedRoute role="customer" />}>
            <Route element={<Layout />}>
              <Route path="/customerhome" element={<CustomerHome />}></Route>
            </Route>
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
};

export default App;
