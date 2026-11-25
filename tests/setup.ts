import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { clearMocks } from "@tauri-apps/api/mocks";
import { afterAll, afterEach, beforeAll } from "vitest";
import { setupServer } from "msw/node";

export const httpServer = setupServer();

beforeAll(() => httpServer.listen());
afterEach(() => {
  cleanup();
  clearMocks();
  httpServer.resetHandlers();
});
afterAll(() => httpServer.close());
