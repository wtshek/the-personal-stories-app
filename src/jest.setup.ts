import { PrismaClient } from "@prisma/client";
import "@testing-library/jest-dom";
import { DeepMockProxy, mockDeep, mockReset } from "jest-mock-extended";

import prisma from "../prisma/prisma";
import { server } from "./mocks/server";

jest.mock("../prisma/prisma", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  mockReset(prismaMock);
});
afterAll(() => server.close());

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
