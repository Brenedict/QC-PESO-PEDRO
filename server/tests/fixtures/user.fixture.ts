import { UserCreateInput } from "@qcpesopedro/shared/prisma/models";

export type UserCreate = UserCreateInput & { id: number };

export const mockUser: UserCreate = {
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
    resetToken: "1",
    resetTokenExpiresAt: new Date(),
};

export const mockFrontlineUser: UserCreate = {
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
    resetToken: "2",
    resetTokenExpiresAt: new Date(),
};

export const mockAdminUser: UserCreate = {
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
    resetToken: "3",
    resetTokenExpiresAt: new Date(),
};

export const mockSuperAdminUser: UserCreate = {
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
    resetToken: "4",
    resetTokenExpiresAt: new Date(),
};
