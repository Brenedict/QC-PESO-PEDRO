import { z } from "zod";
import { zfd } from "zod-form-data";

export const UserSchema = zfd.formData({
    id: zfd.numeric(z.int().optional()),
    username: zfd.text(
        z.string({ error: "Username cannot be empty" }).trim().min(1, { message: "Username cannot be empty" })
    ),
    password: zfd.text(
        z.string({ error: "Password cannot be empty" }).trim().min(1, { message: "Password cannot be empty" })
    ),
    email: zfd.text(z.string({ error: "Email cannot be empty" }).trim().min(1, { message: "Email cannot be empty" })),
    role: zfd.text(z.enum(["SUPERADMIN", "ADMIN", "FRONTLINE"]).default("FRONTLINE")),
    status: zfd.text(z.enum(["ONLINE", "OFFLINE", "LOGGED_OUT"]).default("LOGGED_OUT")),
    shift: zfd.text(z.enum(["MORNING", "AFTERNOON"]).default("MORNING")),
    firstName: zfd.text(
        z.string({ error: "First Name cannot be empty" }).trim().min(1, { message: "First Name cannot be empty" })
    ),
    lastName: zfd.text(
        z.string({ error: "Last Name cannot be empty" }).trim().min(1, { message: "Last Name cannot be empty" })
    ),
    createdAt: zfd.text(z.string()).optional(),
    updatedAt: zfd.text(z.string()).optional(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;

export const UpdateUserSchema = zfd.formData({
    username: zfd.text(z.string().trim().min(1, { message: "Username cannot be empty" })).optional(),
    password: zfd.text(z.string().trim().min(1, { message: "Password cannot be empty" })).optional(),
    email: zfd.text(z.string().trim().min(1, { message: "Email cannot be empty" })).optional(),
    role: zfd.text(z.enum(["SUPERADMIN", "ADMIN", "FRONTLINE"]).default("FRONTLINE")).optional(),
    status: zfd.text(z.enum(["ONLINE", "OFFLINE", "LOGGED_OUT"]).default("LOGGED_OUT")).optional(),
    firstName: zfd.text(z.string().trim().min(1, { message: "First Name cannot be empty" })).optional(),
    lastName: zfd.text(z.string().trim().min(1, { message: "Last Name cannot be empty" })).optional(),
});

export type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>;
