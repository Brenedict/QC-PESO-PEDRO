// General Imports
import { Form, useLoaderData, useParams } from "react-router";
import { useState } from "react";

// PEDRO SHARED IMPORTS
import { TransactionScalarFieldEnum } from "@qcpesopedro/shared/prisma/internal/prismaNamespaceBrowser";
import type { Transaction } from "@qcpesopedro/shared/prisma/browser";

// Components
import { Dialog } from "..//Dialog";
import { Text } from "../Text";
import { GeneralInput } from "../Input";
import { FormRow1, FormRow2, FormRow3, FormRow4 } from "../../pages/TransactionsInputPage";
import { PopupButton, PopupDescription, PopupHeader, PopupIcon, PopupNotice } from "./PopupPartials";

// Material UI Icons
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// Custom Hooks
import { ROUTES, useNavigateDefault, type transactionRootPage } from "../../hooks/reroute";

// Utils
import { decode } from "../../utils/hashids";

export function PopupViewEditTransaction({ root = "history" }: { root: transactionRootPage }) {
    const navigate = useNavigateDefault();
    const { transactionId } = useParams();
    const [isFormValid, setIsFormValid] = useState(false);
    const transaction = useLoaderData().transaction as Transaction;

    if (!transactionId) return null;

    const decodedId = decode(transactionId);
    const returnPageOnClose = root == "history" ? ROUTES.history.root : ROUTES.applicantForm.root;

    // Form Validation
    const handleFormChange = (e: React.SubmitEvent<HTMLFormElement>) => {
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
                    <FormRow1
                        applicantFirstName={transaction?.applicantFirstName}
                        applicantLastName={transaction?.applicantLastName}
                    />
                    <FormRow2
                        transactionType={transaction?.transactionType}
                        transactionOutcome={transaction?.transactionOutcome}
                        applicantSex={transaction?.applicantSex}
                    />
                    <FormRow3 demographics={transaction?.demographics} />
                    <FormRow4 remarks={transaction?.remarks ? transaction.remarks : undefined} />
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
                    <GeneralInput
                        hidden={true}
                        name={TransactionScalarFieldEnum.txCode}
                        type="text"
                        defaultValue={decodedId as string}
                    />
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
