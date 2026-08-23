// General Imports
import { Form, Link, useLoaderData, useSearchParams } from "react-router";

// Components
import Button from "../components/Button";
import { Text } from "../components/Text";
import { Card } from "../components/Card";
import Icon from "../components/Icon";

// Material UI Icons
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import DoneAllIcon from "@mui/icons-material/DoneAll";

// Custom Hooks
import { ROUTES, useNavigateDefault } from "../hooks/reroute";
import { GeneralInput, PasswordInput } from "../components/Input";
import { useState } from "react";

function ExpiredTokenView() {
    return (
        <Card className="">
            <Card.Body className="flex flex-col gap-6">
                <div className="flex flex-col justify-center gap-3">
                    <div className="my-0 mx-auto">
                        <Icon icon={SentimentVeryDissatisfiedIcon} size="iconHero" variant="dark-blue" />
                    </div>
                    <Text size="giant" weight="bold" variant="dark-blue" align="center" className="">
                        This link has expired
                    </Text>
                    <Text size="normal" weight="bold" variant="dark-blue" align="center" className="">
                        Looks like this link took a little too long to use. Password reset links expire quickly to keep
                        your account safe. Tap below to get redirected to a new request.
                    </Text>
                </div>

                <Button variant="blue" size="normal" className="w-full!">
                    <Link to={ROUTES.forgotPassword.root}>Request New Reset Link</Link>
                </Button>
            </Card.Body>
        </Card>
    );
}

function PasswordResetView({
    onSubmit,
}: {
    onSubmit: (formData: FormData, resetToken: string) => Promise<boolean | null>;
}) {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    if (!token) {
        return null;
    }

    const { email } = useLoaderData();

    const [isSuccessful, setIsSuccessful] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const handleFormChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        setIsFormValid(e.currentTarget.checkValidity());
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);
        const newPassword = formData.get("newPassword") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        const isValidPasswords = validatePasswords(newPassword, confirmPassword);

        if (!isValidPasswords) {
            e.preventDefault();
            return;
        }

        const isStatusSucess = (await onSubmit(formData, token)) ?? false;

        if (isStatusSucess) {
            setIsSuccessful(true);
        }
    };

    const validatePasswords = (newPassword: string, confirmPassword: string): boolean => {
        if (newPassword !== confirmPassword) {
            setPasswordError("New password do not match.");
            return false;
        } else {
            setPasswordError("");
            return true;
        }
    };

    return (
        <Card className="">
            {!isSuccessful ? (
                <Card.Body className="flex flex-col gap-6">
                    <div className="flex justify-center gap-3">
                        <Icon icon={LockOutlinedIcon} size="iconHero" variant="dark-blue" />
                        <Text size="giant" weight="bold" variant="dark-blue" align="center" className="">
                            Change your password
                        </Text>
                    </div>
                    <Form
                        method="post"
                        id="userFormChangePassword"
                        onSubmit={handleSubmit}
                        className="flex flex-col h-fit gap-4"
                        onChange={handleFormChange}
                    >
                        {/* Email doesn't get sent with the request, solely for UX purposes */}
                        <GeneralInput type="email" label=" Email" disabled value={email} />

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
                            Save Changes
                        </Button>
                    </Form>
                </Card.Body>
            ) : (
                <Card.Body className="flex flex-col gap-6">
                    <div className="flex justify-center gap-3">
                        <Icon icon={DoneAllIcon} size="iconHero" variant="dark-blue" />
                        <Text size="giant" weight="bold" variant="dark-blue" align="center" className="">
                            Password Changed Successfully
                        </Text>
                    </div>
                    <Text size="medium" variant="grayish-blue" weight="normal" className="mt-2">
                        Your password has been updated. You can now log in using your new credentials.
                    </Text>
                    <Button variant="blue" size="normal" className="w-full!">
                        <Link to={ROUTES.auth.root}>Return to Login</Link>
                    </Button>
                </Card.Body>
            )}
        </Card>
    );
}

export function ResetPassword({
    onSubmit,
}: {
    onSubmit: (formData: FormData, resetToken: string) => Promise<boolean | null>;
}) {
    const { isTokenExpired } = useLoaderData();

    return (
        <main className="flex flex-col justify-center items-center h-screen">
            {isTokenExpired ? <ExpiredTokenView /> : <PasswordResetView onSubmit={onSubmit} />}
        </main>
    );
}
