// Prisma Type
import type { Role, Status, User } from "@qcpesopedro/shared/prisma/client";

// Models
import UserModel from "../models/user.model";

export interface UserManagementFilter {
    role?: Role | undefined;
    status?: Status | undefined;
}

function generateTemporaryPassword(firstName: string, lastName: string): string {
    const isoDate = new Date().toISOString().split("T")[0];
    const temporaryPassword = `QCPESO-${firstName.toUpperCase().split(" ").join("")}-${lastName.toUpperCase().split(" ").join("")}-${isoDate}`;

    return temporaryPassword;
}

const getUsers = async (filters: UserManagementFilter) => {
    return UserModel.getUsersWithFilters(filters);
};

const ensureUserExist = async (userId: number): Promise<User | null> => {
    return await UserModel.getById(userId);
};

const usernameExist = async (username: string): Promise<User | null> => {
    return await UserModel.getByUsername(username);
};

const emailExist = async (email: string): Promise<User | null> => {
    return await UserModel.getByEmail(email);
};

const updateUser = async (userId: number, user: User): Promise<User | null> => {
    return await UserModel.updateUser(userId, user);
};

const createUser = async (user: User): Promise<User | null> => {
    const generatedTemporaryPassword = generateTemporaryPassword(user.firstName, user.lastName);

    user.password = generatedTemporaryPassword;

    return await UserModel.createUser(user);
};

const resetPassword = async (userId: number, user: User): Promise<User | null> => {
    const generatedTemporaryPassword = generateTemporaryPassword(user.firstName, user.lastName);

    const updatedUser = {
        password: generatedTemporaryPassword,
    } as User;

    return await UserModel.updateUser(userId, updatedUser);
};

export default {
    getUsers,
    ensureUserExist,
    usernameExist,
    emailExist,
    updateUser,
    createUser,
    resetPassword,
};
