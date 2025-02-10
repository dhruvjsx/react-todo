// import React,{ useMemo } from 'react';
import React, { useMemo } from "react"
import TaskItems from './TaskItem';

const TaskList = ({ tasks, setTasks }) => {
    const taskList = useMemo(() => (
        tasks.map((task, index) => (
            <TaskItems key={index} task={task} parentIndexPath={[index]} setTasks={setTasks} />
        ))
    ), [tasks, setTasks]); 
    return (
        tasks.length > 0 && (
          
                <ul className="">{taskList}</ul>
            
        )
    );
};

export default TaskList;
