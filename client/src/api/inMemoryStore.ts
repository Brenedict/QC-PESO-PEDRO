import type { ShiftLog } from "@qcpesopedro/shared/prisma/browser";
import type { UserContextType } from "@qcpesopedro/shared/schema/login";

// Simple in‑memory store
class InMemoryStore {
    private accessToken: string | null = null;
    private user: UserContextType | null = null;

    public setAccessToken = (token: string | null) => {
        this.accessToken = token;
    };

    public setUser = (user: UserContextType | null) => {
        this.user = user;
    };

    public setUserShiftLog = (shiftLog?: ShiftLog) => {
        if (this.user) {
            this.user.shiftLog = shiftLog;
        }
    };

    public getAccessToken = () => this.accessToken;
    public getUser = () => this.user;
}

export default new InMemoryStore();
