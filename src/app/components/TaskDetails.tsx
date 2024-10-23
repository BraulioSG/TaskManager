import "./TaskDetails.scss";
import { MdOutlineClose } from "react-icons/md";
import { Task } from "@/app/Models/Task";

export default function TaskDetails({
    task,
    onClose,
    updatedTask,
}: {
    task: Task;
    onClose: () => void;
    updatedTask: (updatedTask: Task) => void;
}) {

    const handleChange = (field: "title" | "description" | "dueDate" | "completed", value: string | boolean) => {
        // Modificar las propiedades de la tarea existente
        switch (field) {
            case "title":
                task.setTitle(value as string);
                break;
            case "description":
                task.setDescription(value as string);
                break;
            case "dueDate":
                task.setDueDate(value as string);
                break;
            case "completed":
                task.setCompleted(value as boolean);
                break;
            default:
                break;
        }

        // Llamar a updatedTask para notificar el cambio
        updatedTask(task);
    };

    return (
        <div className="task-details">
            <div className="cls-btn">
                <MdOutlineClose className="cls-icon" onClick={onClose} />
            </div>
            <div className="top-details">
                <input
                    type="checkbox"
                    className="task-details_checkbox"
                    checked={task.isCompleted()}
                    onChange={() => handleChange("completed", !task.isCompleted())}
                />
                <input
                    type="text"
                    className="task-details_title"
                    value={task.getTitle()}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="Título de la tarea"
                />
            </div>
            <div className="description-section">
                <textarea
                    className="task-details_description"
                    value={task.getDescription()}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Descripción de la tarea"
                />
            </div>
            <div className="due-date-section">
                <label htmlFor="due-date">Fecha de vencimiento:</label>
                <input
                    type="date"
                    id="due-date"
                    className="task-details_due-date"
                    value={task.getDueDate()}
                    onChange={(e) => handleChange("dueDate", e.target.value)}
                />
            </div>
        </div>
    );
}
