import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TiTick } from 'react-icons/ti';
import { MdClose } from 'react-icons/md';
import { IoAdd, IoArrowUndoOutline } from 'react-icons/io5';
import TaskItems from './TaskItem';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (taskInput.trim() !== "") {
      setTasks([...tasks, { text: taskInput, completed: false }]);
      setTaskInput("");
    }
  };

  const toggleComplete = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setTasks([]);
  };

console.log(tasks)

  return (
    <div className="flex flex-col items-center min-h-screen bg-red-500 p-5">
      <div className="w-full max-w-xl  p-6 rounded-lg ">
        <h1 className="text-center text-2xl font-bold text-gray-800">To-Do List</h1>
        <div className="bg-white flex mt-4">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Add a new task"
            className="flex-1 outline-none focus:outline-none p-2 rounded-md"
          />
          <button
            onClick={addTask}
            className="ml-2  text-blue-500 px-4 py-2 rounded-md"
          >
            ADD
          </button>
        </div>
      { tasks.length>0 && <div className="mt-4 bg-gray-100 p-4 ">
          <ul className="space-y-2">
            {tasks.map((task, index) => (
           <TaskItems 
           key={index} 
           task={task} 
           parentIndexPath={[index]} // First level, so we pass [index]
           setTasks={setTasks}
       />
            ))}
          </ul>
          {tasks.length > 0 && (
            <button
              onClick={clearAll}
              className="mt-2 w-full text-right text-blue-500"
            >
              Clear All
            </button>
          )}
        </div>}
      </div>
    </div>
  );
}

export default App
