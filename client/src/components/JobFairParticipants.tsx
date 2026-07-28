import { Card } from "./Card";

export interface JobFairParticipantsProps {
    title: string;

    registered: number;
    registeredMale: number;
    registeredFemale: number;

    hired: number;
    hiredMale: number;
    hiredFemale: number;
}

export function JobFairParticipants({
    title,
    registered,
    registeredMale,
    registeredFemale,
    hired,
    hiredMale,
    hiredFemale,
}: JobFairParticipantsProps) {
    return (
        <Card className="w-full">
            <Card.Header>
                <h3 className="font-semibold">{title}</h3>
            </Card.Header>

            <Card.Body>
                <div className="grid grid-cols-2 gap-8">

                    <div>
                        <p className="text-xs uppercase text-gray-400">
                            Registered
                        </p>

                        <h1 className="text-4xl font-bold mt-1">
                            {registered}
                        </h1>

                        <div className="flex gap-3 mt-3 text-sm">
                            <span className="text-blue-500">
                                ♂ {registeredMale}
                            </span>

                            <span className="text-pink-500">
                                ♀ {registeredFemale}
                            </span>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs uppercase text-gray-400">
                            Hired
                        </p>

                        <h1 className="text-4xl font-bold mt-1">
                            {hired}
                        </h1>

                        <div className="flex gap-3 mt-3 text-sm">
                            <span className="text-blue-500">
                                ♂ {hiredMale}
                            </span>

                            <span className="text-pink-500">
                                ♀ {hiredFemale}
                            </span>
                        </div>
                    </div>

                </div>
            </Card.Body>
        </Card>
    );
}