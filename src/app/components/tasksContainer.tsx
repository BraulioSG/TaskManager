import TaskItem from "./taskItem";
import "./tasksContainer.scss";
export default function TasksContainer() {
    return (
        <div className="tasks-container">
            <TaskItem />
            <TaskItem />
            <TaskItem />
        </div>
    );
}