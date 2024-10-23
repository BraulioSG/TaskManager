"use client";
import { useState, useEffect } from "react";
import "./tasksContainer.scss";
import TaskDetails from "./TaskDetails";
import { Task, TaskList } from "@/app/Models/Task";
import TaskItem from "./taskItem";

export default function TasksContainer() {
    const [tasks, setTasks] = useState <TaskList>(
        new TaskList("Tasks")
    );

    useEffect(() => {
        const initialTasks = new TaskList("Tasks");
        initialTasks.addTask(new Task("First Task", "Description 1", "2022-01-01"));
        initialTasks.addTask(new Task("Second Task", "Description 2", "2022-01-02"));
        initialTasks.addTask(new Task("Third Task", "Description 3", "2022-01-03"));
        initialTasks.addTask(new Task("Third Task", "Description 3", "2022-01-03"));
        initialTasks.addTask(new Task("Third Task", "Description 3", "2022-01-03"));
        initialTasks.addTask(new Task("Third Task", "Description 3", "2022-01-03"));
        initialTasks.addTask(new Task("Third Task", "Description 3", "2022-01-03"));

        setTasks(initialTasks);
    }, []);

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