import {useEffect, useState} from "react";
import {getPreferredTheme, getTaskLists, saveNewTaskList} from "@/app/utils/Storage";
import {TaskList} from "@/app/Models/Task";

export default function Sidebar(){

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
            <h2>My Lists</h2>
            {lists.map((list, index) => {
                return (
                    <button key={`${list.getName()}-${index}`}>
                        <h3>{list.getName()}</h3>
                    </button>
                );
            })}
            <button onClick={handleNewlist}>New List</button>
        </aside>
    )
}