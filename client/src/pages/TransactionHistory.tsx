// General Imports
import { useLoaderData } from "react-router";
import { Outlet } from "react-router";

// PEDRO SHARED IMPORTS
import { Outcome, TransactionType, type Transaction, type User } from "@qcpesopedro/shared/prisma/browser";

// Components
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Table from "../components/Table";
import Status from "../components/Status";
import { ActionButtons, ColumnText, DateTime, Identifier } from "../components/TableCells";

// Material UI Icons
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";

// Hooks
import useNavigateDefault, { ROUTES } from "../hooks/useNavigateDefault";
import useSearchParamsTable from "../hooks/useSearchParamsTable";
import { SelectInput } from "../components/Input";
import useTimeframeFilter, { type TimeframeFilter } from "../hooks/useTimeFrameFilter";
import { TimeframeInputs, TimeframeSelect } from "../components/Timeframe";
import { useAuth } from "../context/AuthContext";

export function TransactionExtraFilters({ timeframeFilter }: { timeframeFilter?: TimeframeFilter }) {
    const { searchParams } = useSearchParamsTable();

    return (
        <div className="flex gap-4 items-center">
            {timeframeFilter && (
                <>
                    <TimeframeInputs
                        startDate={timeframeFilter.startDate}
                        endDate={timeframeFilter.endDate}
                        handleStartDateChange={timeframeFilter.handleStartDateChange}
                        handleEndDateChange={timeframeFilter.handleEndDateChange}
                    />
                </>
            )}

            <SelectInput
                optionList={[
                    { content: "All Types", value: "" },
                    { content: "Walk-in Referral", value: TransactionType.WALK_IN_REFERRAL },
                    { content: "Online Referral", value: TransactionType.ONLINE_REFERRAL },
                    { content: "In-house Recruitment", value: TransactionType.IN_HOUSE_RECRUITMENT },
                ]}
                name="type"
                className="w-48! h-9.5! px-3! py-0!  rounded-xl!"
                defaultValue={searchParams.type}
            />
            <SelectInput
                optionList={[
                    { content: "All Outcome", value: "" },
                    { content: "None", value: Outcome.NONE },
                    { content: "Pending", value: Outcome.PENDING },
                    { content: "Mismatch", value: Outcome.MISMATCH },
                    { content: "Success", value: Outcome.SUCCESS },
                ]}
                name="outcome"
                className="w-48! h-9.5! px-3! py-0!  rounded-xl!"
                defaultValue={searchParams.outcome}
            />
        </div>
    );
}

function TransactionHistory() {
    const { user } = useAuth();
    const timeframeFilter = useTimeframeFilter();
    const data = useLoaderData();
    const navigate = useNavigateDefault();

    const transactions = data.transactions as (Transaction & { user?: User })[];

    const handleEdit = (id: string) => () => {
        navigate(ROUTES.history.edit(id), true);
    };

    const handleDelete = (id: string) => () => {
        navigate(ROUTES.history.delete(id), true);
    };

    return (
        <>
            <PageHeader primaryText="History Ledger" secondaryText="Comprehensive view of all historical transactions">
                <div>
                    <TimeframeSelect
                        timeframe={timeframeFilter.timeframe}
                        handleTimeframeChange={timeframeFilter.handleTimeframeChange}
                    />
                </div>
            </PageHeader>

            <Table
                pagination={true}
                filterView={true}
                extraFilters={<TransactionExtraFilters timeframeFilter={timeframeFilter} />}
                isExternalFilterChanged={timeframeFilter.isTimeframeChanged}
            >
                {/* Header row */}
                <Table.Row>
                    <Table.Header text="ID" />
                    <Table.Header text="Date/Time" />
                    <Table.Header text="Type" />
                    <Table.Header text="Applicant Name" />
                    {transactions?.[0]?.user && <Table.Header text="Processed By" />}
                    <Table.Header text="Outcome" />
                    {user?.role !== "FRONTLINE" && <Table.Header text="Actions" />}
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
                        {transaction.user && (
                            <Table.Data>
                                <ColumnText>{transaction.user.fullName}</ColumnText>
                            </Table.Data>
                        )}
                        <Table.Data>
                            <Status type="outcome" variant={transaction.transactionOutcome} />
                        </Table.Data>
                        {user?.role !== "FRONTLINE" && (
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
                        )}
                    </Table.Row>
                ))}
            </Table>

            {/* Popup Uses */}
            <Outlet />
        </>
    );
}

export default TransactionHistory;
