// General Imports
import { type ReactNode, type RefObject } from "react";

// Components
import { Dialog } from "../Dialog";
import { PopupButton } from "./PopupPartials";
import { Text } from "../Text";
import Table from "../Table";

// Material UI Icons
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

// File Download
import { usePDF } from "react-to-pdf";
import { useLoaderData } from "react-router";
import type { AnalyticsData } from "../../api/analyticsService";
import * as XLSX from "xlsx";

// Custom Hooks
import useNavigateDefault, { ROUTES } from "../../hooks/useNavigateDefault";

// Utils
import { formatDDMMYYYY, formatLongMonthYear } from "../../utils/time";

// Types
import type { ColorVariant } from "../../types/common";
import { apiFetch } from "../../api/httpClient";
import { ensureOk } from "../../api/actionService";

function PaperContainer({ targetRef, children }: { targetRef: RefObject<null>; children: ReactNode }) {
    return (
        <section ref={targetRef} className="p-10! aspect-a4 min-w-3xl bg-white">
            {children}
        </section>
    );
}

function PaperHeader() {
    return (
        <div className="mb-6">
            <Text size="big" weight="black" align="center" variant="primary-blue" className="uppercase">
                Quezon City Government
            </Text>
            <Text size="medium" weight="bold" align="center" variant="dark-blue">
                Public Employment Service Office (QC PESO)
            </Text>
            <br className="block mb-1" />
            <Text size="medium" weight="medium" align="center" variant="grayish-blue">
                PED Daily Monitoring and Tracking System
            </Text>
        </div>
    );
}

function PaperTitle({ date, type }: { date: Date; type: string }) {
    const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

    return (
        <div>
            <Text size="bigMedium" weight="bold" align="center" variant="black" className="capitalize">
                {capitalizedType} Transaction Summary Report
            </Text>
            <br className="block mb-1" />
            <Text size="description" weight="normal" align="center" variant="grayish-blue">
                Generated: {formatLongMonthYear(date)}
            </Text>
            <hr className="mt-6 mb-8 border-0 bg-primary-blue h-0.5" />
        </div>
    );
}

function ReportMiniCard({ label, value, valueVariant }: { label: string; value: number; valueVariant: ColorVariant }) {
    return (
        <div className="grow p-4 bg-off-white-border">
            <Text variant="grayish-blue" size="small" weight="bold" className="uppercase">
                {label}
            </Text>
            <Text variant={valueVariant} size="big" weight="black">
                {value}
            </Text>
        </div>
    );
}

