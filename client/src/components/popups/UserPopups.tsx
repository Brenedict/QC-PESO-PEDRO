// General Imports
import { Form, useLoaderData } from "react-router";
import { useState, type ReactNode } from "react";
import type { Role, Shift } from "@qcpesopedro/shared/prisma/browser";
import type { User } from "@qcpesopedro/shared/prisma/browser";

// Components
import { Dialog } from "../Dialog";
import { Text } from "../Text";
import { GeneralInput, SelectInput } from "../Input";
import ChoiceItem from "../ChoiceItem";
import { PopupButton, PopupDescription, PopupHeader, PopupIcon, PopupNotice } from "./PopupPartials";

// Icons
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import RemoveModeratorOutlinedIcon from "@mui/icons-material/RemoveModeratorOutlined";

// Helpers
import { ROUTES, useNavigateDefault } from "../../hooks/reroute";

type PopupUser = {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    role: Role;
    shift: Shift;
};

type PopupUserFormsProps = {
    formId: string;
    user?: PopupUser;
    onChange?: React.FormEventHandler<HTMLFormElement>;
};

function PopupUserForms({ formId, user, onChange }: PopupUserFormsProps) {
    return (
        <Form method="post" id={formId} className="grid grid-cols-2 h-fit gap-4" onChange={onChange}>
            <div className="col-span-2 flex gap-4">
                <GeneralInput
                    type="text"
                    label="First Name"
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    defaultValue={user?.firstName}
                />
                <GeneralInput
                    type="text"
                    label="Last Name"
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    defaultValue={user?.lastName}
                />
            </div>
            <GeneralInput
                type="email"
                label="QC Government Email"
                placeholder="name@quezoncity.gov.ph"
                id="email"
                name="email"
                defaultValue={user?.email}
                required
                isRequired={true}
            />

            <GeneralInput
                type="text"
                label="Username"
                id="username"
                name="username"
                placeholder="John"
                defaultValue={user?.username}
                required
                isRequired={true}
            />

            <SelectInput
                defaultValue={user?.role ?? "FRONTLINE"}
                label="Role"
                id="role"
                name="role"
                required
                isRequired={true}
                optionList={[
                    { content: "Administrator", value: "ADMIN" },
                    { content: "Frontline Encoder", value: "FRONTLINE" },
                ]}
            />

            <SelectInput
                defaultValue={user?.shift ?? "NONE"}
                label="Shift"
                id="shift"
                name="shift"
                optionList={[
                    { content: "None", value: "NONE" },
                    { content: "Morning", value: "MORNING" },
                    { content: "Afternoon", value: "AFTERNOON" },
                ]}
            />
        </Form>
    );
}
export function PopupAddUser() {
    const navigate = useNavigateDefault();
    const isoDate = new Date().toISOString().split("T")[0];

    // Form Validation
    const [isFormValid, setIsFormValid] = useState(false);
    const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
        setIsFormValid(e.currentTarget.checkValidity());
    };

    return (
        <Dialog dropShadow={true} onClose={() => navigate(ROUTES.userManagement.root, true)}>
            <Dialog.Header toggleRightIcon={true} onRightAction={() => navigate(ROUTES.userManagement.root, true)}>
                <Text weight="bold">Add New User</Text>
            </Dialog.Header>
            <Dialog.Body className="p-6! flex flex-col gap-4">
                <PopupUserForms formId="userFormCreateUser" onChange={handleFormChange} />
                <PopupNotice
                    additionalSection={
                        <Text align="center" size="description" weight="bold" variant="red">
                            Temporary Password:
                        </Text>
                    }
                >
                    QCPESO-FIRSTNAME-LASTNAME-CURRENTDATE
                </PopupNotice>
                <PopupNotice
                    variant="off-white"
                    additionalSection={
                        <Text align="center" size="description" weight="bold" variant="grayish-blue">
                            Example:
                        </Text>
                    }
                >{`QCPESO-JOHNBENEDICT-DOE-${isoDate}`}</PopupNotice>
            </Dialog.Body>
            <Dialog.Footer className="flex gap-3 justify-end">
                <PopupButton variant="white-black" onClick={() => navigate(ROUTES.userManagement.root, true)}>
                    Cancel
                </PopupButton>
                <PopupButton variant="blue" type="submit" form="userFormCreateUser" disabled={!isFormValid}>
                    Create User
                </PopupButton>
            </Dialog.Footer>
        </Dialog>
    );
}

