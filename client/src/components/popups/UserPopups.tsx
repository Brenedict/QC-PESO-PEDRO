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
import { usersData, type UserRecord } from "../../data/users";
import ChoiceItem from "../ChoiceItem";

function PopupUserForms({ formId, user }: { formId: string; user?: UserRecord }) {
    // Temporary lang yung logic neto (binase ko sa dummy data ni richard)
    return (
        <Form method="post" id={formId} className="grid grid-cols-2 h-fit gap-4">
            {/* ID holder */}
            {user && <GeneralInput hidden={true} name="id" type="text" value={user.id} />}

            <div className="col-span-2">
                <GeneralInput
                    type="text"
                    label="Full Name"
                    id="fullName"
                    name="fullName"
                    defaultValue={user ? `${user.firstName} ${user.lastName}` : ""}
                    required
                />
            </div>
            <GeneralInput
                type="email"
                label="QC Government Email"
                placeholder="name@quezoncity.gov.ph"
                id="email"
                name="email"
                defaultValue={user?.email ?? ""}
            />
            <GeneralInput
                type="text"
                label="Username"
                id="userName"
                name="userName"
                defaultValue={user?.username ?? ""}
            />
            <SelectInput
                defaultValue={user?.role ?? "frontline"}
                label="Role"
                id="role"
                name="role"
                optionList={[
                    { content: "Super Administrator", value: "superadmin" },
                    { content: "Administrator", value: "admin" },
                    { content: "Frontline Encoder", value: "frontline" },
                ]}
            />
            <SelectInput
                defaultValue={user?.status ?? "active"}
                label="Status"
                id="status"
                name="status"
                optionList={[
                    { content: "Active", value: "active" },
                    { content: "Inactive", value: "inactive" },
                ]}
            />
            <GeneralInput type="text" label="Position" placeholder="e.g. LEO I" id="position" name="position" />
            <GeneralInput
                type="text"
                label="Assigned Office"
                placeholder="e.g. PESO"
                id="assignedOffice"
                name="assignedOffice"
            />

            {!user && (
                <div className="col-span-2">
                    <PasswordInput
                        label="Temporary Password"
                        placeholder="Will require reset on first login"
                        id="password"
                        name="password"
                    />
                </div>
            )}
        </Form>
    );
}

export function PopupAddUser() {
    const navigate = useNavigateDefault();

    return (
        <Dialog dropShadow={true} onClose={() => navigate(ROUTES.userManagement.root, true)}>
            <Dialog.Header toggleRightIcon={true} onRightAction={() => navigate(ROUTES.userManagement.root, true)}>
                <Text weight="bold">Add New User</Text>
            </Dialog.Header>
            <Dialog.Body className="p-6!">
                <PopupUserForms formId="userFormViewEdit" />
            </Dialog.Body>
            <Dialog.Footer className="flex gap-3 justify-end">
                <PopupButton variant="white-black" onClick={() => navigate(ROUTES.userManagement.root, true)}>
                    Cancel
                </PopupButton>
                <PopupButton variant="blue" type="submit" form="userFormViewEdit">
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
                <Text weight="bold">
                    {" "}
                    Edit User: {user.firstName} {user.lastName}{" "}
                </Text>
            </Dialog.Header>
            <Dialog.Body className="p-6!">
                <PopupUserForms formId="userFormViewEdit" user={user} />
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
                        Are you sure you want to deactivate{" "}
                        <span className="font-bold text-black">
                            {" "}
                            {user.firstName} {user.lastName}{" "}
                        </span>
                        ?
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
                        <div className="text-black font-bold">
                            {" "}
                            {user.firstName} {user.lastName}{" "}
                        </div>
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
                        {user.firstName} {user.lastName}
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
