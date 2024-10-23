import "./taskItem.scss";
export interface TaskItemProps {
      id: number;
      title: string;
      description: string;
      important: boolean;
      completed: boolean;
  }
export default function TaskItem(task : TaskItemProps) { 
    return (
        <div className="task-item">
            <div className="task-item_left">
                <input type="checkbox" className="task-item_checkbox" onClick={(e) => {e.stopPropagation()}}/>
                <div className="task-item_title">
                    <h3>{task.title}</h3>
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