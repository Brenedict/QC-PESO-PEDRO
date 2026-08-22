// General Imports
import { Form, Link, useLoaderData } from "react-router";

// Components
import Button from "../components/Button";
import { Text } from "../components/Text";
import { Card } from "../components/Card";
import Icon from "../components/Icon";

// Material UI Icons
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

// Custom Hooks
import { ROUTES, useNavigateDefault } from "../hooks/reroute";
import { PasswordInput } from "../components/Input";
import { useState } from "react";

export function ResetPassword() {
    const navigate = useNavigateDefault();

    const user = useLoaderData();

    const [isSuccessful, setIsSuccessful] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const handleFormChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        setIsFormValid(e.currentTarget.checkValidity());
    };

    const validatePasswords = (e: React.SubmitEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);
        const newPassword = formData.get("newPassword") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (newPassword !== confirmPassword) {
            e.preventDefault();
            setPasswordError("New password do not match.");
        } else {
            setPasswordError("");
        }
    };

    return (
        <main className="flex flex-col justify-center items-center h-screen">
            <Card className="">
                {!isSuccessful ? (
                    <Card.Body className="flex flex-col gap-6">
                        <div className="flex justify-center gap-3">
                            <Icon icon={LockOutlinedIcon} size="iconHero" variant="dark-blue" />
                            <Text size="giant" weight="bold" variant="dark-blue" align="center" className="">
                                Change your password
                            </Text>
                            <Text size="normal" weight="bold" variant="dark-blue" align="center" className="">
                                Email: {user.email}
                            </Text>
                        </div>
                        <Form
                            method="post"
                            id="userFormChangePassword"
                            onSubmit={validatePasswords}
                            className="flex flex-col h-fit gap-4"
                            onChange={handleFormChange}
                        >
                            <PasswordInput
                                id="newPassword"
                                name="newPassword"
                                label="New password"
                                placeholder="Enter your new password"
                                isRequired={true}
                                onChange={() => setPasswordError("")}
                            />

                            <PasswordInput
                                id="confirmPassword"
                                name="confirmPassword"
                                label="Confirm new password"
                                placeholder="Confirm your new password"
                                isRequired={true}
                                error={passwordError}
                                onChange={() => setPasswordError("")}
                            />
                            <Button variant="blue" size="normal" className="w-full!" disabled={!isFormValid}>
                                Sign in
                            </Button>
                        </Form>
                    </Card.Body>
                ) : (
                    <Card.Body className="flex flex-col gap-6">
                        <div className="flex justify-center gap-3">
                            <Icon icon={LockOutlinedIcon} size="iconHero" variant="dark-blue" />
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
