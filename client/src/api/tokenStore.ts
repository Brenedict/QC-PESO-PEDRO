// Simple in‑memory token store
class TokenStore {
    private accessToken: string | null = null;

    public setAccessToken = (token: string | null) => {
        this.accessToken = token;
    };

    public getAccessToken = () => this.accessToken;
}

export default new TokenStore();