export function PopupEditUser() {
    const navigate = useNavigateDefault();

    const user = useLoaderData() as User;
    if (!user) return null;

    // Form Validation
    const [isFormValid, setIsFormValid] = useState(false);
    const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
        setIsFormValid(e.currentTarget.checkValidity());
    };

    return (
        <Dialog dropShadow={true} onClose={() => navigate(ROUTES.userManagement.root, true)}>
            <Dialog.Header toggleRightIcon={true} onRightAction={() => navigate(ROUTES.userManagement.root, true)}>
                <Text weight="bold">{`${user.firstName} ${user.lastName}`}</Text>
            </Dialog.Header>
            <Dialog.Body className="p-6!">
                <PopupUserForms formId="userFormViewEdit" user={user} onChange={handleFormChange} />
            </Dialog.Body>
            <Dialog.Footer className="flex gap-3 justify-end">
                <PopupButton variant="white-black" onClick={() => navigate(ROUTES.userManagement.root, true)}>
                    Cancel
                </PopupButton>
                {/* Disable the button if they delete a required field */}
                <PopupButton variant="blue" type="submit" form="userFormViewEdit" disabled={!isFormValid}>
                    Save Changes
                </PopupButton>
            </Dialog.Footer>
        </Dialog>
    );
}

export function PopupDisableUser() {
    const navigate = useNavigateDefault();

    const user = useLoaderData() as User;
    if (!user) return null;

    return (
        <Dialog dropShadow={true} onClose={() => navigate(ROUTES.userManagement.root, true)}>
            <Dialog.Body className="p-6!">
                <Form method="post" id="userFormViewDisable" className="flex flex-col h-fit gap-6">
                    <GeneralInput hidden={true} name="status" type="text" value={"DISABLED"}></GeneralInput>
                </Form>
                <section className="flex flex-col justify-center max-w-md">
                    <PopupIcon icon={PersonOffOutlinedIcon} />
                    <PopupHeader>Deactivate Account?</PopupHeader>
                    <PopupDescription>
                        Are you sure you want to deactivate{" "}
                        <span className="font-bold text-black">{`${user.firstName} ${user.lastName}`}</span>?
                    </PopupDescription>
                    <PopupNotice>This user will no longer be able to log into the system.</PopupNotice>
                </section>
            </Dialog.Body>
            <Dialog.Footer className="flex gap-3 justify-end">
                <PopupButton variant="white-black" onClick={() => navigate(ROUTES.userManagement.root, true)}>
                    Cancel
                </PopupButton>
                <PopupButton variant="red" form="userFormViewDisable" type="submit">
                    Confirm
                </PopupButton>
            </Dialog.Footer>
        </Dialog>
    );
}

const userPrivilegeMap = {
    promote: {
        icon: ShieldOutlinedIcon,
        header: "Promote to Administrator?",
        description: "Are you sure you want to grant Administrator privileges to this employee?",
        notice: (
            <>
                Frontline Encoder → <span className="text-primary-blue font-bold">Administrator</span>
            </>
        ),
        btnText: "Confirm Promotion",
    },
    demote: {
        icon: RemoveModeratorOutlinedIcon,
        header: "Demote to Frontline Encoder?",
        description: "Are you sure you want to reduce Administrator privileges of this employee to Frontline Encoder?",
        notice: (
            <>
                <span className="text-primary-blue font-bold">Administrator</span> → Frontline Encoder
            </>
        ),
        btnText: "Confirm Demotion",
    },
};