function BreakdownTitle() {
    return (
        <>
            <Text variant="dark-blue" size="normal" weight="bold" className="capitalize">
                Transaction Types Breakdown
            </Text>
            <hr className="mt-2 mb-4 border-0 bg-off-white-border h-0.5" />
        </>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleExcelDownload(data: any, date: Date, type: string, fileName: string) {
    const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

    const rows = [
        ["Quezon City Government"],
        ["Public Employment Service Office (QC PESO)"],
        ["PED Daily Monitoring and Tracking System"],
        [],
        [`${capitalizedType} Transaction Summary Report`],
        [`Generated: ${formatLongMonthYear(date)}`],
        [],
        ["Total Transactions", data?.total?.count ?? 0],
        ["Successful Referrals", data?.success?.count ?? 0],
        [],
        ["Type", "Total", "Male", "Female"],
        [
            "Walk-In Transactions",
            data?.walkin?.count ?? 0,
            data?.walkin?.grouped?.MALE ?? 0,
            data?.walkin?.grouped?.FEMALE ?? 0,
        ],
        [
            "Online Referrals",
            data?.online?.count ?? 0,
            data?.online?.grouped?.MALE ?? 0,
            data?.online?.grouped?.FEMALE ?? 0,
        ],
        [
            "In-House Referral",
            data?.inhouse?.count ?? 0,
            data?.inhouse?.grouped?.MALE ?? 0,
            data?.inhouse?.grouped?.FEMALE ?? 0,
        ],
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    XLSX.writeFile(workbook, `${fileName}.xlsx`);
}

async function handlePDFDownload(type: string, toPDF: (options?: Options) => void) {
    toPDF();

    try {
        const res = await apiFetch(`/transaction/download-reports/${type}`, {
            retry: true,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        await ensureOk(res, "Failed to download PDF");

        return;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export function PopupReportPreview({ type }: { type: string }) {
    const data = useLoaderData();
    const dateNow = new Date();
    const fileName = type.toLowerCase().replaceAll(" ", "-") + "-transaction-" + formatDDMMYYYY(dateNow);

    const navigate = useNavigateDefault();
    const { toPDF, targetRef } = usePDF({
        filename: fileName,
        page: {
            format: "a4",
            orientation: "portrait",
        },
    });

    return (
        <Dialog dropShadow={true} onClose={() => navigate(ROUTES.reports.root, true)}>
            <Dialog.Header variant="white" onRightAction={() => navigate(ROUTES.reports.root, true)}>
                <Text size="medium" weight="bold">
                    Report Preview
                </Text>
            </Dialog.Header>
            <Dialog.Body variant="gray" className="p-8! max-h-[75vh] overflow-scroll">
                <PaperContainer targetRef={targetRef}>
                    <PaperHeader />
                    <PaperTitle date={dateNow} type={type} />
                    <div className="flex gap-8  mb-8">
                        <ReportMiniCard
                            label="total transactions"
                            value={data?.total?.count ?? "N/A"}
                            valueVariant="primary-blue"
                        />
                        <ReportMiniCard
                            label="successful referrals"
                            value={data?.success?.count ?? "N/A"}
                            valueVariant="green"
                        />
                    </div>
                    <BreakdownTitle />
                    <Table noCardStyle={true}>
                        <Table.Row>
                            <Table.Header text="type" />
                            <Table.Header text="total" />
                            <Table.Header text="male" />
                            <Table.Header text="female" />
                        </Table.Row>

                        <Table.Row>
                            <Table.Data>Walk-In Transactions</Table.Data>
                            <Table.Data>{data?.walkin?.count ?? "N/A"}</Table.Data>
                            <Table.Data>{data?.walkin?.grouped?.MALE ?? "N/A"}</Table.Data>
                            <Table.Data>{data?.walkin?.grouped?.FEMALE ?? "N/A"}</Table.Data>
                        </Table.Row>

                        <Table.Row>
                            <Table.Data>Online Referrals</Table.Data>
                            <Table.Data>{data?.online?.count ?? "N/A"}</Table.Data>
                            <Table.Data>{data?.online?.grouped?.MALE ?? "N/A"}</Table.Data>
                            <Table.Data>{data?.online?.grouped?.FEMALE ?? "N/A"}</Table.Data>
                        </Table.Row>

                        <Table.Row>
                            <Table.Data>In-House Referral</Table.Data>
                            <Table.Data>{data?.inhouse?.count ?? "N/A"}</Table.Data>
                            <Table.Data>{data?.inhouse?.grouped?.MALE ?? "N/A"}</Table.Data>
                            <Table.Data>{data?.inhouse?.grouped?.FEMALE ?? "N/A"}</Table.Data>
                        </Table.Row>
                    </Table>
                </PaperContainer>
            </Dialog.Body>
            <Dialog.Footer className="flex gap-3 justify-end">
                <PopupButton variant="white" onClick={() => navigate(ROUTES.reports.root, true)}>
                    Back
                </PopupButton>
                <PopupButton
                    variant="blue"
                    onClick={() => handlePDFDownload(type, toPDF)}
                    leftIcon={{ icon: FileDownloadOutlinedIcon, variant: "white" }}
                >
                    Download PDF
                </PopupButton>
                <PopupButton
                    variant="green"
                    onClick={() => handleExcelDownload(data, dateNow, type, fileName)}
                    leftIcon={{ icon: FileDownloadOutlinedIcon, variant: "white" }}
                >
                    Download Excel
                </PopupButton>
            </Dialog.Footer>
        </Dialog>
    );
}
