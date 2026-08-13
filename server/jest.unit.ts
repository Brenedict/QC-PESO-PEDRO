import { jest } from "@jest/globals";
import { mockDeep, mockReset, type DeepMockProxy } from "jest-mock-extended";
import type { PrismaClient } from "@qcpesopedro/shared/prisma/client";
import prisma from "./src/config/prisma.config";

jest.mock("./src/config/prisma.config", () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
}));

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
    mockReset(prismaMock);
});
