import "./TaskDetails.scss"
import { MdOutlineClose } from "react-icons/md";
import { Task } from "@/app/Models/Task";
export default function TaskDetails({ task, onClose }: { task: Task, onClose: () => void }) {
    return (
        <div className="task-details">
            <div className="cls-btn">
                <MdOutlineClose className="cls-icon" onClick={onClose}/>
            </div>
            <div className="top-details">
                <input type="checkbox" className="task-details_checkbox"/>
                <h1>{task.getTitle()}</h1>
            </div>
        </div>
    )
}