// General Imports

import { useLoaderData } from "react-router";
import { Outlet } from "react-router";

// Components
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Table from "../components/Table";
import Status from "../components/Status";
import { ActionButtons, ColumnText, DateTime, Identifier } from "../components/TableCells";

// Icons
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";

// Data
import type { Transaction } from "@qcpesopedro/shared/prisma/browser";

// Hooks
import { ROUTES, useNavigateDefault } from "../hooks/reroute";

function TransactionHistory() {
    const data = useLoaderData();
    const navigate = useNavigateDefault();

    const transactions = data.transactions as Transaction[];

    const handleEdit = (id: string) => () => {
        navigate(ROUTES.history.edit(id), true);
    };

    const handleDelete = (id: string) => () => {
        navigate(ROUTES.history.delete(id), true);
    };

    return (
        <>
            <PageHeader primaryText="History Ledger" secondaryText="Comprehensive view of all historical transactions">
                <Button
                    size="small"
                    variant="white-black"
                    leftIcon={{ icon: FileDownloadOutlinedIcon, size: "medium", variant: "black" }}
                >
                    Export
                </Button>
            </PageHeader>

            <Table pagination={true} filterView={true}>
                {/* Header row */}
                <Table.Row>
                    <Table.Header text="ID" />
                    <Table.Header text="Date/Time" />
                    <Table.Header text="Type" />
                    <Table.Header text="Applicant Name" />
                    <Table.Header text="Outcome" />
                    <Table.Header text="Actions" />
                </Table.Row>

                {/* Data rows */}
                {transactions?.map((transaction) => (
                    <Table.Row key={transaction.id}>
                        <Table.Data>
                            <Identifier>{transaction.txCode}</Identifier>
                        </Table.Data>
                        <Table.Data>
                            <DateTime dateTime={new Date(transaction.createdAt)} />
                        </Table.Data>
                        <Table.Data>
                            <Status type="type" variant={transaction.transactionType} />
                        </Table.Data>
                        <Table.Data>
                            <ColumnText>{transaction.applicantFullName}</ColumnText>
                        </Table.Data>
                        <Table.Data>
                            <Status type="outcome" variant={transaction.transactionOutcome} />
                        </Table.Data>
                        <Table.Data>
                            <ActionButtons
                                id={transaction.txCode}
                                actions={[
                                    {
                                        color: "black",
                                        icon: BorderColorOutlinedIcon,
                                        handleClick: handleEdit,
                                        text: "Edit",
                                    },
                                    {
                                        color: "red",
                                        icon: PersonRemoveOutlinedIcon,
                                        handleClick: handleDelete,
                                        text: "Delete",
                                    },
                                ]}
                            />
                        </Table.Data>
                    </Table.Row>
                ))}
            </Table>

            {/* Popup Uses */}
            <Outlet />
        </>
    );
}

export default TransactionHistory;
