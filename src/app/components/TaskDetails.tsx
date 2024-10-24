import "./TaskDetails.scss";
import { MdOutlineClose } from "react-icons/md";
import { Task } from "@/app/Models/Task";

//Para convertir de "YYYY-MM-DD" a "DD-MM-YYYY"
const formatDateToDisplay = (isoDate: string): string => {
    const [year, month, day] = isoDate.split("-");
    if (!year || !month || !day) return ""; 
    return `${day}-${month}-${year}`;
};

// Para convertir de "DD-MM-YYYY" a "YYYY-MM-DD"
const formatDateToISO = (displayDate: string): string => {
    const [day, month, year] = displayDate.split("-");
    if (!day || !month || !year) return ""; 
    return `${year}-${month}-${day}`;
};

export default function TaskDetails({
    task,
    onClose,
    updatedTask,
}: {
    task: Task;
    onClose: () => void;
    updatedTask: (updatedTask: Task) => void;
}) {

    const handleChange = (field: "title" | "description" | "completed", value: string | boolean) => {
        switch (field) {
            case "title":
                task.setTitle(value as string);
                break;
            case "description":
                task.setDescription(value as string);
                break;
            case "completed":
                task.setCompleted(value as boolean);
                break;
            default:
                break;
        }

        updatedTask(task);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isoDate = e.target.value; 
        task.setDueDate(formatDateToDisplay(isoDate));
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
                <label htmlFor="due-date">Fecha de vencimiento (DD-MM-YYYY):</label>
                <input
                    type="date"
                    id="due-date"
                    className="task-details_due-date"
                    value={formatDateToISO(task.getDueDate())}
                    onChange={handleDateChange} 
                />
            </div>
        </div>
    );
}
