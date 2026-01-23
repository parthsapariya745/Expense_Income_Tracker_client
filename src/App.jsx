import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { toast, ToastContainer } from "react-toastify";

import ForgotPassword from "./components/ForgotPassword";
import VerifyOTP from "./components/VerifyOTP";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearMessage, getUserData, isLogout } from "./Redux/Reducers/userSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import Income from "./components/Income";
import Expense from "./components/Expense";
import Profile from "./components/Profile";
import BottomNav from "./components/BottomNav";

const AppContent = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const { isUserAuth, authChecked, error, message } = useSelector((state) => state.user)
  const navigate = useNavigate()

  const isUserPage = location.pathname.startsWith("/user");

  useEffect(() => {
    if (!isUserAuth) {
      dispatch(getUserData())
    }
  }, [dispatch, isUserAuth])

  useEffect(() => {
    if (message) {
      toast.success(message)
      dispatch(clearMessage())
    }
    if (error) {
      toast.error(error)
      dispatch(clearMessage())
    }
  }, [message, error, dispatch])

  const handleLogout = () => {
    dispatch(isLogout())
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {authChecked && isUserAuth && isUserPage && <Sidebar onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/VerifyOTP" element={<VerifyOTP />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route path="/user/income" element={<Income />} />
          <Route path="/user/expense" element={<Expense />} />
          <Route path="/user/profile" element={<Profile onLogout={handleLogout} />} />
        </Route>
      </Routes>
      {authChecked && isUserAuth && isUserPage && <BottomNav />}
    </div>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      <BrowserRouter>
        <ToastContainer theme="dark" position="top-center" />
        <AppContent />
      </BrowserRouter>
    </div>
  );
};
export default App;