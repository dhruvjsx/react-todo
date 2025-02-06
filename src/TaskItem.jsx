import { useState } from 'react';
import { TiTick } from 'react-icons/ti';
import { MdClose } from 'react-icons/md';
import { IoAdd, IoArrowUndoOutline } from 'react-icons/io5';

function TaskItems({ setTasks, task, parentIndexPath }) {
    const [showInputField, setShowInputField] = useState(false);
    const [inputFieldText, setInputFieldText] = useState("");

    // 🔥 Recursive function to find and update a task at any depth
    const addSubtaskRecursive = (tasks, indexPath, newSubtask) => {
        if (indexPath?.length === 0) return tasks;
    
        return tasks.map((t, i) => {
            if (i === indexPath[0]) {
                if (indexPath.length === 1) {
                    // Found the task, add the subtask here
                    return {
                        ...t,
                        subtasks: [...(t.subtasks || []), newSubtask],
                    };
                } else {
                    // Recursively go deeper into the nested subtasks
                    return {
                        ...t,
                        subtasks: addSubtaskRecursive(t.subtasks || [], indexPath.slice(1), newSubtask),
                    };
                }
            }
            return t;
        });
    };
    
    const handleDeleteTask = (indexPath) => {
        setTasks((prevTasks) => deleteTaskRecursive(prevTasks, indexPath));
    };

    const deleteTaskRecursive = (tasks, indexPath) => {
        // If the indexPath is empty, return the tasks array as is
        if (indexPath.length === 0) {
            return tasks;
        }
    
        const [currentIndex, ...restOfPath] = indexPath;
    
        return tasks.map((task, i) => {
            if (i === currentIndex) {
                // If we have reached the task to delete, we process the subtasks
                if (restOfPath.length === 0) {
                    // If there's no further path, we remove the current task
                    return null; // Task is removed
                }
    
                // Otherwise, we recursively delete within subtasks
                return {
                    ...task,
                    subtasks: deleteTaskRecursive(task.subtasks, restOfPath),
                };
            }
    
            return {
                ...task,
                subtasks: task.subtasks ? deleteTaskRecursive(task.subtasks, indexPath) : [],
            };
        }).filter(task => task !== null); 
    };
    const markTaskRecursive =(tasks,indexPath)=>{
        if (indexPath?.length === 0) return tasks;
    
        return tasks.map((t, i) => {
            if (i === indexPath[0]) {
                if (indexPath.length === 1) {
                    // Found the task, add the subtask here
                    return {
                        ...t,
                        completed: !t.completed,
                    };
                } else {
                    // Recursively go deeper into the nested subtasks
                    return {
                        ...t,
                        subtasks: markTaskRecursive(t.subtasks || [], indexPath.slice(1)),
                    };
                }
            }
            return t;
        });
    }
    // 🔥 Handle Enter key to add a nested subtask
    const handleKeyDown = (event) => {
        if (event.key === "Enter" && inputFieldText.trim() !== "") {
            const newSubtask = { text: inputFieldText, completed: false, subtasks: [] };

            setTasks((prevTasks) => addSubtaskRecursive(prevTasks, parentIndexPath, newSubtask));

            setInputFieldText("");
            setShowInputField(false);
        }
    };

    return (
        <li className={`p-3 flex flex-col gap-4 ${task.completed ? "line-through text-red-500" : ""}`}>
            <div className='flex gap-4'>
                <div className="flex gap-2">
                    <button
                        onClick={() => setTasks(prevTasks =>
                            markTaskRecursive(prevTasks, parentIndexPath, { ...task, completed: !task.completed })
                        )}
                        className="bg-blue-500 cursor-pointer text-white px-3 py-1 rounded-md"
                    >
                        {task.completed ? <IoArrowUndoOutline /> : <TiTick />}
                    </button>

                    <button
                       onClick={() => handleDeleteTask(parentIndexPath)}
                        className="bg-gray-500 cursor-pointer text-white px-3 py-1 rounded-md"
                    >
                        <MdClose />
                    </button>

                    <button
                        onClick={() => setShowInputField(!showInputField)}
                        className="bg-gray-500 cursor-pointer text-white px-3 py-1 rounded-md"
                    >
                        <IoAdd />
                    </button>
                </div>
                <span>{task.text}</span>
            </div>

            {showInputField && (
                <input
                    type='text'
                    value={inputFieldText}
                    onChange={(e) => setInputFieldText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className='border p-1 mt-2'
                    placeholder="Add subtask and press Enter"
                />
            )}

            {task.subtasks && task.subtasks.length > 0 && (
                <ul className="ml-6 border-l pl-3 mt-2">
                    {task.subtasks.map((subtask, subIndex) => (
                        <TaskItems
                            key={subIndex}
                            task={subtask}
                            setTasks={setTasks}
                            parentIndexPath={[...parentIndexPath, subIndex]}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}

export default TaskItems;
