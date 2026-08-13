import { Form, useParams } from "react-router";
import { ROUTES, useNavigateDefault } from "../../hooks/reroute";
import { decode } from "../../utils/hashids";
import { Dialog } from "../Dialog";
import { Text } from "../Text";
import { PopupButton, PopupDescription, PopupHeader, PopupIcon, PopupNotice } from "./PopupPartials";
import { GeneralInput, PasswordInput, SelectInput } from "../Input";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import type { ReactNode } from "react";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import RemoveModeratorOutlinedIcon from "@mui/icons-material/RemoveModeratorOutlined";
import { usersData } from "../../data/users";
import ChoiceItem from "../ChoiceItem";
import type { UserSchemaType } from "@qcpesopedro/shared/schema/users";

function PopupUserForms({ formId, user }: { formId: string; user?: UserSchemaType }) {
    // Temporary lang yung logic neto (binase ko sa dummy data ni richard)
    return (
        <Form method="post" id={formId} className="grid grid-cols-2 h-fit gap-4">
            {/* ID holder */}
            {user && <GeneralInput hidden={true} name="id" type="text" value={user.id} />}

            <div className="col-span-2 flex gap-4">
                <GeneralInput
                    type="text"
                    label="First Name"
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    value={user?.firstName}
                />
                <GeneralInput
                    type="text"
                    label="Last Name"
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    value={user?.lastName}
                />
            </div>
            <GeneralInput
                type="email"
                label="QC Government Email"
                placeholder="name@quezoncity.gov.ph"
                id="email"
                name="email"
                value={user?.email}
            />
            <GeneralInput
                type="text"
                label="Username"
                id="username"
                name="username"
                placeholder="John"
                value={user?.username}
            />

            {/* Under ng Role sa types/common.ts */}
            <SelectInput
                value={user?.role ?? "FRONTLINE"}
                label="Role"
                id="role"
                name="role"
                optionList={[
                    { content: "Administrator", value: "ADMIN" },
                    { content: "Frontline Encoder", value: "FRONTLINE" },
                ]}
            />

            <SelectInput
                value={user?.shift ?? "active"}
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
    return (
        <Dialog dropShadow={true} onClose={() => navigate(ROUTES.userManagement.root, true)}>
            <Dialog.Header toggleRightIcon={true} onRightAction={() => navigate(ROUTES.userManagement.root, true)}>
                <Text weight="bold">Add New User</Text>
            </Dialog.Header>
            <Dialog.Body className="p-6! flex flex-col gap-4">
                <PopupUserForms formId="userFormCreateUser" />
                <PopupNotice>Temporary Password: QCPESO-FIRSTNAME-LASTNAME-CURRENTDATE</PopupNotice>
                <PopupNotice variant="off-white">{`QCPESO-JOHN-DOE-${isoDate}`}</PopupNotice>
            </Dialog.Body>
            <Dialog.Footer className="flex gap-3 justify-end">
                <PopupButton variant="white-black" onClick={() => navigate(ROUTES.userManagement.root, true)}>
                    Cancel
                </PopupButton>
                <PopupButton variant="blue" type="submit" form="userFormCreateUser">
                    Create User
                </PopupButton>
            </Dialog.Footer>
        </Dialog>
    );
}

export function PopupEditUser() {
    const navigate = useNavigateDefault();
    const { userId } = useParams();

    if (!userId) return null;

    const decodedId = decode(userId);

    const user = usersData.find((user) => user.id === decodedId);
    if (!user) return null;

    return (
        <Dialog dropShadow={true} onClose={() => navigate(ROUTES.userManagement.root, true)}>
            <Dialog.Header toggleRightIcon={true} onRightAction={() => navigate(ROUTES.userManagement.root, true)}>
                <Text weight="bold">Edit User: {user.name}</Text>
            </Dialog.Header>
            <Dialog.Body className="p-6!">
                <PopupUserForms formId="userFormViewEdit" />
            </Dialog.Body>
            <Dialog.Footer className="flex gap-3 justify-end">
                <PopupButton variant="white-black" onClick={() => navigate(ROUTES.userManagement.root, true)}>
                    Cancel
                </PopupButton>
                <PopupButton variant="blue" type="submit" form="userFormViewEdit">
                    Save Changes
                </PopupButton>
            </Dialog.Footer>
        </Dialog>
    );
}

export function PopupDisableUser() {
    const navigate = useNavigateDefault();
    const { userId } = useParams();

    if (!userId) return null;

    const decodedId = decode(userId);
    const user = usersData.find((user) => user.id === decodedId);
    if (!user) return null;

    return (
        <Dialog dropShadow={true} onClose={() => navigate(ROUTES.userManagement.root, true)}>
            <Dialog.Body className="p-6!">
                <Form method="post" id="userFormViewDisable" className="flex flex-col h-fit gap-6">
                    {/* ID holder */}
                    <GeneralInput hidden={true} name="id" type="text" defaultValue={userId}></GeneralInput>
                </Form>
                <section className="flex flex-col justify-center max-w-md">
                    <PopupIcon icon={PersonOffOutlinedIcon} />
                    <PopupHeader>Deactivate Account?</PopupHeader>
                    <PopupDescription>
                        Are you sure you want to deactivate <span className="font-bold text-black">{user.name}</span>?
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
    const { userId } = useParams();

    if (!userId) return null;

    const decodedId = decode(userId);
    const user = usersData.find((user) => user.id === decodedId);
    if (!user) return null;

    return (
        <Dialog dropShadow={true} onClose={() => navigate(ROUTES.userManagement.root, true)}>
            <Dialog.Body className="p-6!">
                <Form method="post" id="userFormViewDisable" className="flex flex-col h-fit gap-6">
                    {/* ID holder */}
                    <GeneralInput hidden={true} name="id" type="text" defaultValue={userId}></GeneralInput>
                </Form>
                <section className="flex flex-col justify-center max-w-md">
                    <PopupIcon icon={userPrivilegeMap[privilegeType].icon} variant="blue" />
                    <PopupHeader>{userPrivilegeMap[privilegeType].header}</PopupHeader>
                    <PopupDescription>{userPrivilegeMap[privilegeType].description}</PopupDescription>
                    <PopupNotice variant="off-white">
                        <div className="text-black font-bold">{user.name}</div>
                        {userPrivilegeMap[privilegeType].notice}
                    </PopupNotice>
                </section>
            </Dialog.Body>
            <Dialog.Footer className="flex gap-3 justify-end">
                <PopupButton variant="white-black" onClick={() => navigate(ROUTES.userManagement.root, true)}>
                    Cancel
                </PopupButton>
                <PopupButton variant="blue" form="userFormViewDisable" type="submit">
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
    const { userId } = useParams();

    if (!userId) return null;

    const decodedId = decode(userId);
    const user = usersData.find((user) => user.id === decodedId);
    if (!user) return null;

    return (
        <Dialog dropShadow={true} onClose={() => navigate(ROUTES.userManagement.root, true)}>
            <Dialog.Header toggleRightIcon={true} onRightAction={() => navigate(ROUTES.userManagement.root, true)}>
                <Text weight="bold">Reset Password</Text>
            </Dialog.Header>
            <Dialog.Body className="p-6!">
                <Form method="post" id="userFormViewDisable" className="flex flex-col h-fit gap-6">
                    {/* ID holder */}
                    <GeneralInput hidden={true} name="id" type="text" defaultValue={userId}></GeneralInput>
                </Form>
                <section className="flex flex-col justify-center max-w-md">
                    <Text variant="dark-blue" weight="bold" size="normal">
                        {user.name}
                    </Text>
                    <Text variant="dark-blue" weight="normal" size="description">
                        {user.email}
                    </Text>
                    <br className="block mb-4" />
                    <PopupRadio value="generate" defaultChecked={true}>
                        Generate Temporary Password
                    </PopupRadio>
                    <br className="block mb-3" />
                    <PopupRadio value="send">Send Password Reset Email</PopupRadio>
                </section>
            </Dialog.Body>
            <Dialog.Footer className="flex gap-3 justify-end">
                <PopupButton variant="white-black" onClick={() => navigate(ROUTES.userManagement.root, true)}>
                    Cancel
                </PopupButton>
                <PopupButton variant="blue" form="userFormViewDisable" type="submit">
                    Reset Password
                </PopupButton>
            </Dialog.Footer>
        </Dialog>
    );
}
