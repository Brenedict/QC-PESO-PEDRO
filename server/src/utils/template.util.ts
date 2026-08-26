// General Imports
import fs from "fs";
import path from "path";

// Utils
import DateUtil from "../utils/date.util";

export default {
    formatEmailTemplate(
        baseUrl: string,
        hashedToken: string,
        smtpExpirationOffset: string,
        firstName: string,
        email: string
    ) {
        // Retrieves HTML template sent in the email
        const templatePath = path.join(process.cwd(), "src", "templates", "reset-password.html");
        const htmlTemplate = fs.readFileSync(templatePath, "utf-8");

        // Replaces link in the HTML template
        let populatedHtml = htmlTemplate;

        // Formats email sent
        const resetLink = `${baseUrl}/reset-password?token=${hashedToken}`;
        populatedHtml = htmlTemplate.replaceAll("${resetLink}", () => resetLink);

        const linkDuration = DateUtil.formatResetLinkDurationEmail(smtpExpirationOffset);
        populatedHtml = populatedHtml.replaceAll("${linkDuration}", () => linkDuration);

        populatedHtml = populatedHtml.replaceAll("${firstName}", () => firstName);
        populatedHtml = populatedHtml.replaceAll("${email}", () => email);

        return populatedHtml;
    },

    formatPasswordChangeTemplate(firstName: string, email: string, changeDate: Date) {
        // Retrieves HTML template sent in the email
        const templatePath = path.join(process.cwd(), "src", "templates", "password-changed.html");
        const htmlTemplate = fs.readFileSync(templatePath, "utf-8");

        // Replaces link in the HTML template
        let populatedHtml = htmlTemplate;

        // Formats email sent
        populatedHtml = populatedHtml.replaceAll("${firstName}", () => firstName);
        populatedHtml = populatedHtml.replaceAll("${email}", () => email);
        populatedHtml = populatedHtml.replaceAll("${changeDate}", () => changeDate.toDateString());

        return populatedHtml;
    },
};
