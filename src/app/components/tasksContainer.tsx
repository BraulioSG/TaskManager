import TaskItem from "./taskItem";
import "./tasksContainer.scss";
export default function TasksContainer() {
    return (
        <div className="tasks-container">
            <div className="top">
                <h1>Tasks</h1>
            </div>
            <div className="list">
                <TaskItem />
                <TaskItem />
                <TaskItem />
            </div>
            
        </div>
    );
}