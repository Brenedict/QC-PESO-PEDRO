// General Imports
import jwt from "jsonwebtoken";
import env from "../config/env.config";
import { type Response } from "express";
import ms from "ms";

// PEDRO SHARED IMPORTS
import type { User } from "@qcpesopedro/shared/prisma/client";

export default {
    // Helper to generate tokens
    generateTokens(user: User) {
        // Server token (Http-only cookie)
        const refreshToken = jwt.sign({ sub: user.id, email: user.email }, env.JWT_REFRESH_SECRET, {
            expiresIn: env.JWT_REFRESH_EXPIRES_IN,
        } as jwt.SignOptions);

        // Client token (in-memory)
        const accessToken = jwt.sign({ sub: user.id, email: user.email }, env.JWT_ACCESS_SECRET, {
            expiresIn: env.JWT_ACCESS_EXPIRES_IN,
        } as jwt.SignOptions);

        return { accessToken, refreshToken };
    },

    sendRefreshCookie(res: Response, refreshToken: string) {
        // Send refresh token as a secure HttpOnly cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: env.NODE_ENV === "production", // set to true in production with HTTPS
            sameSite: "lax", //balanced security
            maxAge: ms(env.JWT_REFRESH_EXPIRES_IN as ms.StringValue),
        });
    },
};
