import type { ShiftLog, User } from "@qcpesopedro/shared/prisma/browser";
import type { UserContextType } from "@qcpesopedro/shared/schema/login";

// Simple in‑memory store

class InMemoryStore {
    private accessToken: string | null = null;
    private user: UserContextType | null = null;
    private revisionShift: (ShiftLog & { user: User }) | null = null;

    private listeners = new Set<() => void>();

    // React can subscribe to store changes
    public subscribe = (listener: () => void) => {
        this.listeners.add(listener);

        return () => {
            this.listeners.delete(listener);
        };
    };

    private notify = () => {
        this.listeners.forEach((listener) => listener());
    };

    public setAccessToken = (token: string | null) => {
        this.accessToken = token;
        this.notify();
    };

    public setUser = (user: UserContextType | null) => {
        this.user = user;
        this.notify();
    };

    public setUserShiftLog = (shiftLog?: ShiftLog) => {
        if (this.user) {
            // Create a new object instead of mutating the existing one
            this.user = {
                ...this.user,
                shiftLog,
            };

            this.notify();
        }
    };

    public setUserIsRevising = (revising: boolean) => {
        if (this.user) {
            // Create a new object instead of mutating the existing one
            this.user = {
                ...this.user,
                isRevising: revising,
            };

            this.notify();
        }
    };

    public setRevisionShift = (shiftLog: (ShiftLog & { user: User }) | null) => {
        this.revisionShift = shiftLog;
        this.notify();
    };

    public getAccessToken = () => this.accessToken;

    public getUser = () => this.user;

    public getRevisionShift = () => this.revisionShift;
}

export default new InMemoryStore();
