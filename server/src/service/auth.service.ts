// General Imports
import jwt from "jsonwebtoken";
import env from "../config/env.config";
import { type Response } from "express";
import ms from "ms";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { email } from "zod";

// PEDRO SHARED IMPORTS
import type { User } from "@qcpesopedro/shared/prisma/client";

// Models
import UserModel from "../models/user.model";

// Utils
import HashUtil from "../utils/hash.util";

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

    async createResetToken(userId: number, email: string, hashedToken: string, expirationOffset: string) {
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

    async sendOTPEmail(user: User) {
        try {
            // .env prerequisites
            const smtpSourceEmail = process.env.GMAIL_SMTP_EMAIL;
            const smtpSourcePassword = process.env.GMAIL_SMTP_16_CHAR_PASS;
            const baseUrl = process.env.FRONTEND_URL;

            // '5m' is a fallback here in case the .env is missing the SMTP_EXPIRATION_OFFSET
            const smtpExpirationOffset = process.env.SMTP_EXPIRATION_OFFSET || "5m"; // Defines how long reset token lasts

            // Retrieves HTML template sent in the email
            const templatePath = path.join(process.cwd(), "src", "templates", "reset-password.html");
            const htmlTemplate = fs.readFileSync(templatePath, "utf-8");

            // Generates hashed token for reset password URL query (e.g. /reset-password?token=asdifnasoin)
            const hashedToken = await HashUtil.generateRandomHashedToken();

            // Replaces link in the HTML template
            const resetLink = `${baseUrl}/reset-password?token=${hashedToken}`;
            const populatedHtml = htmlTemplate.replaceAll("${resetLink}", resetLink);

            // Constructs email body
            const mailOptions = {
                from: `"QC PESO Pedro - No Reply" <${smtpSourceEmail}>`,
                to: user.email,
                subject: "Password Reset Request",
                html: populatedHtml,
            };

            // Sends email
            const transporter = nodemailer.createTransport({
                service: "gmail", // Or smtp.gmail.com / smtp-relay.brevo.com
                auth: {
                    user: smtpSourceEmail,
                    pass: smtpSourcePassword,
                },
            });

            transporter.sendMail(mailOptions, async (error) => {
                // Only catches when nodemal is not able to connect to SMTP server provider
                if (error) {
                    return console.error("Failed to send mail:", error);
                }

                // Only saves the token to db on successful SMTP connection
                const updatedUser = await this.createResetToken(user.id, user.email, hashedToken, smtpExpirationOffset);
            });

            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    },
};
