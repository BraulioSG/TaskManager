"use client";
import { useState, useEffect, useContext } from "react";
import "./tasksContainer.scss";
import TaskDetails from "./TaskDetails";
import { Task, TaskList } from "@/app/Models/Task";
import TaskItem from "./taskItem";
import { ListsContext, ActiveListContext } from "./page";

export default function TasksContainer() {
    const [tasks, setTasks] = useState <TaskList>();

    const lists = useContext(ListsContext);
    const activeIdx = useContext(ActiveListContext);

    useEffect(() => {
        setTasks(lists[activeIdx]);
    }, [activeIdx, lists]);

    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    return (
        <div className="tasks-component">
            <div className="tasks-container">
                <div className="top">
                    <h1>Tasks</h1>
                </div>
                <div className="list">
                    {
                        tasks.getTasks().pending.map((task, index) => (
                            <div key={index} onClick={() => setSelectedTask(task)} className="task"> 
                                <TaskItem task={task} />
                            </div>
                        ))
                    }
                </div>
                <div className="addTask">
                    <input type="text" placeholder="+ Agregar una tarea" />
                </div>
            </div>
            <aside className={`sidebar-details ${selectedTask ? "show" : ""}`}>
                {
                    selectedTask ? (
                        <TaskDetails  task={selectedTask} onClose={() => setSelectedTask(null)}/>
                    ) : null
                    
                }
            </aside>
        </div>
    );
}