import { z } from "zod";

export const withDateRange = <S extends z.ZodObject<any>>(schema: S) =>
    schema.refine(({ startDate, endDate }) => !startDate || !endDate || startDate <= endDate, {
        message: "Start date cannot be after end date",
        path: ["endDate"],
    });

export const dateRangeFields = {
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
};

// .transform(({ startDate, endDate, ...rest }) => {
//     if (startDate !== undefined) (startDate as Date).setHours(0, 0, 0, 0);
//     if (endDate !== undefined) (endDate as Date).setHours(23, 59, 59, 999);
//     return Object.assign(rest, { startDate, endDate }) as z.infer<S>;
// });
