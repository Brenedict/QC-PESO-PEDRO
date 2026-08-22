import crypto from "crypto";

/**
 * Bcryptjs is used in PEDRO for higher level hashing (adds salt)
 * Crypto is used in the reset token for deterministic tokens.
 * Yung salt kasi nag-aadd ng randomness, makes it difficult to search for reset tokens via db queries.
 */
export default {
    generatePlainToken(): string {
        return crypto.randomBytes(32).toString("hex");
    },

    generateRandomHashedToken(): string {
        const plainToken = this.generatePlainToken();
        return crypto.createHash("sha256").update(plainToken).digest("hex");
    },

    getExpirationDate(duration: string): Date {
        const match = duration.match(/^(\d+)\s*([s|m|h|d])$/i);

        if (!match) {
            throw new Error("Invalid duration format. Use '30s', '3m', '1h', or '1d'.");
        }

        /**
         * Extracts number and unit (i.e. 's', 'm') from provided date offset
         * In case regex fails, offset defaults to 1 minute (1m)
         */
        const rawNum = match[1] ?? "1";
        const rawUnit = match[2] ?? "m";

        const value = parseInt(rawNum);
        const unit = rawUnit.toLowerCase();

        // Calculates offset for Date()
        const multipliers: Record<string, number> = {
            s: 1000, // seconds
            m: 60 * 1000, // minutes
            h: 60 * 60 * 1000, // hours
            d: 24 * 60 * 60 * 1000, // days
        };

        // Fallback to 60000 (1 minute) if undefined
        const multiplier = multipliers[unit] ?? 60 * 1000;

        return new Date(Date.now() + value * multiplier);
    },
};
