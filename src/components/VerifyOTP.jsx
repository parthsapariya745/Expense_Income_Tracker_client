import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { forgotPassword, resetOTPVerified, verifyOTP } from "../Redux/Reducers/userSlice";
import { toast } from "react-toastify";

const VerifyOTP = () => {
    const [OTP, setOTP] = useState("")

    const { resetEmail, otpVerified } = useSelector((state) => state.user);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleVerifyOTP = (e) => {
        e.preventDefault()

        if (!OTP || OTP.length !== 6) {
            toast.error("Enter valid 6-digit OTP")
            return
        }
        dispatch(verifyOTP({ otp: OTP, email: resetEmail }))
    }

    const handleResendOTP = () => {
        if (!resetEmail) {
            toast.error("email not found! please restart forgot password flow")
            return
        }
        dispatch(forgotPassword({ email: resetEmail }))
    }

    useEffect(() => {
        if (otpVerified) {
            navigate("/ResetPassword")
            dispatch(resetOTPVerified())
        }
    }, [navigate, otpVerified, dispatch])

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
            {/* Card */}
            <div className="w-full max-w-md bg-[#020617] border border-slate-800 rounded-2xl shadow-xl p-8">
                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-white mb-2">
                    Verify OTP 🔐
                </h2>
                <p className="text-center text-slate-400 mb-6">
                    Enter the 6-digit OTP sent to your email
                </p>
                {/* Form */}
                <form className="space-y-4" onSubmit={handleVerifyOTP}>
                    {/* OTP Input */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            OTP Code
                        </label>
                        <input
                            type="text"
                            maxLength={6}
                            value={OTP}
                            onChange={(e) => setOTP(e.target.value.trim())}
                            placeholder="Enter OTP"
                            className="w-full px-4 py-2 text-center tracking-widest text-lg bg-[#020617] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Verify OTP
                    </button>
                </form>
                {/* Resend */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-slate-400">
                        Didn’t receive OTP?
                        <button onClick={handleResendOTP} className="text-blue-400 font-medium ml-1 cursor-pointer hover:underline">
                            Resend
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default VerifyOTP