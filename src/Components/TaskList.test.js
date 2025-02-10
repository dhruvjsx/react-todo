import { render, screen } from "@testing-library/react";
import TaskList from "../Components/TaskList";
import "@testing-library/jest-dom";
import React from 'react'
describe("TaskList Component", () => {
  test("renders a list of tasks", () => {
    const tasks = [
      { text: "Task 1", completed: false },
      { text: "Task 2", completed: true }
    ];
    
    render(<TaskList tasks={tasks} setTasks={() => {}} />);
    
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  test("renders nothing if no tasks are present", () => {
    render(<TaskList tasks={[]} setTasks={() => {}} />);
    
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
});
