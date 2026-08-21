// General Imports
import { jest, beforeEach } from "@jest/globals";
import { mockDeep, mockReset, type DeepMockProxy } from "jest-mock-extended";
import prisma from "./src/config/prisma.config";

// PEDRO SHARED IMPORTS
import type { PrismaClient } from "@qcpesopedro/shared/prisma";

jest.mock("./src/config/prisma.config", () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
}));

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
    mockReset(prismaMock);
});
