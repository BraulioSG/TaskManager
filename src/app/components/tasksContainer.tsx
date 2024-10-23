"use client";
import { useState } from "react";
import "./tasksContainer.scss";
import TaskDetails from "./TaskDetails";
import TaskItem,{  TaskItemProps } from "./taskItem";

export default function TasksContainer() {
    const [tasks, setTasks] = useState <TaskItemProps[]>([
        {
            id: 1,
            title: "Tarea 1",
            description: "Descripción de la tarea 1",
            important: false,
            completed: false,
        },
        {
            id: 2,
            title: "Tarea 2",
            description: "Descripción de la tarea 2",
            important: false,
            completed: false,
        },
        {
            id: 3,
            title: "Tarea 3",
            description: "Descripción de la tarea 3",
            important: false,
            completed: false,
        },
        {
            id: 4,
            title: "Tarea 4",
            description: "Descripción de la tarea 4",
            important: false,
            completed: false,
        },
        {
            id: 5,
            title: "Tarea 5",
            description: "Descripción de la tarea 5",
            important: false,
            completed: false,
        },
        {
            id: 6,
            title: "Tarea 6",
            description: "Descripción de la tarea 6",
            important: false,
            completed: false,
        },
        {
            id: 7,
            title: "Tarea 7",
            description: "Descripción de la tarea 7",
            important: false,
            completed: false,
        },
        {
            id: 8,
            title: "Tarea 8",
            description: "Descripción de la tarea 8",
            important: false,
            completed: false,
        },
        {
            id: 9,
            title: "Tarea 9",
            description: "Descripción de la tarea 9",
            important: false,
            completed: false,
        },
        {
            id: 10,
            title: "Tarea 10",
            description: "Descripción de la tarea 10",
            important: false,
            completed: false,
        },
        {
            id: 11,
            title: "Tarea 11",
            description: "Descripción de la tarea 11",
            important: false,
            completed: false,
        },
        {
            id: 12,
            title: "Tarea 12",
            description: "Descripción de la tarea 12",
            important: false,
            completed: false,
        },
    ]);
    const [selectedTask, setSelectedTask] = useState<TaskItemProps | null>(null);
    return (
        <div className="tasks-component">
            <div className="tasks-container">
                <div className="top">
                    <h1>Tasks</h1>
                </div>
                <div className="list">
                    {
                        tasks.map((task) => (
                            <div key={task.id} onClick={(e) => {e.stopPropagation();setSelectedTask(task)}} className="task"> 
                                <TaskItem key={task.id} {...task} />
                            </div>
                        ))
                    }
                </div>
                <div className="addTask">
                    <input type="text" placeholder="+ Agregar una tarea" />
                </div>
            </div>
            <aside className="sidebar">
                {
                    selectedTask ? (
                        <TaskDetails />
                    ) : null
                    
                }
            </aside>
        </div>
    );
}