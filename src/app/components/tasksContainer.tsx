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
            const { pending } = lists[activeIdx].getTasks();
            setTasks(pending);
        }
    }, [activeIdx, lists]);

    const updateTask = (updatedTask: Task) => {
        if (lists) {
            const currentList = lists[activeIdx];
            const taskIndex = currentList.getTasks().pending.findIndex(task => task.getTitle() === updatedTask.getTitle());
            console.log(taskIndex);

            if (taskIndex !== -1) {
                currentList.getTasks().pending[taskIndex] = updatedTask;
                setTasks([...currentList.getTasks().pending]);
                setLists(setTaskLists(lists));
            }
        }
    };

    const updateList = () => {
        if (lists && newTaskName) {
            const newTask = new Task(newTaskName, "", "00-00-0000");
            lists[activeIdx].addTask(newTask);
            const { pending } = lists[activeIdx].getTasks();
            setTasks(pending);
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
                    <h1>Tasks</h1>
                </div>
                <div className="list">
                    {tasks.map((task, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedTask(task)}
                            className="task"
                        >
                            <TaskItem task={task} updateTask={updateTask} />
                        </div>
                    ))}
                </div>
                <div className="addTask">
                    <input
                        type="text"
                        placeholder="+ Agregar una tarea"
                        value={newTaskName}
                        onChange={(e) => setNewTaskName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                updateList();
                            }
                        }}
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
