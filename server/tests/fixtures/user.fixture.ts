import type { User } from "@qcpesopedro/shared/prisma/client";

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
    resetToken: "null",
    resetTokenExpiresAt: new Date(),
};

export const mockFrontlineUser: User = {
    id: 2,
    username: "benedettos",
    email: "benedictbin@gmail.com",
    password: "benedict123",
    role: "FRONTLINE",
    status: "OFFLINE",
    shift: "MORNING",
    firstName: "Benedict",
    lastName: "Bin",
    createdAt: new Date(),
    updatedAt: new Date(),
    resetToken: "null",
    resetTokenExpiresAt: new Date(),
};

export const mockAdminUser: User = {
    id: 3,
    username: "kenneth",
    email: "kennethpab@gmail.com",
    password: "kenneth123",
    role: "ADMIN",
    status: "ONLINE",
    shift: "MORNING",
    firstName: "Kenneth",
    lastName: "Pab",
    createdAt: new Date(),
    updatedAt: new Date(),
    resetToken: "null",
    resetTokenExpiresAt: new Date(),
};

export const mockSuperAdminUser: User = {
    id: 4,
    username: "richard",
    email: "richarddav@gmail.com",
    password: "richardd123",
    role: "SUPERADMIN",
    status: "ONLINE",
    shift: "AFTERNOON",
    firstName: "Richard",
    lastName: "Dav",
    createdAt: new Date(),
    updatedAt: new Date(),
    resetToken: "null",
    resetTokenExpiresAt: new Date(),
};
