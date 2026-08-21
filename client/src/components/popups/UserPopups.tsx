// General Imports
import { Form, useLoaderData } from "react-router";
import { useState, type ReactNode } from "react";
import type { Role, Shift } from "@qcpesopedro/shared/prisma/client";
import type { User } from "@qcpesopedro/shared/prisma/browser";

// Components
import { Dialog } from "../Dialog";
import { Text } from "../Text";
import { GeneralInput, SelectInput } from "../Input";
import ChoiceItem from "../ChoiceItem";
import { PopupButton, PopupDescription, PopupHeader, PopupIcon, PopupNotice } from "./PopupPartials";
import { PasswordInput } from "../Input";

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

export function PopupManageUser() {
    const navigate = useNavigateDefault();
    const user = useLoaderData() as User;

    // Check if the user is already disabled
    const isCurrentlyDisabled = user?.status === "DISABLED";

    // Set the default selection that is based on their current status
    const [actionType, setActionType] = useState<"deactivate" | "reactivate" | "delete">(
        isCurrentlyDisabled ? "reactivate" : "deactivate"
    );

    if (!user) return null;

    return (
        <Dialog dropShadow={true} onClose={() => navigate(ROUTES.userManagement.root, true)}>
            <Dialog.Header toggleRightIcon={true} onRightAction={() => navigate(ROUTES.userManagement.root, true)}>
                <Text weight="bold">Manage Account</Text>
            </Dialog.Header>
            <Dialog.Body className="p-6!">
                <Form method="post" id="userFormManage" className="flex flex-col h-fit gap-4">
                    <input type="hidden" name="manageAction" value={actionType} />

                    <Text variant="dark-blue" weight="bold" size="normal">
                        {`${user.firstName} ${user.lastName}`}
                    </Text>

                    <div className="flex flex-col gap-3 mt-2">
                        {isCurrentlyDisabled ? (
                            <div onClick={() => setActionType("reactivate")}>
                                <PopupRadio value="reactivate" defaultChecked={true}>
                                    <div className="flex flex-col text-left pl-1">
                                        <span className="font-bold text-green-600">Reactivate account</span>
                                        <span className="text-description text-grayish-blue mt-1">
                                            This will restore the user's access. The user will be marked as{" "}
                                            <span className="font-bold">ACTIVE</span> and can log into the system again.
                                        </span>
                                    </div>
                                </PopupRadio>
                            </div>
                        ) : (
                            <div onClick={() => setActionType("deactivate")}>
                                <PopupRadio value="deactivate" defaultChecked={true}>
                                    <div className="flex flex-col text-left pl-1">
                                        <span className="font-bold text-black">Deactivate account</span>
                                        <span className="text-description text-grayish-blue mt-1">
                                            Deactivating this account is temporary. The user will be marked as{" "}
                                            <span className="font-bold">DISABLED</span> and will be unable to log into
                                            the system.
                                        </span>
                                    </div>
                                </PopupRadio>
                            </div>
                        )}

                        {/* Delete Option */}
                        <div onClick={() => setActionType("delete")}>
                            <PopupRadio value="delete" defaultChecked={false}>
                                <div className="flex flex-col text-left pl-1">
                                    <span className="font-bold text-red-500">Delete account</span>
                                    <span className="text-description text-grayish-blue mt-1">
                                        Deleting this account is permanent. All associated data will be removed from the
                                        database and cannot be retrieved.
                                    </span>
                                </div>
                            </PopupRadio>
                        </div>
                    </div>
                </Form>
            </Dialog.Body>
            <Dialog.Footer className="flex gap-3 justify-end mt-4">
                <PopupButton variant="white-black" onClick={() => navigate(ROUTES.userManagement.root, true)}>
                    Cancel
                </PopupButton>
                <PopupButton variant={actionType === "delete" ? "red" : "blue"} form="userFormManage" type="submit">
                    Continue
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
    name = "radioGroup",
    defaultChecked = false,
    children,
}: {
    value: string;
    name?: string;
    defaultChecked?: boolean;
    children: ReactNode;
}) {
    return (
        <div className="border border-off-white-border bg-off-white p-3 rounded-xl cursor-pointer hover:bg-[#F3FAFC] transition-colors">
            <ChoiceItem inputVariant="radio" name={name} value={value} defaultChecked={defaultChecked}>
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

export function PopupChangePassword() {
    const navigate = useNavigateDefault();
    const [passwordError, setPasswordError] = useState("");

    const validatePasswords = (e: React.FormEvent<HTMLFormElement>) => {
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
        <Dialog dropShadow={true} onClose={() => navigate(ROUTES.profile.root, true)}>
            <Dialog.Header toggleRightIcon={true} onRightAction={() => navigate(ROUTES.profile.root, true)}>
                <Text weight="bold">Change Password</Text>
            </Dialog.Header>
            <Dialog.Body className="p-6!">
                <Form
                    method="post"
                    id="userFormChangePassword"
                    onSubmit={validatePasswords}
                    className="flex flex-col h-fit gap-4"
                >
                    <PasswordInput
                        id="currentPassword"
                        name="currentPassword"
                        label="Current password"
                        placeholder="Enter your current password"
                        isRequired={true}
                    />

                    <div className="flex justify-end -mt-3 mb-2">
                        <Text size="small" variant="primary-blue" className="cursor-pointer hover:underline">
                            Don't know your password?
                        </Text>
                    </div>

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
                </Form>
            </Dialog.Body>
            <Dialog.Footer className="flex gap-3 justify-end mt-2">
                <PopupButton variant="white-black" onClick={() => navigate(ROUTES.profile.root, true)}>
                    Cancel
                </PopupButton>
                <PopupButton variant="blue" type="submit" form="userFormChangePassword">
                    Change Password
                </PopupButton>
            </Dialog.Footer>
        </Dialog>
    );
}