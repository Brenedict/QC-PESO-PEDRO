import type { Role, Status, User } from "../../generated/prisma/client";
import UserModel from "../models/user.model";

export interface UserManagementFilter {
    role?: Role | undefined;
    status?: Status | undefined;
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

export default {
    getUsers,
    ensureUserExist,
    usernameExist,
    emailExist,
    updateUser,
};
