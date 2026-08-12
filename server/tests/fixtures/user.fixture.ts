import type { User } from "../../generated/prisma/browser";

export const mockUser: User = {
    id: 1,
    username: "john",
    email: "johndoe@gmail.com",
    password: "password123",
    role: "ADMIN",
    status: "ONLINE",
    shift: "MORNING",
    firstName: "John",
    lastName: "Doe",
    createdAt: new Date(),
    updatedAt: new Date(),
};
