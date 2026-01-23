import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../Redux/Reducers/userSlice";

const Register = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const { message } = useSelector((state) => state.user);
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()

    if (firstName !== "" && lastName !== "" && email !== "" && password !== "") {
      dispatch(register({ firstName, lastName, email, password }))
    }
    
    setFirstName("")
    setLastName("")
    setEmail("")
    setPassword("")
  }
  
  useEffect(() => {
    if (message) {
      navigate("/")
    } 
  }, [message, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      {/* Card */}
      <div className="w-full max-w-md bg-[#020617] border border-slate-800 rounded-2xl shadow-xl p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-white mb-2">
          Create Account 🚀
        </h2>
        <p className="text-center text-slate-400 mb-6">
          Start tracking your Income & Expenses
        </p>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleRegister}>
          {/* first name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              First Name
            </label>
            <input
              type="text"
              onChange={(e) => setFirstName(e.target.value.trim())}
              value={firstName}
              placeholder="John"
              className="w-full px-4 py-2 bg-[#020617] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* last name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Last Name
            </label>
            <input
              type="text"
              onChange={(e) => setLastName(e.target.value.trim())}
              value={lastName}
              placeholder="Doe"
              className="w-full px-4 py-2 bg-[#020617] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value.trim())}
              value={email}
              placeholder="you@example.com"
              className="w-full px-4 py-2 bg-[#020617] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-[#020617] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 h-px bg-slate-700"></div>
          <span className="px-3 text-sm text-slate-400">OR</span>
          <div className="flex-1 h-px bg-slate-700"></div>
        </div>

        {/* Login */}
        <p className="text-center text-sm text-slate-400">
          Already have an account?
          <Link to='/' className="text-blue-400 font-medium ml-1 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Register;