import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
    const { isUserAuth, authChecked } = useSelector((state) => state.user)

    if (!authChecked) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (!isUserAuth) return <Navigate to='/' replace />

    return <Outlet />
}
export default ProtectedRoute