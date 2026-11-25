import { mockIPC } from "@tauri-apps/api/mocks";
import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import App from "./App";

it("shows the desktop response to a submitted name", async () => {
  mockIPC((command, args) => {
    if (command === "greet") {
      const name =
        args && !Array.isArray(args) && "name" in args ? String(args.name) : "";
      return `Hello, ${name}! You've been greeted from Rust!`;
    }
    throw new Error(`Unexpected IPC command: ${command}`);
  });

  render(<App />);
  fireEvent.change(screen.getByPlaceholderText("Enter a name..."), {
    target: { value: "Ada" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Greet" }));

  expect(
    await screen.findByText("Hello, Ada! You've been greeted from Rust!"),
  ).toBeVisible();
});

it("shows an error when the desktop command fails", async () => {
  mockIPC(() => {
    throw new Error("IPC unavailable");
  });

  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Greet" }));

  expect(
    await screen.findByText("Could not contact the desktop application."),
  ).toBeVisible();
});
