import { render, screen, fireEvent } from "@testing-library/react";
import TaskItems from "./TaskItem";
import "@testing-library/jest-dom";
import React from 'react'
describe("TaskItems Component", () => {
  let mockSetTasks;
  let task;

  beforeEach(() => {
    mockSetTasks = jest.fn();
    task = { text: "Task 1", completed: false, subtasks: [] };
  });

  test("renders task text", () => {
    render(<TaskItems task={task} setTasks={mockSetTasks} parentIndexPath={[0]} />);
    expect(screen.getByText("Task 1")).toBeInTheDocument();
  });

  test("marks task as completed when tick button is clicked", () => {
    render(<TaskItems task={task} setTasks={mockSetTasks} parentIndexPath={[0]} />);
    const tickButton = screen.getByRole("button", { name: /tick/i });
    
    fireEvent.click(tickButton);
    expect(mockSetTasks).toHaveBeenCalled();
  });

  test("deletes a task when delete button is clicked", () => {
    render(<TaskItems task={task} setTasks={mockSetTasks} parentIndexPath={[0]} />);
    const deleteButton = screen.getByRole("button", { name: /close/i });

    fireEvent.click(deleteButton);
    expect(mockSetTasks).toHaveBeenCalled();
  });

  test("adds a subtask when Enter is pressed", () => {
    render(<TaskItems task={task} setTasks={mockSetTasks} parentIndexPath={[0]} />);
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.click(addButton);
    
    const input = screen.getByPlaceholderText("Add subtask and press Enter");
    fireEvent.change(input, { target: { value: "Subtask 1" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockSetTasks).toHaveBeenCalled();
  });

  test("toggles input field when clicking the add subtask button", () => {
    render(<TaskItems task={task} setTasks={mockSetTasks} parentIndexPath={[0]} />);
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.click(addButton);
    expect(screen.getByPlaceholderText("Add subtask and press Enter")).toBeInTheDocument();

    fireEvent.click(addButton);
    expect(screen.queryByPlaceholderText("Add subtask and press Enter")).not.toBeInTheDocument();
  });
});
