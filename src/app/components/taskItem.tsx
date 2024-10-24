import "./taskItem.scss";
import { Task } from "@/app/Models/Task";

export default function TaskItem({ task, updateTask, }: { task: Task; updateTask: (task: Task) => void; }) {

    const handleCompletedChange = () => {
        task.setCompleted(!task.isCompleted());
        updateTask(task);
    };

    const handleImportantChange = () => {
        task.setIsImportant(!task.isImportant());
        updateTask(task);
    }

    return (
        <div className={`task-item ${task.isCompleted() ? "completed" : ""}`}>
            <div className="task-item_left">
                <input
                    type="checkbox"
                    className="task-item_checkbox"
                    onChange={e => { e.preventDefault(); handleCompletedChange(); }}
                    checked={task.isCompleted()}
                />
                <div className="task-item_title">
                    <h3>{task.getTitle()}</h3>
                </div>
            </div>
            <div className="task-item_right">
                <input
                    type="checkbox"
                    id={`important-${task.getId()}`}
                    className="task-item_important"
                    onChange={e => { e.preventDefault(); handleImportantChange(); }}
                    checked={task.isImportant()}
                />
                <label htmlFor={`important-${task.getId()}`} className="important-label">
                    <div className="star unchecked"></div>
                    <div className="star checked"></div>
                </label>
            </div>
        </div>
    );
}
