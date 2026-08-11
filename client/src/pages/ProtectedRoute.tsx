import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../hooks/reroute";
import tokenStore from "../api/tokenStore";

export function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();
    if (loading) return <div>Loading...</div>;

    if (!isAuthenticated) return <Navigate to={ROUTES.auth.root} replace />;

    return <Outlet />;
}
