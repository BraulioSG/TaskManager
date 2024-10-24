"use client";
import "./tasksContainer.scss";

import { useState, useEffect, useContext } from "react";
import { ListsContext, ActiveListContext } from "../page";
import { Task } from "@/app/Models/Task";
import { TfiBarChart, TfiBarChartAlt } from "react-icons/tfi";

import { setTaskLists } from "../utils/Storage";


import TaskDetails from "./TaskDetails";
import TaskItem from "./taskItem";

export default function TasksContainer() {
    const [newTaskName, setNewTaskName] = useState<string>("");
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [sortOrder, setSortOrder] = useState<boolean>(false);

    const { lists, setLists } = useContext(ListsContext);
    const { activeIdx } = useContext(ActiveListContext);

    useEffect(() => {
        Array.from(document.querySelectorAll(".task-item")).forEach((el, idx) => {
            const e = el as HTMLElement;
            e.style.animationDelay = `${idx * 0.01}s`;
        })
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

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
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
                            <div className="filtered-list-title">
                                <h2>Pending</h2>
                                <button onClick={() => setSortOrder(prev => !prev)}> {sortOrder ? <TfiBarChart /> : <TfiBarChartAlt />} Sort</button>
                            </div>
                            <hr />
                            <div className="task-list">
                                {lists[activeIdx].getAllTasks().filter(task => !task.isCompleted()).sort((a, b) => {
                                    const order = sortOrder ? -1 : 1;
                                    if (a.isImportant()) return -1 * order;
                                    if (b.isImportant()) return 1 * order;
                                    return 0;
                                }).map(((task, index) => (
                                    <TaskItem key={index} task={task} setSelectedTask={setSelectedTask} />
                                )
                                ))}
                            </div>
                        </div>
                        <div className="filtered-list">
                            <div className="filtered-list-title">
                                <h2>Completed</h2>
                                <button onClick={() => setSortOrder(prev => !prev)}> {sortOrder ? <TfiBarChart /> : <TfiBarChartAlt />} Sort</button>
                            </div>
                            <hr />
                            <div className="task-list">
                                {lists[activeIdx].getAllTasks().filter(task => task.isCompleted()).sort((a, b) => {
                                    const order = sortOrder ? -1 : 1;
                                    if (a.isImportant()) return -1 * order;
                                    if (b.isImportant()) return 1 * order;
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
                    <button className="add-btn" onClick={updateList}>Add</button>
                </div>
            </div>
            <aside className={`sidebar-details ${selectedTask ? "show" : ""}`}>
                {selectedTask ? (
                    <TaskDetails
                        task={selectedTask}
                        onClose={() => setSelectedTask(null)}
                    />
                ) : null}
            </aside>
        </div>
    );
}
