import "./taskItem.scss";
export default function TaskItem() {
    return (
        <div className="task-item">
            <div className="task-item_left">
                <input type="checkbox" className="task-item_checkbox"/>
                <div className="task-item_title">
                    <h3>Task Title</h3>
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