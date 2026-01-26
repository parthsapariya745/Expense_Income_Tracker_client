import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { forgotPassword, resetForgotPassword } from "../Redux/Reducers/userSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("")

  const { forgotPasswordSuccess } = useSelector((state) => state.user);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleForgotPassword = (e) => {
    e.preventDefault()

    if (email.trim() !== "") {
      dispatch(forgotPassword({ email }))
    }
  }

  useEffect(() => {
    if (forgotPasswordSuccess) {
      navigate("/VerifyOTP")
      dispatch(resetForgotPassword())
    }
  }, [forgotPasswordSuccess, navigate, dispatch])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      {/* Card */}
      <div className="w-full max-w-md bg-[#020617] border border-slate-800 rounded-2xl shadow-xl p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-white mb-2">
          Forgot Password 🔐
        </h2>
        <p className="text-center text-slate-400 mb-6">
          Enter your Registered Email to receive OTP
        </p>
        {/* Form */}
        <form className="space-y-4" onSubmit={handleForgotPassword}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="you@example.com"
              className="w-full px-4 py-2 bg-[#020617] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Send OTP
          </button>
        </form>
        {/* Footer */}
        <p className="text-center text-sm text-slate-400 mt-6">
          Remember your password?
          <Link to='/' className="text-blue-400 font-medium ml-1 cursor-pointer hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
export default ForgotPassword