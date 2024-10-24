import { useContext, useEffect, useState } from "react";
import "./taskItem.scss";
import { Task } from "@/app/Models/Task";

import { ActiveListContext, ListsContext } from "../page";
import { setTaskLists } from "../utils/Storage";

interface TaskItemProps {
    task: Task;
    setSelectedTask: any
}

export default function TaskItem({ task, setSelectedTask }: TaskItemProps) {
    const { lists, setLists } = useContext(ListsContext);
    const { activeIdx } = useContext(ActiveListContext);
    const [currentTask] = useState<Task>(task);

    useEffect(() => {

    }, [lists, currentTask])


    const handleCompletedChange = () => {
        const newLists = [...lists];
        task.setCompleted(!task.isCompleted())
        newLists[activeIdx].editTask(task.getId(), task)

        setLists(newLists);
    };

    const handleImportantChange = () => {
        const newLists = [...lists];
        task.setIsImportant(!task.isImportant())
        newLists[activeIdx].editTask(task.getId(), task)

        setLists(newLists);
    }

    const handleSelectedTask = () => {
        setSelectedTask(task);
    }

    return (
        <div className={`task-item ${task.isCompleted() ? "completed" : ""}`}>
            <div className="task-item-checkbox">
                <input
                    type="checkbox"
                    className="task-item_checkbox"
                    onChange={e => { e.preventDefault(); handleCompletedChange(); }}
                    checked={task.isCompleted()}
                />
            </div>
            <div className="task-item_title" onClick={() => { handleSelectedTask() }}>
                <h3>{task.getTitle()}</h3>
            </div>
            <div className="task-item-checkbox">
                <input
                    type="checkbox"

                    className="task-item_important"
                    onChange={e => { e.preventDefault(); handleImportantChange(); }}
                    checked={task.isCompleted()}
                />
                <label htmlFor="important" className="important-label">
                    <div className="star unchecked"></div>
                    <div className="star checked"></div>
                </label>
            </div>
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
