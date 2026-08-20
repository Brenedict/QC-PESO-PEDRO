import { ROUTES, useNavigateDefault } from "../../hooks/reroute";
import { Dialog } from "../Dialog";
import { PopupButton } from "./PopupPartials";
import { Text } from "../Text";
import { useRef, type ReactNode, type RefObject } from "react";
import { formatDDMMYYYY, formatLongMonthYear } from "../../utils/time";
import type { ColorVariant } from "../../types/common";
import Table from "../Table";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { usePDF } from "react-to-pdf";
import { useLoaderData } from "react-router";
import type { AnalyticsData } from "../../api/analyticsRequests";

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
                            value={data?.total?.count ?? 0}
                            valueVariant="primary-blue"
                        />
                        <ReportMiniCard
                            label="successful referrals"
                            value={data?.success?.count ?? 0}
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
                            <Table.Data>{data?.walkin?.count ?? 0}</Table.Data>
                            <Table.Data>{data?.walkin?.grouped?.MALE ?? 0}</Table.Data>
                            <Table.Data>{data?.walkin?.grouped?.FEMALE ?? 0}</Table.Data>
                        </Table.Row>

                        <Table.Row>
                            <Table.Data>Online Referrals</Table.Data>
                            <Table.Data>{data?.online?.count ?? 0}</Table.Data>
                            <Table.Data>{data?.online?.grouped?.MALE ?? 0}</Table.Data>
                            <Table.Data>{data?.online?.grouped?.FEMALE ?? 0}</Table.Data>
                        </Table.Row>

                        <Table.Row>
                            <Table.Data>In-House Referral</Table.Data>
                            <Table.Data>{data?.inhouse?.count ?? 0}</Table.Data>
                            <Table.Data>{data?.inhouse?.grouped?.MALE ?? 0}</Table.Data>
                            <Table.Data>{data?.inhouse?.grouped?.FEMALE ?? 0}</Table.Data>
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
                    onClick={() => toPDF()}
                    leftIcon={{ icon: FileDownloadOutlinedIcon, variant: "white" }}
                >
                    Download PDF
                </PopupButton>
                <PopupButton
                    variant="green"
                    onClick={() => navigate(ROUTES.reports.root, false)}
                    leftIcon={{ icon: FileDownloadOutlinedIcon, variant: "white" }}
                >
                    Download Excel
                </PopupButton>
            </Dialog.Footer>
        </Dialog>
    );
}
