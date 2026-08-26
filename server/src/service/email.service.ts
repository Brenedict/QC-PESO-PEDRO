// General Imports
import nodemailer from "nodemailer";

// PEDRO SHARED IMPORTS
import type { User } from "@qcpesopedro/shared/prisma/client";

// Services
import AuthService from "./auth.service";

// Utils
import HashUtil from "../utils/hash.util";
import TemplateUtil from "../utils/template.util";

export default {
    async sendOTPEmail(firstName: string, email: string, hashedToken: string, smtpExpirationOffset: string) {
        try {
            // .env prerequisites
            const smtpSourceEmail = process.env.GMAIL_SMTP_EMAIL;
            const smtpSourcePassword = process.env.GMAIL_SMTP_16_CHAR_PASS;
            const baseUrl = process.env.FRONTEND_URL;

            if (!baseUrl || !smtpSourceEmail || !smtpSourcePassword) {
                throw Error;
            }

            const populatedEmailHtml = TemplateUtil.formatEmailTemplate(
                baseUrl,
                hashedToken,
                smtpExpirationOffset,
                firstName,
                email
            );
            // Constructs email body
            const mailOptions = {
                from: `"QC PESO Pedro - No Reply" <${smtpSourceEmail}>`,
                to: email,
                subject: "Password Reset Request",
                html: populatedEmailHtml,
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
                    throw Error;
                }
            });

            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    },

    async sendPasswordChangeEmail(firstName: string, email: string, changeDate: Date) {
        try {
            // .env prerequisites
            const smtpSourceEmail = process.env.GMAIL_SMTP_EMAIL;
            const smtpSourcePassword = process.env.GMAIL_SMTP_16_CHAR_PASS;
            const baseUrl = process.env.FRONTEND_URL;

            if (!baseUrl || !smtpSourceEmail || !smtpSourcePassword) {
                throw Error;
            }

            const populatedEmailHtml = TemplateUtil.formatPasswordChangeTemplate(firstName, email, changeDate);
            // Constructs email body
            const mailOptions = {
                from: `"QC PESO Pedro - No Reply" <${smtpSourceEmail}>`,
                to: email,
                subject: "Password Change Status",
                html: populatedEmailHtml,
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
                    throw Error;
                }
            });

            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    },
};
