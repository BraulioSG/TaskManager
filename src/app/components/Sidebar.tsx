import { useContext, useState } from "react";
import { deleteTaskList, saveNewTaskList } from "@/app/utils/Storage";
import { TaskList } from "@/app/Models/Task";

import "./Sidebar.scss"
import { TfiArrowCircleLeft, TfiPlus, TfiTrash, TfiLayoutListThumb } from "react-icons/tfi";
import { ActiveListContext, ListsContext } from "../page";


//@ts-ignore
export default function Sidebar() {
    const { lists, setLists } = useContext(ListsContext);
    const { activeIdx, setActiveIdx } = useContext(ActiveListContext);

    const [showSideBar, setShowSideBar] = useState<boolean>(false);

    /**
     * Creates a new TaskList and save it to the localStorage
     */
    const handleNewlist = () => {
        const input = document.querySelector("#newListInput") as HTMLInputElement;

        if (input.value.trim().length <= 0) return;

        const newList = new TaskList(input.value);

        input.value = "";

        setLists(saveNewTaskList(newList));
    }

    /**
     * Removes a TaskList and update the localStorage
     * @param {string} id - id of the TaskList to be deleted
     */
    const handleDeleteList = (id: string) => {
        setLists(deleteTaskList(id));
        setActiveIdx(0);
    }


    //listen to the key presses in the whole document for the shortcuts
    document.documentElement.addEventListener("keydown", (event: any) => {

        //ignore if the user is typing in a input
        if (document.activeElement?.tagName === "INPUT") {
            if (event.key === "Enter" && document.activeElement.id === "newListInput") {
                handleNewlist();
                setActiveIdx(lists.length);
            }
            return;
        }

        const code = event.code;

        if (code.startsWith('Digit')) {
            const digit: string = code.replace('Digit', '');

            let num: number = parseInt(digit) - 1;
            if (num < 0) num = 9;

            if (num >= lists.length) return;

            setActiveIdx(num);
        }

    })



    return (
        <>
            {/* Button to open the sidebar */}
            <button className={`showSidebarBtn ${!showSideBar ? "show" : "hide"}`} onClick={() => setShowSideBar(true)}>
                <TfiLayoutListThumb />
                <span>My lists</span>
            </button>

            {/* Sidebar where the list of TaskLists is displayed */}
            <aside className={`sidebar ${showSideBar ? "show" : "hide"}`} id="sidebar">
                <div className="sidebar-top">
                    <h2>My Lists</h2>
                    <button onClick={() => setShowSideBar(false)}>
                        <TfiArrowCircleLeft />
                    </button>
                </div>

                {/* Mapping of the task lists */}
                <div className="lists-container">
                    {lists.map((list, index) => {
                        return (
                            <a key={`${list.getName()}-${index}`} className={`list-btn ${index === activeIdx ? "activeList" : ""}`}>
                                <button onClick={() => { setActiveIdx(index); setShowSideBar(false) }} >
                                    {/* Only add the key to press to the first 10 items*/}
                                    {index < 10 && <span className="key-to-press">{(index + 1) % 10}</span>}
                                    <h3>{list.getName()}</h3>
                                </button>

                                <button className="delete-btn" onClick={() => handleDeleteList(list.getId())}>
                                    <TfiTrash />
                                </button>
                            </a>
                        );
                    })}
                </div>

                {/* Section to add a new list */}
                <div className="newList">
                    <input type="text" id="newListInput" placeholder="Your new list" />
                    <button onClick={handleNewlist} className="newListBtn">
                        <span className="icon"><TfiPlus /></span>
                        <span className="text">New List</span>
                    </button>
                </div>
            </aside>
        </>
    )
}