import { setupServer } from "msw/node";
// import { handlers } from "./handlers";

// TODO: write actual test
const handlers: any[] = [];

export const server = setupServer(...handlers);
