import type { UserContextType } from "@qcpesopedro/shared/schema/login";

// Simple in‑memory token store
class TokenStore {
    private accessToken: string | null = null;
    private user: UserContextType | null = null;

    public setAccessToken = (token: string | null) => {
        this.accessToken = token;
    };

    public setUser = (user: UserContextType | null) => {
        this.user = user;
    };

    public getAccessToken = () => this.accessToken;
    public getUser = () => this.user;
}

export default new TokenStore();
