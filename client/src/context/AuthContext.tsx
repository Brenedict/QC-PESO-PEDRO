import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { checkAuthService, logoutService } from "../api/authService";

interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const logout = async () => {
        await logoutService();
        setIsAuthenticated(false);
    };

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            setIsAuthenticated(await checkAuthService());
            setLoading(false);
        };
        init();
    }, []);

    const checkAuth = async () => {
        setIsAuthenticated(await checkAuthService());
    };

    return <AuthContext value={{ isAuthenticated, loading, checkAuth, logout }}>{children}</AuthContext>;
};

/* eslint-disable react-refresh/only-export-components */
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};
