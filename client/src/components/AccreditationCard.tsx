import { Card } from "./Card";

interface AccreditationCardProps {
    title: string;
    total: number;
    newCount: number;
    renewalCount: number;
}
export function AccreditationCard({
    title,
    total,
    newCount,
    renewalCount,
}: AccreditationCardProps) {
    return (
        <Card className="w-full">
            <Card.Header>
                <h3 className="font-semibold">
                    {title}
                </h3>
            </Card.Header>

            <Card.Body>
                <p className="text-xs uppercase text-gray-400">
                    Total Accredited
                </p>

                <h1 className="text-4xl font-bold">
                    {total}
                </h1>

                <div className="flex justify-between mt-6">
                    <span>New: {newCount}</span>
                    <span>Renewal: {renewalCount}</span>
                </div>
            </Card.Body>
        </Card>
    );
}
