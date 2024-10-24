"use client";
import "./tasksContainer.scss";

import { useState, useEffect, useContext } from "react";
import { ListsContext, ActiveListContext } from "../page";
import { Task, TaskList } from "@/app/Models/Task";
import { setTaskLists } from "../utils/Storage";


import TaskDetails from "./TaskDetails";
import TaskItem from "./taskItem";

export default function TasksContainer() {
    const [newTaskName, setNewTaskName] = useState<string>("");
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const { lists, setLists } = useContext(ListsContext);
    const { activeIdx } = useContext(ActiveListContext);

    const updateTask = (updatedTask: Task) => {
        console.log("task update");
        if (lists) {
            lists[activeIdx].editTask(updatedTask.getId(), updatedTask);
            setTaskLists(lists);
            setLists(lists);
        }
    };

    useEffect(() => {
        console.log("lists updated")
    }, [lists, activeIdx])

    const updateList = () => {
        if (lists && newTaskName) {
            const newTask = new Task(newTaskName, "", "00-00-0000");
            console.log(newTask);
            lists[activeIdx].addTask(newTask);
            setLists(setTaskLists(lists));
            setNewTaskName("");
        }
    };

    // Cambia el tipo de e a React.MouseEvent<HTMLDivElement>
    const handleOutsideClick = (e: React.MouseEvent<HTMLElement>) => {
        if (!(e.target as Element).closest('.tasks-component') && !(e.target as Element).closest('.sidebar')) {
            setSelectedTask(null);
        }
    };

    return (
        <div className="tasks-component" onClick={handleOutsideClick}>
            <div className="tasks-container" >
                <div className="top">
                    <h1>{lists[activeIdx]?.getName() ?? "Task Manager"}</h1>
                </div>
                {lists[activeIdx] &&
                    <div className="list">
                        <div className="filtered-list">
                            <h2>Pending</h2>
                            <hr />
                            <div className="task-list">
                                {lists[activeIdx].getAllTasks().filter(task => !task.isCompleted()).sort((a, b) => {
                                    if (a.isImportant()) return -1;
                                    if (b.isImportant()) return 1;
                                    return 0;
                                }).map(((task, index) => (
                                    <TaskItem key={index} task={task} setSelectedTask={setSelectedTask} />
                                )
                                ))}
                            </div>
                        </div>
                        <div className="filtered-list">
                            <h2>Completed</h2>
                            <hr />
                            <div className="task-list">
                                {lists[activeIdx].getAllTasks().filter(task => task.isCompleted()).sort((a, b) => {
                                    if (a.isImportant()) return -1;
                                    if (b.isImportant()) return 1;
                                    return 0;
                                }).map(((task, index) => (
                                    <TaskItem key={index} task={task} setSelectedTask={setSelectedTask} />
                                )
                                ))}
                            </div>
                        </div>
                    </div>
                }
                <div className="addTask">
                    <input
                        type="text"
                        placeholder="New Task"
                        value={newTaskName}
                        onChange={(e) => setNewTaskName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                updateList();
                            }
                        }}
                        disabled={lists.length <= 0}
                    />
                </div>
            </div>
            <aside className={`sidebar-details ${selectedTask ? "show" : ""}`}>
                {selectedTask ? (
                    <TaskDetails
                        task={selectedTask}
                        onClose={() => setSelectedTask(null)}
                        updatedTask={updateTask}
                    />
                ) : null}
            </aside>
        </div>
    );
}
