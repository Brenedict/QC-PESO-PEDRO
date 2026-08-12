import { z } from "zod";
import { zfd } from "zod-form-data";

export const UserSchema = zfd.formData({
    id: zfd.text(z.string().optional()),
    fullName: zfd.text(z.string().optional()),
    userName: zfd.text(z.string().optional()),
    role: zfd.text(z.string().optional()),
    status: zfd.text(z.string().optional()),
    position: zfd.text(z.string().optional()),
    assignedOffice: zfd.text(z.string().optional()),
    password: zfd.text(z.string().optional()),
});

export type User = z.infer<typeof UserSchema>;
