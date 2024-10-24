import "./TaskDetails.scss";
import React, { useContext } from "react";
import { MdOutlineClose } from "react-icons/md";
import { Task } from "@/app/Models/Task";
import { ActiveListContext, ListsContext } from "../page";

// Helper para convertir de "YYYY-MM-DD" a "DD-MM-YYYY"
const formatDateToDisplay = (isoDate: string): string => {
    const [year, month, day] = isoDate.split("-");
    if (!year || !month || !day) return ""; // Manejo de valores inválidos
    return `${day}-${month}-${year}`;
};

// Helper para convertir de "DD-MM-YYYY" a "YYYY-MM-DD"
const formatDateToISO = (displayDate: string): string => {
    const [day, month, year] = displayDate.split("-");
    if (!day || !month || !year) return ""; // Manejo de valores inválidos
    return `${year}-${month}-${day}`;
};

interface TaskDetailsProps {
    task: Task,
    onClose: any
}

export default function TaskDetails({ task, onClose }: TaskDetailsProps) {
    // Estado para manejar la fecha seleccionada en formato DD-MM-YYYY
    const [dueDate, setDueDate] = React.useState(formatDateToDisplay(task.getDueDate()));

    const { lists, setLists } = useContext(ListsContext);
    const { activeIdx } = useContext(ActiveListContext);

    const handleChange = (field: "title" | "description" | "dueDate" | "completed", value: string | boolean) => {
        switch (field) {
            case "title":
                task.setTitle(value as string);
                break;
            case "description":
                task.setDescription(value as string);
                break;
            case "dueDate":
                // Guardar la fecha en formato ISO (YYYY-MM-DD) en el objeto Task
                task.setDueDate(formatDateToISO(value as string));
                // Actualizar el estado para mostrar la fecha en formato DD-MM-YYYY
                setDueDate(value as string);
                break;
            case "completed":
                task.setCompleted(value as boolean);
                break;
            default:
                break;
        }

        const newLists = [...lists];
        newLists[activeIdx].editTask(task.getId(), task);

        setLists(newLists);
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
                    value={formatDateToISO(dueDate)}  // Convertir a formato ISO para el calendario
                    onChange={(e) => handleChange("dueDate", formatDateToDisplay(e.target.value))} // Convertir a DD-MM-YYYY
                />

            </div>
        </div>
    );
}
