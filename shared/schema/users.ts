import { zfd } from "zod-form-data";
import z from "zod";
import "../zod/schemas";
import { UserUncheckedCreateInputObjectZodSchema, UserUncheckedUpdateInputObjectZodSchema } from "../zod/schemas";

export const UserFormCreateSchema = zfd.formData(
    UserUncheckedCreateInputObjectZodSchema.omit({
        password: true,
        createdAt: true,
    })
);

export type UserFormCreateType = z.infer<typeof UserFormCreateSchema>;

export const UserFormUpdateSchema = zfd.formData(
    UserUncheckedUpdateInputObjectZodSchema.omit({
        id: true,
        createdAt: true,
        updatedAt: true,
    })
);

export type UserFormUpdateType = z.infer<typeof UserFormUpdateSchema>;
