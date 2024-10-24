"use client";
import { useState, useEffect, useContext } from "react";
import "./tasksContainer.scss";
import TaskDetails from "./TaskDetails";
import { Task, TaskList } from "@/app/Models/Task";
import TaskItem from "./taskItem";
import { ListsContext, ActiveListContext } from "../page";
import { setTaskLists } from "../utils/Storage";

export default function TasksContainer({ setLists }: { setLists: (lists: TaskList[]) => void }) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskName, setNewTaskName] = useState<string>("");
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const lists = useContext(ListsContext);
    const activeIdx = useContext(ActiveListContext);

    useEffect(() => {
        if (lists && lists[activeIdx]) {
            setTasks(lists[activeIdx].getAllTasks());
        }
    }, [activeIdx, lists]);

    const updateTask = (updatedTask: Task) => {
        if (lists) {
            lists[activeIdx].editTask(updatedTask.getId(), updatedTask);

            setTasks(lists[activeIdx].getAllTasks());
            setLists(lists);
            setTaskLists(lists);
        }
    };

    const updateList = () => {
        if (lists && newTaskName) {
            const newTask = new Task(newTaskName, "", "00-00-0000");
            console.log(newTask);
            lists[activeIdx].addTask(newTask);
            setTasks(lists[activeIdx].getAllTasks());
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
                {lists.length > 0 &&
                    <div className="list">
                        <div className="filtered-list">
                            <h2>Pending</h2>
                            <hr />
                            <div className="task-list">
                                {tasks.filter(task => !task.isCompleted()).sort((a, b) => {
                                    if (a.isImportant()) return -1;
                                    if (b.isImportant()) return 1;
                                    return 0;
                                }).map(((task, index) => (
                                    <TaskItem task={task} updateTask={updateTask} setSelectedTask={setSelectedTask} />
                                )
                                ))}
                            </div>
                        </div>
                        <div className="filtered-list">
                            <h2>Completed</h2>
                            <hr />
                            <div className="task-list">
                                {tasks.filter(task => task.isCompleted()).map(((task, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedTask(task)}
                                        className="task"
                                    >
                                        <TaskItem task={task} updateTask={updateTask} />
                                    </div>
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
