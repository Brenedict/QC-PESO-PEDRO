import type { ReactNode } from "react";
import PageHeader from "../components/PageHeader";
import { Text } from "../components/Text";
import Button from "../components/Button";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import type { Transaction } from "../data/transactions";
import Table from "../components/Table";
import Status from "../components/Status";

function ColumnText({ children }: { children: ReactNode }) {
    return (
        <>
            <Text variant="dark-blue" size="description" align="center" weight="semiBold">
                {children}
            </Text>
        </>
    );
}

function Identifier({ children }: { children: ReactNode }) {
    return (
        <Text font="consolas" size="small" weight="medium" variant="grayish-blue" align="center">
            {children}
        </Text>
    );
}

function DateTime({ dateTime }: { dateTime: Date }) {
    return (
        <>
            <div>
                <Text size="description" variant="black" align="center" weight="medium">
                    {dateTime.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </Text>
                <Text size="small" variant="grayish-blue" align="center" weight="normal">
                    {dateTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}
                </Text>
            </div>
        </>
    );
}

function ActionButtons({ transactionId }: { transactionId: string }) {
    // Dummy handler lang (babaguhin pa in future)
    const handleEdit = async () => {
        console.log(transactionId);
    };

    const handleDisable = async () => {
        console.log(transactionId);
    };

    return (
        <>
            <Button
                variant="white-black"
                size="tiny"
                leftIcon={{ icon: BorderColorOutlinedIcon, size: "medium", variant: "black" }}
                onClick={handleEdit}
            >
                Edit
            </Button>
            <Button
                variant="white-red"
                size="tiny"
                leftIcon={{ icon: PersonRemoveOutlinedIcon, size: "medium", variant: "red" }}
                onClick={handleDisable}
            >
                Delete
            </Button>
        </>
    );
}

function TransactionHistory({
    transactions,
    onFilterSubmit,
}: {
    transactions: Transaction[];
    onFilterSubmit?: React.SubmitEventHandler<HTMLFormElement>;
}) {
    return (
        <>
            <PageHeader
                primaryText="History Ledger"
                secondaryText="Comprehensive view of all historical transactions"
            />

            <Table pagination={6} onFilterSubmit={onFilterSubmit}>
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
                {transactions.map((transaction) => (
                    <Table.Row key={transaction.id}>
                        <Table.Data>
                            <Identifier>{transaction.id}</Identifier>
                        </Table.Data>
                        <Table.Data>
                            <DateTime dateTime={transaction.dateTime} />
                        </Table.Data>
                        <Table.Data>
                            <Status type="type" variant={transaction.type} />
                        </Table.Data>
                        <Table.Data>
                            <ColumnText>{transaction.applicant}</ColumnText>
                        </Table.Data>
                        <Table.Data>
                            <Status type="outcome" variant={transaction.outcome} />
                        </Table.Data>
                        <Table.Data>
                            <ActionButtons transactionId={transaction.id} />
                        </Table.Data>
                    </Table.Row>
                ))}
            </Table>
        </>
    );
}

export default TransactionHistory;
