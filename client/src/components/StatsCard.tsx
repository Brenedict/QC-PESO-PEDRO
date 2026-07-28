import { Card } from "./Card";

interface StatsCardProps {
    title: string;
    total: number;
    male: number;
    female: number;
    change: string;
    isPositive?: boolean;
    className?: string;
}
export function StatsCard({
    title,
    total,
    male,
    female,
    change,
    isPositive = true,
    className,

}: StatsCardProps) {
    return (
        <Card className={`w-full ${className ?? ""}`}>
            <Card.Header>
                <h3 className="font-semibold">{title}</h3>
            </Card.Header>

            <Card.Body>
                <p className="text-xs uppercase text-gray-400">
                    TOTAL
                </p>

                <h1 className="text-5xl font-bold mt-2">
                    {total}
                </h1>

                <div className="flex justify-between mt-6">
                    <span className="text-blue-500">
                        Male {male}
                    </span>

                    <span className="text-pink-500">
                        Female {female}
                    </span>
                </div>
            </Card.Body>

            <Card.Footer
                className={`text-center text-sm font-semibold ${
                    isPositive ? "text-green-500" : "text-red-500"
                }`}
            >
                {change}
            </Card.Footer>
        </Card>
    );
}