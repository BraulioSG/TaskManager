import "./taskItem.scss";
import { Task } from "@/app/Models/Task";
export default function TaskItem({task}: {task: Task}) {
    const handleCompletedChange = (e: React.MouseEvent) => {
        e.stopPropagation();
        task.setCompleted(!task.isCompleted());
    };
    return (
        <div className="task-item">
            <div className="task-item_left">
                <input type="checkbox" className="task-item_checkbox" onClick={handleCompletedChange} checked={task.isCompleted()}/>
                <div className="task-item_title">
                    <h3>{task.getTitle()}</h3>
                </div>
            </div>
            <div className="task-item_right">
            <input type="checkbox" id="important" className="task-item_important"/>
                <label htmlFor="important" className="important-label">
                    <div className="star unchecked"></div>
                    <div className="star checked"></div>
                </label>
            </div>
        </div>
    );
}