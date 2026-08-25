// General Imports
import { Form, Link } from "react-router";
import { useState } from "react";

// Components
import Button from "../components/Button";
import { Text } from "../components/Text";
import { Card } from "../components/Card";
import Icon from "../components/Icon";
import { GeneralInput } from "../components/Input";

// Material UI Icons
import EmailIcon from "@mui/icons-material/Email";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

// Custom Hooks
import { ROUTES } from "../hooks/reroute";

export function ForgotPassword({ onSubmit }: { onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) {
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const handleFormChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        setIsFormValid(e.currentTarget.checkValidity());
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const isStatusSucess = (await onSubmit(e)) ?? false;

        if (isStatusSucess) {
            setIsSuccessful(true);
        }
    };

    return (
        <main className="flex flex-col justify-center items-center h-screen w-screen">
            <Card className="max-w-[980px]">
                {!isSuccessful ? (
                    <Card.Body className="flex flex-col gap-6 p-10">
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

                            <div className="flex gap-4">
                                <Button variant="opaque-blue" size="normal" className="w-full!">
                                    <Link to={ROUTES.auth.root}>Return to Login</Link>
                                </Button>
                                <Button variant="blue" size="normal" className="w-full!" disabled={!isFormValid}>
                                    Send Link
                                </Button>
                            </div>
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

                        <Button variant="blue" size="normal" className="w-full!">
                            <Link to={ROUTES.auth.root}>Return to Login</Link>
                        </Button>
                    </Card.Body>
                )}
            </Card>
        </main>
    );
}
