// General Imports
import jwt from "jsonwebtoken";
import env from "../config/env.config";
import { type Response } from "express";
import ms from "ms";
import nodemailer from "nodemailer";

// PEDRO SHARED IMPORTS
import type { User } from "@qcpesopedro/shared/prisma/client";

// Models
import UserModel from "../models/user.model";

// Utils
import HashUtil from "../utils/hash.util";
import TemplateUtil from "../utils/template.util";

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

    async createResetToken(userId: number, hashedToken: string, expirationOffset: string) {
        // Expiration 3 minutes from now
        const resetTokenExpires = HashUtil.getExpirationDate(expirationOffset);

        // Stores tokens used in password reset link
        const updatedUser = {
            resetToken: hashedToken.toString(),
            resetTokenExpiresAt: resetTokenExpires,
        } as User;

        return await UserModel.updateUser(userId, updatedUser);
    },

    async clearResetToken(userId: number) {
        // Clears reset tokens
        const updatedUser = {
            resetToken: null,
            resetTokenExpiresAt: null,
        } as User;

        return await UserModel.updateUser(userId, updatedUser);
    },
};
