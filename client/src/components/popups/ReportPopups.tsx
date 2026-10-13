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
import { usePDF, type Options } from "react-to-pdf";
import { useLoaderData } from "react-router";
import type { AnalyticsData, DateRangeData } from "../../api/analyticsService";
import * as XLSX from "xlsx-js-style";

// Custom Hooks
import useNavigateDefault, { ROUTES } from "../../hooks/useNavigateDefault";

// Utils
import { formatDDMMYYYY, formatLongMonthYear } from "../../utils/time";

// Types
import type { ColorVariant } from "../../types/common";
import { apiFetch } from "../../api/httpClient";
import { ensureOk } from "../../api/actionService";

const MASTHEAD = {
    ministry: "Quezon City Government",
    office: "Public Employment Service Office (QC PESO)",
    system: "PED Daily Monitoring and Tracking System",
} as const;

const TRANSACTION_TYPE_ROWS = [
    { key: "walkin", label: "Walk-In Transactions" },
    { key: "online", label: "Online Referrals" },
    { key: "inhouse", label: "In-House Referral" },
] as const;

const DEMOGRAPHIC_ROWS = [
    { key: "job-seeker", label: "First-Time Job Seekers" },
    { key: "pwd", label: "Persons with Disability (PWD)" },
    { key: "senior", label: "Senior Citizens" },
    { key: "young-worker", label: "Young Workers" },
    { key: "work-immersion", label: "Work Immersion / Internship" },
] as const;

const EXCEL_COLORS = {
    primaryBlue: "FF004B87",
    darkBlue: "FF1E293B",
    grayishBlue: "FF64748B",
    offWhite: "FFF8FAFC",
    border: "FFE2E8F0",
    white: "FFFFFFFF",
    black: "FF000000",
} as const;

const EXCEL_THIN_BORDER = {
    top: { style: "thin" as const, color: { rgb: EXCEL_COLORS.border } },
    bottom: { style: "thin" as const, color: { rgb: EXCEL_COLORS.border } },
    left: { style: "thin" as const, color: { rgb: EXCEL_COLORS.border } },
    right: { style: "thin" as const, color: { rgb: EXCEL_COLORS.border } },
};

const MASTHEAD_MINISTRY_STYLE: XLSX.CellStyle = {
    font: { bold: true, sz: 14, color: { rgb: EXCEL_COLORS.primaryBlue } },
};

const MASTHEAD_OFFICE_STYLE: XLSX.CellStyle = {
    font: { bold: true, sz: 12, color: { rgb: EXCEL_COLORS.darkBlue } },
};

const MASTHEAD_SYSTEM_STYLE: XLSX.CellStyle = {
    font: { italic: true, sz: 11, color: { rgb: EXCEL_COLORS.grayishBlue } },
};

const REPORT_TITLE_STYLE: XLSX.CellStyle = {
    font: { bold: true, sz: 14, color: { rgb: EXCEL_COLORS.black } },
};

const REPORT_META_STYLE: XLSX.CellStyle = {
    font: { italic: true, sz: 10, color: { rgb: EXCEL_COLORS.grayishBlue } },
};

const SECTION_STYLE: XLSX.CellStyle = {
    font: { bold: true, sz: 11, color: { rgb: EXCEL_COLORS.primaryBlue } },
    fill: { patternType: "solid", fgColor: { rgb: EXCEL_COLORS.offWhite } },
    alignment: { horizontal: "left" },
};

const TABLE_HEADER_STYLE: XLSX.CellStyle = {
    font: { bold: true, sz: 11, color: { rgb: EXCEL_COLORS.white } },
    fill: { patternType: "solid", fgColor: { rgb: EXCEL_COLORS.primaryBlue } },
    alignment: { horizontal: "center", vertical: "center" },
    border: EXCEL_THIN_BORDER,
};

const LABEL_STYLE: XLSX.CellStyle = {
    alignment: { horizontal: "left", vertical: "center" },
    border: EXCEL_THIN_BORDER,
};

const VALUE_STYLE: XLSX.CellStyle = {
    alignment: { horizontal: "center", vertical: "center" },
    border: EXCEL_THIN_BORDER,
};

function getCount(data: AnalyticsData, key: string): number | undefined {
    return (data?.[key] as DateRangeData | undefined)?.count;
}

function getSexCount(data: AnalyticsData, key: string, sex: "MALE" | "FEMALE"): number | undefined {
    return (data?.[key] as DateRangeData | undefined)?.grouped?.[sex];
}

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
                {MASTHEAD.ministry}
            </Text>
            <Text size="medium" weight="bold" align="center" variant="dark-blue">
                {MASTHEAD.office}
            </Text>
            <br className="block mb-1" />
            <Text size="medium" weight="medium" align="center" variant="grayish-blue">
                {MASTHEAD.system}
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

