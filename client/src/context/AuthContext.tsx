import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { checkAuthService, getUserContextLoader, logoutService } from "../api/authService";
import type { UserContextType } from "@qcpesopedro/shared/schema/login";

interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    user: UserContextType | null;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserContextType | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const logout = async () => {
        await logoutService();
        setIsAuthenticated(false);
    };

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            const isAuthenticated = await checkAuthService();
            setIsAuthenticated(isAuthenticated);
            const user = await getUserContextLoader();
            setUser(user);

            setLoading(false);
        };
        init();
    }, []);
    return (
        <AuthContext
            value={{
                isAuthenticated,
                loading,
                user,
                logout,
            }}
        >
            {children}
        </AuthContext>
    );
};

/* eslint-disable react-refresh/only-export-components */
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};
