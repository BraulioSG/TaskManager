import "./TaskDetails.scss";
import React, { useContext } from "react";
import { useId } from "react";
import { MdOutlineClose, MdDelete, MdImage} from "react-icons/md";
import { Task } from "@/app/Models/Task";
import { ActiveListContext, ListsContext } from "../page";
import { setTaskLists } from "../utils/Storage";

//Para convertir de "YYYY-MM-DD" a "DD-MM-YYYY"
const formatDateToDisplay = (isoDate: string): string => {
    const [year, month, day] = isoDate.split("-");
    if (!year || !month || !day) return "";
    return `${day}-${month}-${year}`;
};

//Para convertir de "DD-MM-YYYY" a "YYYY-MM-DD"
const formatDateToISO = (displayDate: string): string => {
    const [day, month, year] = displayDate.split("-");
    if (!day || !month || !year) return ""; 
    return `${year}-${month}-${day}`;
};

interface TaskDetailsProps {
    task: Task,
    onClose: any
}

export default function TaskDetails({ task, onClose }: TaskDetailsProps) {

    const { lists, setLists } = useContext(ListsContext);
    const { activeIdx } = useContext(ActiveListContext);

    const importantId = useId();

    const handleChange = (field: "title" | "description" | "dueDate" | "completed" | "important", value: string | boolean) => {
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
            case "important":
                task.setIsImportant(value as boolean);
            default:
                break;
        }

        const newLists = [...lists];
        newLists[activeIdx].editTask(task.getId(), task);

        setTaskLists(newLists);
        setLists(newLists);
    };

    const handleImage = () => {
        let image = window.prompt("Insert the URL of the background you want");

        if (image) {
            task.setImageUrl(image);
            const newLists = [...lists];
            newLists[activeIdx].editTask(task.getId(), task);

            setTaskLists(newLists);
            setLists(newLists);

        } else {
            console.log("No URL provided");
        }
    }
    const handleDelete = () => {
        const { pending, completed } = lists[activeIdx].getTasks();
    
        const newPendingTasks = pending.filter(t => t.getId() !== task.getId());
        const newCompletedTasks = completed.filter(t => t.getId() !== task.getId());
    
        const newLists = [...lists];
        newLists[activeIdx].setTasks([...newPendingTasks, ...newCompletedTasks]);
    
        setTaskLists(newLists);
        setLists(newLists);
        onClose();
    };
    


    return (
        <div className="task-details">
            <div className="cls-btn">
                <MdOutlineClose className="cls-icon" onClick={onClose} />
            </div>
            <div className="top-details">
                <div className="details-checkbox">
                    <input
                        type="checkbox"
                        className="details_checkbox"
                        checked={task.isCompleted()}
                        onChange={() => handleChange("completed", !task.isCompleted())}
                    />
                </div>
                <input
                    type="text"
                    className="task-details_title"
                    value={task.getTitle()}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="Título de la tarea"
                />
                <div className="details-checkbox">
                    <input
                        type="checkbox"
                        id={importantId}
                        className="details_important"
                        onChange={() => {
                            handleChange("important", !task.isImportant());
                        }}
                        checked={task.isImportant()}
                    />
                    <label htmlFor={importantId} className="important-label">
                        <div className="star unchecked"></div>
                        <div className="star checked"></div>
                    </label>
                </div>
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
                    onChange={(e) => handleChange("dueDate", formatDateToDisplay(e.target.value))} // Convertir a DD-MM-YYYY
                />

            </div>
            <div className="image-section">
                {
                    task.getImageUrl() ? (
                        <img src={`${task.getImageUrl()}`} alt="image" />
                    ) : (
                        <p>No hay imagen</p>	
                    )
                }
                <div className="btn-img" onClick={handleImage}>
                    <MdImage className="btn-img_icon"/>
                    <p className="btn-img_text">Añadir imagen</p>
                </div>
            </div>
            <div className="btn-delete" onClick={handleDelete}>
                <p className="btn-delete_text">Delete Task</p>
                <MdDelete className="btn-delete_icon"/>
            </div>
        </div>
    );
}