function ReportMiniCard({
    label,
    value,
    valueVariant,
}: {
    label: string;
    value: ReactNode;
    valueVariant: ColorVariant;
}) {
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

function SectionTitle({ children }: { children: string }) {
    return (
        <>
            <Text variant="dark-blue" size="normal" weight="bold" className="capitalize">
                {children}
            </Text>
            <hr className="mt-2 mb-4 border-0 bg-off-white-border h-0.5" />
        </>
    );
}

function handleExcelDownload(data: AnalyticsData, date: Date, type: string, fileName: string) {
    const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

    const rows: (string | number | null)[][] = [
        [MASTHEAD.ministry, null, null, null],
        [MASTHEAD.office, null, null, null],
        [MASTHEAD.system, null, null, null],
        [null, null, null, null],
        [`${capitalizedType} Transaction Summary Report`, null, null, null],
        [`Generated: ${formatLongMonthYear(date)}`, null, null, null],
        [null, null, null, null],
        ["Summary", null, null, null],
        ["Metric", "Count", null, null],
        ["Total Transactions", getCount(data, "total") ?? 0, null, null],
        ["Successful Referrals", getCount(data, "success") ?? 0, null, null],
        [null, null, null, null],
        ["Transaction Types Breakdown", null, null, null],
        ["Type", "Total", "Male", "Female"],
        ...TRANSACTION_TYPE_ROWS.map((row) => [
            row.label,
            getCount(data, row.key) ?? 0,
            getSexCount(data, row.key, "MALE") ?? 0,
            getSexCount(data, row.key, "FEMALE") ?? 0,
        ]),
        [null, null, null, null],
        ["Applicant Demographics", null, null, null],
        ["Category", "Total", "Male", "Female"],
        ...DEMOGRAPHIC_ROWS.map((row) => [
            row.label,
            getCount(data, row.key) ?? 0,
            getSexCount(data, row.key, "MALE") ?? 0,
            getSexCount(data, row.key, "FEMALE") ?? 0,
        ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    const workbook = XLSX.utils.book_new();

    const setStyle = (row: number, col: number, style: XLSX.CellStyle) => {
        const ws = worksheet as XLSX.WorkSheet;
        const address = XLSX.utils.encode_cell({ r: row, c: col });
        const current = ws[address] ?? { t: "s", v: "" };
        ws[address] = { ...current, s: style };
    };

    // Masthead + titles
    setStyle(0, 0, MASTHEAD_MINISTRY_STYLE);
    setStyle(1, 0, MASTHEAD_OFFICE_STYLE);
    setStyle(2, 0, MASTHEAD_SYSTEM_STYLE);
    setStyle(4, 0, REPORT_TITLE_STYLE);
    setStyle(5, 0, REPORT_META_STYLE);

    // Section headings
    [7, 12, 18].forEach((row) => setStyle(row, 0, SECTION_STYLE));

    // Summary table
    setStyle(8, 0, TABLE_HEADER_STYLE);
    setStyle(8, 1, TABLE_HEADER_STYLE);
    setStyle(9, 0, LABEL_STYLE);
    setStyle(9, 1, VALUE_STYLE);
    setStyle(10, 0, LABEL_STYLE);
    setStyle(10, 1, VALUE_STYLE);

    // Breakdown + demographics tables
    const styleTable = (headerRow: number, firstDataRow: number, rowCount: number) => {
        for (let col = 0; col < 4; col++) setStyle(headerRow, col, TABLE_HEADER_STYLE);
        for (let row = firstDataRow; row < firstDataRow + rowCount; row++) {
            setStyle(row, 0, LABEL_STYLE);
            for (let col = 1; col < 4; col++) setStyle(row, col, VALUE_STYLE);
        }
    };

    styleTable(13, 14, TRANSACTION_TYPE_ROWS.length);
    styleTable(19, 20, DEMOGRAPHIC_ROWS.length);

    const ws = worksheet as XLSX.WorkSheet;
    ws["!merges"] = [0, 1, 2, 4, 5, 7, 12, 18].map((row) => XLSX.utils.decode_range(`A${row + 1}:D${row + 1}`));
    ws["!cols"] = [{ wch: 34 }, { wch: 12 }, { wch: 12 }, { wch: 12 }];

    const rowHeights: Partial<Record<number, number>> = { 0: 22, 1: 18, 2: 18, 4: 22, 5: 18 };
    ws["!rows"] = rows.map<XLSX.RowInfo>((_, index) => (rowHeights[index] ? { hpt: rowHeights[index] } : {}));

    XLSX.utils.book_append_sheet(workbook, worksheet, `${capitalizedType} Report`);

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
    const data = useLoaderData() as AnalyticsData;
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
                            value={getCount(data, "total") ?? "N/A"}
                            valueVariant="primary-blue"
                        />
                        <ReportMiniCard
                            label="successful referrals"
                            value={getCount(data, "success") ?? "N/A"}
                            valueVariant="green"
                        />
                    </div>
                    <SectionTitle>Transaction Types Breakdown</SectionTitle>
                    <Table noCardStyle={true}>
                        <Table.Row>
                            <Table.Header text="type" />
                            <Table.Header text="total" />
                            <Table.Header text="male" />
                            <Table.Header text="female" />
                        </Table.Row>

                        {TRANSACTION_TYPE_ROWS.map((row) => (
                            <Table.Row key={row.key}>
                                <Table.Data nowrap>{row.label}</Table.Data>
                                <Table.Data>{getCount(data, row.key) ?? "N/A"}</Table.Data>
                                <Table.Data>{getSexCount(data, row.key, "MALE") ?? "N/A"}</Table.Data>
                                <Table.Data>{getSexCount(data, row.key, "FEMALE") ?? "N/A"}</Table.Data>
                            </Table.Row>
                        ))}
                    </Table>
                    <br className="block mb-8" />
                    <SectionTitle>Applicant Demographics</SectionTitle>
                    <Table noCardStyle={true}>
                        <Table.Row>
                            <Table.Header text="category" />
                            <Table.Header text="total" />
                            <Table.Header text="male" />
                            <Table.Header text="female" />
                        </Table.Row>

                        {DEMOGRAPHIC_ROWS.map((row) => (
                            <Table.Row key={row.key}>
                                <Table.Data nowrap>{row.label}</Table.Data>
                                <Table.Data>{getCount(data, row.key) ?? "N/A"}</Table.Data>
                                <Table.Data>{getSexCount(data, row.key, "MALE") ?? "N/A"}</Table.Data>
                                <Table.Data>{getSexCount(data, row.key, "FEMALE") ?? "N/A"}</Table.Data>
                            </Table.Row>
                        ))}
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
