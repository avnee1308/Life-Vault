import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {

    const { isAuthenticated, loading } = useAuth();

    // Wait until AuthContext checks localStorage
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

                    <p className="text-slate-600">
                        Loading LifeVault...
                    </p>
                </div>
            </div>
        );
    }

    // User is not logged in
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // User is authenticated
    return <Outlet />;
}

export default ProtectedRoute;