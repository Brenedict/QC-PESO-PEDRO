// General Imports
import { Form, useParams } from "react-router";
import { useState } from "react";

// Hooks
import { ROUTES, useNavigateDefault, type transactionRootPage } from "../../hooks/reroute";

// Components
import { Dialog } from "..//Dialog";
import { Text } from "../Text";
import { GeneralInput } from "../Input";
import { FormRow1, FormRow2, FormRow3, FormRow4 } from "../../pages/TransactionsInputPage";

// Icons
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// Test Data
import { decode } from "../../utils/hashids";
import { PopupButton, PopupDescription, PopupHeader, PopupIcon, PopupNotice } from "./PopupPartials";

export function PopupViewEditTransaction({ root = "history" }: { root: transactionRootPage }) {
    const navigate = useNavigateDefault();
    const { transactionId } = useParams();
    const [isFormValid, setIsFormValid] = useState(true);
    if (!transactionId) return null;
    const decodedId = decode(transactionId);
    const returnPageOnClose = root == "history" ? ROUTES.history.root : ROUTES.applicantForm.root;
    const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
        setIsFormValid(e.currentTarget.checkValidity());
    };

    return (
        <Dialog dropShadow={true} onClose={() => navigate(returnPageOnClose, true)}>
            <Dialog.Header toggleRightIcon={true} onRightAction={() => navigate(returnPageOnClose, true)}>
                <Text weight="bold">Edit Transaction: {decodedId}</Text>
            </Dialog.Header>
            <Dialog.Body>
                {/* Added onChange handler here */}
                <Form
                    method="patch"
                    id="transactionsFormViewEdit"
                    className="flex flex-col h-fit gap-6"
                    onChange={handleFormChange}
                >
                    <GeneralInput hidden={true} name="id" type="text" defaultValue={transactionId}></GeneralInput>
                    <FormRow1 />
                    <FormRow2 />
                    <FormRow3 />
                    <FormRow4 />
                </Form>
            </Dialog.Body>
            <Dialog.Footer className="flex gap-3 justify-end">
                <PopupButton variant="white-black" onClick={() => navigate(returnPageOnClose, true)}>
                    Cancel
                </PopupButton>
                <PopupButton type="submit" form="transactionsFormViewEdit" disabled={!isFormValid}>
                    Save Changes
                </PopupButton>
            </Dialog.Footer>
        </Dialog>
    );
}

export function PopupDeleteTransaction({ root = "history" }: { root: transactionRootPage }) {
    const navigate = useNavigateDefault();
    const { transactionId } = useParams();

    if (!transactionId) return null;

    const decodedId = decode(transactionId);

    // Determines reroute on cancel between transactionEntry & transactionHistory page
    const returnPageOnClose = root == "history" ? ROUTES.history.root : ROUTES.applicantForm.root;

    return (
        <Dialog dropShadow={true} onClose={() => navigate(returnPageOnClose, true)}>
            <Dialog.Body className="p-6!">
                <Form method="post" id="transactionsFormDelete" className="flex flex-col h-fit gap-6">
                    {/* ID holder */}
                    <GeneralInput hidden={true} name="id" type="text" defaultValue={transactionId}></GeneralInput>
                </Form>
                <section className="flex flex-col justify-center max-w-md">
                    <PopupIcon icon={DeleteOutlineOutlinedIcon} />
                    <PopupHeader>Delete Transaction?</PopupHeader>
                    <PopupDescription>
                        Are you sure you want to delete transaction{" "}
                        <span className="font-bold text-black">{decodedId}</span>?
                    </PopupDescription>
                    <PopupNotice>This action cannot be undone and will be logged.</PopupNotice>
                </section>
            </Dialog.Body>
            <Dialog.Footer className="flex gap-3 justify-end">
                <PopupButton variant="white-black" onClick={() => navigate(returnPageOnClose, true)}>
                    Cancel
                </PopupButton>
                <PopupButton variant="red" form="transactionsFormDelete" type="submit">
                    Confirm Delete
                </PopupButton>
            </Dialog.Footer>
        </Dialog>
    );
}
