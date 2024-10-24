import "./taskItem.scss";
import { Task } from "@/app/Models/Task";
import { useId } from "react";

export default function TaskItem({
  task,
  updateTask,
}: {
  task: Task;
  updateTask: (task: Task) => void;
}) {

  const importantId = useId();
  console.log(importantId);

  const handleCompletedChange = () => {
    task.setCompleted(!task.isCompleted());
    updateTask(task);
  };

  const handleImportantChange = () => {
    task.setIsImportant(!task.isImportant());
    updateTask(task);
  };

  return (
    <div className={`task-item ${task.isCompleted() ? "completed" : ""}`}>
      <div className="task-item_left">
        <input
          type="checkbox"
          className="task-item_checkbox"
          onChange={(e) => {
            e.preventDefault();
            handleCompletedChange();
          }}
          checked={task.isCompleted()}
        />
        <div className="task-item_title">
          <h3>{task.getTitle()}</h3>
        </div>
      </div>
      <div className="task-item_right">
        <input
          type="checkbox"
          id={importantId} 
          className="task-item_important"
          onChange={(e) => {
            e.stopPropagation();
            handleImportantChange();
          }}
          checked={task.isImportant()}
        />
        <label htmlFor={importantId} className="important-label">
          <div className="star unchecked"></div>
          <div className="star checked"></div>
        </label>
      </div>
    </div>
  );
}
