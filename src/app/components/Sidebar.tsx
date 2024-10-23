import { useEffect, useState } from "react";
import { getPreferredTheme, getTaskLists, saveNewTaskList } from "@/app/utils/Storage";
import { TaskList } from "@/app/Models/Task";

import "./Sidebar.scss"
import { TfiArrowCircleLeft } from "react-icons/tfi";

export default function Sidebar() {

    const [lists, setLists] = useState<TaskList[]>([]);


    //TESTING THE STORAGE
    useEffect(() => {
        setLists(getTaskLists());
    }, []);

    const handleNewlist = () => {
        const newList = new TaskList("hello");

        setLists(saveNewTaskList(newList));
    }


    return (
        <aside className="sidebar">
            <div className="sidebar-top">

                <h2>My Lists</h2>
                <button>

                    <TfiArrowCircleLeft />
                </button>
            </div>
            <div className="lists-container">
                {lists.map((list, index) => {
                    const { pending, completed } = list.getTasks();
                    return (
                        <button key={`${list.getName()}-${index}`} className="list-btn">
                            <h3>{list.getName()}</h3>
                            <em>
                                {pending.length} pending <br />
                                {completed.length} completed
                            </em>
                        </button>
                    );
                })}
            </div>
            <button onClick={handleNewlist} className="newListBtn">New List</button>
        </aside>
    )
}