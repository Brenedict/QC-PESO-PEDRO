import { type TimeframeFilter } from "../hooks/useTimeFrameFilter";
import { GeneralInput, LeftLabeledInput, SelectInput } from "./Input";

type TimeframeSelectProps = Pick<TimeframeFilter, "timeframe" | "handleTimeframeChange">;

export function TimeframeSelect({ timeframe, handleTimeframeChange }: TimeframeSelectProps) {
    return (
        <LeftLabeledInput label="Timeframe:">
            <SelectInput
                optionList={[
                    { content: "Overall", value: "overall" },
                    { content: "This Day", value: "day" },
                    { content: "This Week", value: "week" },
                    { content: "This Month", value: "month" },
                    { content: "This Year", value: "year" },
                    { content: "Custom", value: "custom" },
                ]}
                name="timeframe"
                className="w-48! h-9.5! px-3! py-0! rounded-xl! bg-white"
                value={timeframe}
                onChange={(e) => handleTimeframeChange(e.target.value)}
            />
        </LeftLabeledInput>
    );
}

type TimeframeInputsProps = Pick<
    TimeframeFilter,
    "startDate" | "endDate" | "handleStartDateChange" | "handleEndDateChange"
>;

export function TimeframeInputs({
    startDate,
    endDate,
    handleStartDateChange,
    handleEndDateChange,
}: TimeframeInputsProps) {
    return (
        <>
            <LeftLabeledInput label="From:">
                <GeneralInput
                    type="date"
                    name="startDate"
                    value={startDate}
                    onChange={(e) => handleStartDateChange(e.target.value)}
                    className="w-36! h-9.5! px-2! py-0! rounded-xl!"
                />
            </LeftLabeledInput>

            <LeftLabeledInput label="To:">
                <GeneralInput
                    type="date"
                    name="endDate"
                    value={endDate}
                    onChange={(e) => handleEndDateChange(e.target.value)}
                    className="w-36! h-9.5! px-2! py-0! rounded-xl!"
                />
            </LeftLabeledInput>
        </>
    );
}
