import { createContext, useContext, useState, type ReactNode } from "react";
import { logoutService } from "../api/authService";
import type { UserContextType } from "@qcpesopedro/shared/schema/login";
import { useRouteLoaderData } from "react-router";

interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    user: UserContextType | null;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const data = useRouteLoaderData("protected") as { user: UserContextType } | undefined;
    const [user, setUser] = useState<UserContextType | null>(data?.user ?? null);

    // isAuthenticated is now implied: if we got here, the loader already confirmed it
    const isAuthenticated = !!user;

    const logout = async () => {
        await logoutService();
        setUser(null);
    };

    return <AuthContext value={{ isAuthenticated, loading: false, user, logout }}>{children}</AuthContext>;
};

/* eslint-disable react-refresh/only-export-components */
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};
