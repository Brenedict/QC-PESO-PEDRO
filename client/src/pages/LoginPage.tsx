import Icon from "../components/Icon";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import CasesOutlinedIcon from "@mui/icons-material/CasesOutlined";
import { Text } from "../components/Text";
import { Form, Link } from "react-router";
import { GeneralInput, PasswordInput, SelectInput } from "../components/Input";
import ChoiceItem from "../components/ChoiceItem";
import Button from "../components/Button";
import PesoLogo from "../assets/peso.jpg";

interface FormProps {
    onSubmit: React.SubmitEventHandler<HTMLFormElement>;
}

function HeroIcons({ className }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={`flex gap-6 justify-center items-center ${className}`}>
            <Icon icon={ApartmentOutlinedIcon} size="iconHero" variant="white"></Icon>
            <Icon icon={PeopleAltOutlinedIcon} size="iconHero" variant="white"></Icon>
            <Icon icon={CasesOutlinedIcon} size="iconHero" variant="white"></Icon>
        </div>
    );
}

function HeroText({ className }: React.HTMLAttributes<HTMLElement>) {
    return (
        <header className={className}>
            <h1 className="mb-6">
                <Text size="giant" weight="bold" variant="white" align="center">
                    Empowering QC Citizens
                </Text>
            </h1>

            <Text size="medium" weight="normal" variant="white" align="center">
                The central hub for managing employment services, and career development programs for the Quezon City
                Public Employment Service Office.
            </Text>
        </header>
    );
}

function LeftSection() {
    return (
        <section className="bg-primary-blue flex justify-center items-center relative w-1/2 p-8">
            <div className="max-w-116">
                <HeroIcons className="mb-8" />
                <HeroText />
            </div>

            {/* Copyright Text */}
            <p className="absolute bottom-8 left-8">
                <Text size="small" weight="normal" variant="white">
                    Quezon City Government © 2026
                </Text>
            </p>
        </section>
    );
}

function MainHeader({ className }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={className}>
            <div className="flex justify-center">
                <img src={PesoLogo} alt="Public Employment Division Office" className="h-48 mb-6" />
            </div>
            <h1 className="mb-2">
                <Text variant="dark-blue" size="bigger" weight="bold" align="center">
                    PED System
                </Text>
            </h1>
            <Text variant="grayish-blue" size="normal" weight="medium" align="center">
                Daily Monitoring and Tracking System
            </Text>
        </div>
    );
}

function LoginForm({ onSubmit }: FormProps) {
    return (
        <Form method="POST" onSubmit={onSubmit}>
            <GeneralInput
                type="email"
                name="email"
                id="email"
                label="QC Government Email"
                placeholder="Enter your email here"
            />

            <br className="block mb-4" />

            <PasswordInput name="password" id="password" label="Password" placeholder="Enter your password here" />

            <br className="block mb-4" />

            <SelectInput
                label="Account"
                name="role"
                id="role"
                optionList={[
                    { content: "Frontline Encoder", value: "frontline" },
                    { content: "Administrator", value: "admin" },
                ]}
            />

            <br className="block mb-30" />

            <div className="flex justify-between mb-6">
                <ChoiceItem inputVariant="checkbox" stylized={false}>
                    Remember me
                </ChoiceItem>
                <Link to="/forgot" className="hover:underline ">
                    <Text weight="medium" variant="primary-blue" size="description">
                        Forgot your password?
                    </Text>
                </Link>
            </div>

            <Button variant="blue" size="normal" className="w-full">
                Sign in
            </Button>
        </Form>
    );
}

function RightSection({ onSubmit }: FormProps) {
    return (
        <section className="flex flex-col px-4 pt-24 pb-8 md:px-14 lg:px-20 xl:px-38 2xl:px-60 w-1/2 relative">
            <MainHeader className="mb-8" />
            <LoginForm onSubmit={onSubmit} />
            <p className="mt-auto">
                <Text size="small" variant="grayish-blue" weight="normal" align="center">
                    v2.0.1 • QC PESO Public Employment Division
                </Text>
            </p>
        </section>
    );
}
function LoginPage({ onSubmit }: FormProps) {
    return (
        <main className="flex h-screen ">
            <LeftSection />
            <RightSection onSubmit={onSubmit} />
        </main>
    );
}

export default LoginPage;
