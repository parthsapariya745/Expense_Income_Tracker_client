import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../Redux/Reducers/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { resetPasswordSuccess, resetEmail } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("new and confirm password are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    dispatch(resetPassword({ email: resetEmail, newPassword, confirmPassword }));
  };

  useEffect(() => {
    if (resetPasswordSuccess) {
      navigate("/");
      dispatch(resetPasswordSuccess())
    }
  }, [resetPasswordSuccess, navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      {/* Card */}
      <div className="w-full max-w-md bg-[#020617] border border-slate-800 rounded-2xl shadow-xl p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-white mb-2">
          Reset Password 🔐
        </h2>
        <p className="text-center text-slate-400 mb-6">
          Create a new strong password for your account
        </p>
        {/* Form */}
        <form className="space-y-4" onSubmit={handleResetPassword}>
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value.trim())}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-[#020617] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value.trim())}
              className="w-full px-4 py-2 bg-[#020617] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Reset Password
          </button>
        </form>
        {/* Footer */}
        <p className="text-center text-sm text-slate-400 mt-6">
          Remembered your password?
          <span className="text-blue-400 font-medium ml-1 cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};
export default ResetPassword;
