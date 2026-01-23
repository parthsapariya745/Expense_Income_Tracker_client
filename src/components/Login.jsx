import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/Reducers/userSlice"
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassowrd] = useState("");

    const { isUserAuth } = useSelector((state) => state.user);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handleLogin = (e) => {
        e.preventDefault()

        if (email !== "" && password !== "") {
            dispatch(login({ email, password }))
        }

        setEmail("")
        setPassowrd("")
    }

    useEffect(() => {
        if (isUserAuth) {
            navigate("/user/dashboard")
        }
    }, [isUserAuth, dispatch, navigate])

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
            {/* Card */}
            <div className="w-full max-w-md bg-[#020617] border border-slate-800 rounded-2xl shadow-xl p-8">
                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-white mb-2">
                    Welcome Back 👋
                </h2>
                <p className="text-center text-slate-400 mb-6">
                    Login to manage your Income & Expenses
                </p>
                {/* Form */}
                <form className="space-y-4" onSubmit={handleLogin}>
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
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
                            onChange={(e) => setPassowrd(e.target.value)}
                            value={password}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 bg-[#020617] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right">
                        <Link
                            to='/ForgotPassword'
                            className="text-sm text-blue-400 hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center">
                    <div className="flex-1 h-px bg-slate-700"></div>
                    <span className="px-3 text-sm text-slate-400">OR</span>
                    <div className="flex-1 h-px bg-slate-700"></div>
                </div>

                {/* Register */}
                <p className="text-center text-sm text-slate-400">
                    Don't have an account?
                    <Link to='/Register' className="text-blue-400 font-medium ml-1 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};
export default Login;