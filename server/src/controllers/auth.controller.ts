// General Imports
import type { Request, Response } from "express";

// PEDRO SHARED IMPORTS
import type { User } from "@qcpesopedro/shared/prisma/client";

// Middlewares
import { jwtAccessAuth, jwtRefreshAuth, localAuth } from "../middlewares/passport.middleware";

// Service
import AuthService from "../service/auth.service";
import UserService from "../service/user.service";
import { requireValidResetToken } from "../middlewares/authorized.middleware";

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

    async forgotPasswordPost(req: Request, res: Response) {
        const { email } = req.body;
        const user = await UserService.emailExist(email);

        if (user) {
            AuthService.sendOTPEmail(user);
        }

        /*
            Regardless if the email exists or not status 200 is sent.
            Prevents unathorized users from bruteforcing which emails exists or not
        */
        return res.status(200).send();
    },

    protectedResetPasswordGet: [
        requireValidResetToken,
        (req: Request, res: Response) => {
            const { email } = req.user as User;
            const [name, domain] = email.split("@");
            if (!name || !domain) return res.status(401).json({ message: "Email is missing from user" });

            console.log(email);

            // Show first char, mask middle chars, show last char of local part if long enough
            let maskedName = name[0] + "****";
            if (name.length > 2) {
                maskedName = `${name[0]}****${name[name.length - 1]}`;
            }

            const maskedEmail = `${maskedName}@${domain}`;

            return res.json({
                email: maskedEmail,
            });
        },
    ],

    resetPasswordPost: [
        requireValidResetToken,
        async (req: Request, res: Response) => {
            const user = req.user as User;
            const { newPassword } = req.body;

            return res.status(200).send();
        },
    ],

    protectedGet: [
        jwtAccessAuth,
        (_req: Request, res: Response) => {
            return res.json({ message: "Authentication passed" });
        },
    ],
};