type UserPrivilegeType = keyof typeof userPrivilegeMap;

export function PopupUserPriveleges({ privilegeType }: { privilegeType: UserPrivilegeType }) {
    const navigate = useNavigateDefault();

    const user = useLoaderData() as User;
    if (!user) return null;

    return (
        <Dialog dropShadow={true} onClose={() => navigate(ROUTES.userManagement.root, true)}>
            <Dialog.Body className="p-6!">
                <Form method="post" id="userFormPrivilege" className="flex flex-col h-fit gap-6">
                    <GeneralInput
                        type="text"
                        id="role"
                        name="role"
                        defaultValue={privilegeType == "promote" ? "ADMIN" : "FRONTLINE"}
                    />
                </Form>
                <section className="flex flex-col justify-center max-w-md">
                    <PopupIcon icon={userPrivilegeMap[privilegeType].icon} variant="blue" />
                    <PopupHeader>{userPrivilegeMap[privilegeType].header}</PopupHeader>
                    <PopupDescription>{userPrivilegeMap[privilegeType].description}</PopupDescription>
                    <PopupNotice
                        variant="off-white"
                        additionalSection={
                            <div className="text-black font-bold text-center">
                                <span className="font-bold text-black">{`${user.firstName} ${user.lastName}`}</span>
                            </div>
                        }
                    >
                        {userPrivilegeMap[privilegeType].notice}
                    </PopupNotice>
                </section>
            </Dialog.Body>
            <Dialog.Footer className="flex gap-3 justify-end">
                <PopupButton variant="white-black" onClick={() => navigate(ROUTES.userManagement.root, true)}>
                    Cancel
                </PopupButton>
                <PopupButton variant="blue" form="userFormPrivilege" type="submit">
                    {userPrivilegeMap[privilegeType].btnText}
                </PopupButton>
            </Dialog.Footer>
        </Dialog>
    );
}

function PopupRadio({
    value,
    defaultChecked = false,
    children,
}: {
    value: string;
    defaultChecked?: boolean;
    children: ReactNode;
}) {
    return (
        <div className="border border-off-white-border bg-off-white p-3 rounded-xl">
            <ChoiceItem inputVariant="radio" name="resetType" value={value} defaultChecked={defaultChecked}>
                {children}
            </ChoiceItem>
        </div>
    );
}

export function PopupResetUser() {
    const navigate = useNavigateDefault();

    const user = useLoaderData() as User;
    if (!user) return null;

    return (
        <Dialog dropShadow={true} onClose={() => navigate(ROUTES.userManagement.root, true)}>
            <Dialog.Header toggleRightIcon={true} onRightAction={() => navigate(ROUTES.userManagement.root, true)}>
                <Text weight="bold">Reset Password</Text>
            </Dialog.Header>
            <Dialog.Body className="p-6!">
                <Form method="post" id="userFormResetPassword" className="flex flex-col h-fit gap-6"></Form>
                <section className="flex flex-col justify-center max-w-md">
                    <Text variant="dark-blue" weight="bold" size="normal">
                        {`${user.firstName} ${user.lastName}`}
                    </Text>
                    <Text variant="dark-blue" weight="normal" size="description">
                        {user.email}
                    </Text>
                    <br className="block mb-4" />
                    <PopupRadio value="generate" defaultChecked={true}>
                        Generate Temporary Password
                    </PopupRadio>
                </section>
            </Dialog.Body>
            <Dialog.Footer className="flex gap-3 justify-end">
                <PopupButton variant="white-black" onClick={() => navigate(ROUTES.userManagement.root, true)}>
                    Cancel
                </PopupButton>
                <PopupButton variant="blue" form="userFormResetPassword" type="submit">
                    Reset Password
                </PopupButton>
            </Dialog.Footer>
        </Dialog>
    );
}
