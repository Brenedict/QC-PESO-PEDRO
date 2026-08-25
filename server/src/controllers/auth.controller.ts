// General Imports
import type { Request, Response } from "express";

// PEDRO SHARED IMPORTS
import type { User } from "@qcpesopedro/shared/prisma/client";

// Middlewares
import { jwtAccessAuth, jwtRefreshAuth, localAuth } from "../middlewares/passport.middleware";

// Service
import AuthService from "../service/auth.service";
import UserService from "../service/user.service";
import EmailService from "../service/email.service";
import { requireValidResetToken } from "../middlewares/authorized.middleware";
import { validateSchema } from "../middlewares/zod.middleware";
import { UserFormChangePasswordSchema } from "@qcpesopedro/shared/schema/users";

// Utils
import HashUtil from "../utils/hash.util";

export default {
    loginPost: [
        localAuth,
        async (req: Request, res: Response) => {
            const user = req.user as User;
            const { accessToken, refreshToken } = AuthService.generateTokens(user);
            AuthService.sendRefreshCookie(res, refreshToken);
            res.json({ message: "Login successful", accessToken });
        },
    ],

    refreshPost: [
        jwtRefreshAuth,
        async (req: Request, res: Response) => {
            const user = req.user as User;
            const { accessToken, refreshToken } = AuthService.generateTokens(user);
            AuthService.sendRefreshCookie(res, refreshToken);
            res.json({ message: "Refresh successful", accessToken });
        },
    ],

    logoutPost(_req: Request, res: Response) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });
        res.json({ message: "Logged out successfully" });
    },

    protectedGet: [
        jwtAccessAuth,
        (_req: Request, res: Response) => {
            return res.json({ message: "Authentication passed" });
        },
    ],

    async forgotPasswordPatch(req: Request, res: Response) {
        const { email } = req.body;
        const user = await UserService.emailExist(email);

        // Prevents sending email when user email doesn't exist in database
        if (user) {
            // '5m' is a fallback here in case the .env is missing the SMTP_EXPIRATION_OFFSET
            const smtpExpirationOffset = process.env.SMTP_EXPIRATION_OFFSET || "5m"; // Defines how long reset token lasts

            // Generates hashed token for reset password URL query (e.g. /reset-password?token=209NF903H)
            const hashedToken = await HashUtil.generateRandomHashedToken();
            const emailSent = await EmailService.sendOTPEmail(
                user.firstName,
                user.email,
                hashedToken,
                smtpExpirationOffset
            );

            if (emailSent) {
                const updatedUser = await AuthService.createResetToken(user.id, hashedToken, smtpExpirationOffset);
            }
        }

        /*
            Regardless if the email exists or not status 200 is sent.
            Prevents unathorized users from bruteforcing which emails exists or not
        */
        return res.status(200).send();
    },

    protectedResetPasswordGet: [
        requireValidResetToken,
        async (req: Request, res: Response) => {
            const { id, email, resetTokenExpiresAt } = req.user as User;
            const [name, domain] = email.split("@");

            let returnMaskedEmail = "";

            // Fallback check if email still exist
            if (!name || !domain) {
                return res.status(401).json({ message: "Email is missing from user" });
            }

            // Checks if resetToken already expired
            else {
                // Show first char, mask middle chars, show last char of local part if long enough
                let maskedName = name[0] + "****";
                if (name.length > 2) {
                    maskedName = `${name[0]}****${name[name.length - 1]}`;
                }

                returnMaskedEmail = `${maskedName}@${domain}`;

                return res.json({
                    email: returnMaskedEmail,
                    isTokenExpired: false,
                });
            }
        },
    ],

    changePasswordPatch: [
        requireValidResetToken,
        validateSchema(UserFormChangePasswordSchema),
        async (req: Request, res: Response) => {
            const { newPassword, _confirmPassword } = req.body;
            const user = req.user as User;

            // Checks if inputted newPassword is a duplicate of the stored user password
            const passwordDuplicate = await HashUtil.comparePassword(newPassword, user.password);

            if (passwordDuplicate) {
                return res.status(422).json({ message: "Old Password Can't Be New Password" });
            }

            const result = UserService.changePassword(user.id, newPassword);

            if (!result) {
                return res.status(404).json({ message: "User doesn't exist" });
            }

            // Clear reset token to render reset link as null
            AuthService.clearResetToken(user.id);

            EmailService.sendPasswordChangeEmail(user.firstName, user.email, user.updatedAt);

            return res.status(200).send();
        },
    ],
};
