import { Card } from "./Card";
import { Text } from "./Text";
import type { ColorVariant } from "../types/common";

export type ActivityStatus = "success" | "pending" | "failed";

// Text color per status
const statusTextColor: Record<ActivityStatus, ColorVariant> = {
    success: "green",
    pending: "grayish-blue",
    failed: "red",
};

// Dot color per status
const statusDotBg: Record<ActivityStatus, string> = {
    success: "bg-green",
    pending: "bg-grayish-blue",
    failed: "bg-red",
};

// Badge background per status
const statusBadgeBg: Record<ActivityStatus, string> = {
    success: "bg-green-opaque",
    pending: "bg-grayish-blue-opaque",
    failed: "bg-red-opaque",
};

export interface ActivityItemData {
    id: string | number;
    title: string;
    subject: string;
    processedBy: string;
    timestamp: string;
    status: ActivityStatus;
}

interface RecentActivityProps {
    title?: string;
    items: ActivityItemData[];
    onViewAll?: () => void;
    viewAllLabel?: string;
    maxVisible?: number;
}

// Small colored pill showing the activity status
function StatusBadge({ status }: { status: ActivityStatus }) {
    return (
        <div className={`inline-block rounded-full px-2 py-[2px] ${statusBadgeBg[status]}`}>
            <Text size="smallest" variant={statusTextColor[status]} weight="semiBold">
                {status.toUpperCase()}
            </Text>
        </div>
    );
}

// Single row in the timeline, with the dot/line on the left and details on the right
function ActivityRow({ item, isLast }: { item: ActivityItemData; isLast: boolean }) {
    return (
        <div className="relative flex gap-3 px-6 py-4">
            <div className="flex flex-col items-center">
                <span className={`mt-1 h-2.5 w-2.5 rounded-full ${statusDotBg[item.status]}`} />
                {!isLast && <span className="w-px flex-1 bg-off-white-border mt-1" />}
            </div>

            <div className="flex-1 min-w-0 pb-1">
                <div className="flex items-start justify-between gap-4">
                    <Text size="normal" weight="semiBold" variant="black">
                        {item.title}
                    </Text>
                    <div className="shrink-0">
                        <Text size="smaller" variant="grayish-blue">
                            {item.timestamp}
                        </Text>
                    </div>
                </div>
                <Text size="small" variant="grayish-blue">
                    {item.subject} processed by {item.processedBy}
                </Text>
                <div className="mt-2">
                    <StatusBadge status={item.status} />
                </div>
            </div>
        </div>
    );
}

// Main component: renders a Card with a scrollable timeline of activity items
export function RecentActivity({
    title = "Recent Activity",
    items,
    onViewAll,
    viewAllLabel = "View All",
    maxVisible = 5,
}: RecentActivityProps) {
    const visibleItems = items.slice(0, maxVisible);

    return (
        <Card>
            <Card.Header className="flex items-center justify-between" bordered>
                <Text size="medium" weight="bold">
                    {title}
                </Text>
                {onViewAll && (
                    <button onClick={onViewAll} className="shrink-0">
                        <Text size="small" variant="primary-blue">
                            {viewAllLabel}
                        </Text>
                    </button>
                )}
            </Card.Header>

            <Card.Body className="p-0 max-h-[420px] overflow-y-auto" bordered={false}>
                {visibleItems.length === 0 ? (
                    <div className="py-8 text-center">
                        <Text size="small" variant="grayish-blue" align="center">
                            No recent activity
                        </Text>
                    </div>
                ) : (
                    visibleItems.map((item, i) => (
                        <ActivityRow key={item.id} item={item} isLast={i === visibleItems.length - 1} />
                    ))
                )}
            </Card.Body>
        </Card>
    );
}