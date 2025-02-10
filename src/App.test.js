import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import React from "react"; // 👈 Import React
import "@testing-library/jest-dom";
describe("App Component", () => {
  test("renders input field and add button", () => {
    render(<App />);
    expect(screen.getByPlaceholderText("Add a new task")).toBeInTheDocument();
    expect(screen.getByText("ADD")).toBeInTheDocument();
  });

  test("adds a new task", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Add a new task");
    const addButton = screen.getByText("ADD");

    fireEvent.change(input, { target: { value: "Test Task" } });
    fireEvent.click(addButton);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  test("does not add an empty task", () => {
    render(<App />);
    const addButton = screen.getByText("ADD");

    fireEvent.click(addButton);

    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  test("clears all tasks", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Add a new task");
    const addButton = screen.getByText("ADD");

    fireEvent.change(input, { target: { value: "Task 1" } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: "Task 2" } });
    fireEvent.click(addButton);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();

    const clearButton = screen.getByText("Clear All");
    fireEvent.click(clearButton);

    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
  });
});
