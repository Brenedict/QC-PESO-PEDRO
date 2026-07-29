import { Card } from "./Card";
import { Text } from "./Text";
import EmptyData from "./EmptyData";
import Status, { type StatusVariant } from "./Status";

// Dot color per status
const statusDotBg: Record<StatusVariant<"outcome">, string> = {
    success: "bg-green",
    pending: "bg-grayish-blue",
    mismatched: "bg-red",
};

export interface ActivityItemData {
    id: string | number;
    title: string;
    subject: string;
    processedBy: string;
    timestamp: string;
    status: StatusVariant<"outcome">;
}

interface RecentActivityProps {
    title?: string;
    items: ActivityItemData[];
    onViewAll?: () => void;
    viewAllLabel?: string;
    maxVisible?: number;
}

// Single row in the timeline, with the dot/line on the left and details on the right
function ActivityRow({ item, isLast }: { item: ActivityItemData; isLast: boolean }) {
    return (
        <div className="relative flex gap-4">
            <div className="flex flex-col items-center">
                <span className="bg-grayish-blue-opaque rounded-full h-6 w-6 flex items-center justify-center border-2 shadow border-off-white">
                    <span className={` h-2 w-2 rounded-full ${statusDotBg[item.status]}`} />
                </span>
                {!isLast && <span className="w-0.5 flex-1 bg-off-white-border" />}
            </div>

            <div className="flex-1 min-w-0 pb-1 mb-6">
                <div className="flex items-start justify-between gap-4">
                    <Text size="normal" weight="bold" variant="black">
                        {item.title}
                    </Text>
                    <div className="shrink-0">
                        <Text size="small" weight="medium" variant="grayish-blue">
                            {item.timestamp}
                        </Text>
                    </div>
                </div>
                <Text size="description" variant="grayish-blue">
                    <span className="text-dark-blue font-medium">{item.subject}</span> processed by {item.processedBy}
                </Text>
                <br className="block mb-2" />
                <Status type="outcome" variant={item.status} />
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
            <Card.Header className="flex items-center justify-between" bordered variant="white">
                <Text size="normal" weight="bold">
                    {title}
                </Text>
                {onViewAll && (
                    <button onClick={onViewAll} className="shrink-0">
                        <Text
                            size="description"
                            variant="primary-blue"
                            weight="normal"
                            className="hover:underline cursor-pointer"
                        >
                            {viewAllLabel}
                        </Text>
                    </button>
                )}
            </Card.Header>

            <Card.Body className="p-5! max-h-[420px] overflow-y-auto" bordered={false}>
                {visibleItems.length === 0 ? (
                    <div className="py-8 text-center flex justify-center items-center w-full">
                        <EmptyData>No recent activity</EmptyData>
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

