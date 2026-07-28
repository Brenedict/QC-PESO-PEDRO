import { Card } from "./Card";

interface WHIPCardProps {
    title: string;
    totalparticipants: number;
    male: number;
    female: number;
}
export function WHIPCard({
    title,
    totalparticipants,
    male,
    female,
}: WHIPCardProps) {
    return (
        <Card className="w-full">
            <Card.Header>
                <h3 className="font-semibold">
                    {title}
                </h3>
            </Card.Header>

            <Card.Body>
                <p className="text-xs uppercase text-gray-400">
                    Total Participants
                </p>

                <h1 className="text-4xl font-bold">
                    {totalparticipants}
                </h1>

                <div className="flex justify-between mt-6">
                    <span className="text-blue-500">
                        Male: {male}
                    </span>
                    <span className="text-pink-500">
                        Female: {female}
                    </span>
                </div>
            </Card.Body>
        </Card>
    );
}