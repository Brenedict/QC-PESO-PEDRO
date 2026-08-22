// General Imports
import { Form, Link } from "react-router";

// Components
import Button from "../components/Button";
import { Text } from "../components/Text";
import { Card } from "../components/Card";
import Icon from "../components/Icon";

// Material UI Icons
import EmailIcon from "@mui/icons-material/Email";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

// Custom Hooks
import { ROUTES, useNavigateDefault } from "../hooks/reroute";
import { GeneralInput } from "../components/Input";
import { useState } from "react";
import { apiJson, ensureOk } from "../api/actionService";

export function ForgotPassword() {
    const navigate = useNavigateDefault();

    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const handleFormChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        setIsFormValid(e.currentTarget.checkValidity());
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");

        e.preventDefault(); // Stop full page reload

        const response = await apiJson("/auth/forgot-password", {
            method: "PATCH",
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            // setIsSuccessful(true); // Control local UI state cleanly
        }
    };

    return (
        <main className="flex flex-col justify-center items-center h-screen">
            <Card className="max-w-[980px]">
                {!isSuccessful ? (
                    <Card.Body className="flex flex-col gap-6">
                        <div className="flex justify-center gap-3">
                            <Icon icon={EmailIcon} size="iconHero" variant="dark-blue" />
                            <Text size="giant" weight="bold" variant="dark-blue" align="center" className="">
                                Enter your email
                            </Text>
                        </div>
                        <Text size="medium" variant="grayish-blue" weight="normal" className="mt-2">
                            Enter the official government email address associated with your account. If a matching
                            record is found in our system, we will send you a secure link to reset your password.
                        </Text>
                        <form onChange={handleFormChange} onSubmit={handleSubmit}>
                            <GeneralInput
                                type="email"
                                name="email"
                                id="email"
                                label="QC Government Email"
                                placeholder="Enter your email here"
                                required
                                isRequired={true}
                            />

                            <br className="block mb-4" />

                            <Button variant="blue" size="normal" className="w-full!" disabled={!isFormValid}>
                                Send Link
                            </Button>
                        </form>
                    </Card.Body>
                ) : (
                    <Card.Body className="flex flex-col gap-6">
                        <div className="flex justify-center gap-3">
                            <Icon icon={MarkEmailReadIcon} size="iconHero" variant="dark-blue" />
                            <Text size="giant" weight="bold" variant="dark-blue" align="center" className="">
                                Check Your Email
                            </Text>
                        </div>
                        <Text size="medium" variant="grayish-blue" weight="normal" className="mt-2">
                            If an account is associated with the email address provided, a password reset link has been
                            sent. Please check your inbox and follow the instructions to complete the process. If you do
                            not receive an email within a few minutes, please check your spam folder or verify that the
                            email address was entered correctly.
                        </Text>

                        <Button
                            variant="blue"
                            size="normal"
                            className="w-full!"
                            onClick={() => navigate(ROUTES.auth.root, false)}
                        >
                            Return to Login
                        </Button>
                    </Card.Body>
                )}
            </Card>
        </main>
    );
}
