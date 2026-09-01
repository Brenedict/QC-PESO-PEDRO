import { createContext, useContext, useState, useSyncExternalStore, type ReactNode } from "react";
import { getUserContextLoader, logoutService } from "../api/authService";
import type { UserContextType } from "@qcpesopedro/shared/schema/login";
import { useRouteLoaderData } from "react-router";
import InMemoryStore from "../api/inMemoryStore";

interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    user: UserContextType | null;
    logout: () => Promise<void>;
    setUser: React.Dispatch<React.SetStateAction<UserContextType | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const data = useRouteLoaderData("protected") as { user: UserContextType } | undefined;
    const [user, setUser] = useState<UserContextType | null>(data?.user ?? null);

    const isAuthenticated = !!user;
    // isAuthenticated is now implied: if we got here, the loader already confirmed it

    const logout = async (reason?: string) => {
        await logoutService({ reason });
        InMemoryStore.setUser(null);
        setUser(null);
    };

    return <AuthContext value={{ isAuthenticated, loading: false, user, logout, setUser }}>{children}</AuthContext>;
};

/* eslint-disable react-refresh/only-export-components */
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    const user = useSyncExternalStore(InMemoryStore.subscribe, InMemoryStore.getUser);

    return { ...ctx, user };
};
