import { useContext, useState } from "react";
import { deleteTaskList, saveNewTaskList } from "@/app/utils/Storage";
import { TaskList } from "@/app/Models/Task";

import "./Sidebar.scss"
import { TfiArrowCircleLeft, TfiPlus, TfiTrash, TfiLayoutListThumb } from "react-icons/tfi";
import { ActiveListContext, ListsContext } from "../page";


//@ts-ignore
export default function Sidebar({ setLists, setActiveIdx }) {
    const lists = useContext(ListsContext);
    const activeIdx = useContext(ActiveListContext);

    const [isOnFocus, setIsOnFocus] = useState<boolean>(true);
    const [showSideBar, setShowSideBar] = useState<boolean>(false);

    const handleNewlist = () => {
        const input = document.querySelector("#newListInput") as HTMLInputElement;

        if (input.value.trim().length <= 0) return;

        const newList = new TaskList(input.value);

        input.value = "";

        setLists(saveNewTaskList(newList));
    }

    const handleDeleteList = (id: string) => {
        setLists(deleteTaskList(id));
    }

    const handleKeyPressed = (event: any) => {
        if (isOnFocus) {
            if (event.key === "Enter") handleNewlist();

            return;
        };
        const code = event.code;

        if (code.startsWith('Digit')) {
            const digit: string = code.replace('Digit', '');

            let num: number = parseInt(digit) - 1;
            if (num < 0) num = 9;

            setActiveIdx(num);
        }

    }

    return (
        <>
            <button className={`showSidebarBtn ${!showSideBar ? "show" : "hide"}`} onClick={() => setShowSideBar(true)}>
                <TfiLayoutListThumb />
                <span>My lists</span>
            </button>
            <aside className={`sidebar ${showSideBar ? "show" : "hide"}`} onKeyDown={(e) => handleKeyPressed(e)}>
                <div className="sidebar-top">

                    <h2>My Lists</h2>
                    <button onClick={() => setShowSideBar(false)}>
                        <TfiArrowCircleLeft />
                    </button>
                </div>
                <div className="lists-container">
                    {lists.map((list, index) => {
                        return (
                            <a
                                key={`${list.getName()}-${index}`}
                                className={`list-btn ${index === activeIdx ? "activeList" : ""}`}
                                onClick={() => setActiveIdx(index)}
                            >
                                {index < 10 && <span className="key-to-press">{(index + 1) % 10}</span>}
                                <h3>{list.getName()}</h3>
                                <button className="delete-btn" onClick={() => handleDeleteList(list.getId())}>
                                    <TfiTrash />
                                </button>
                            </a>
                        );
                    })}
                </div>
                <div className="newList">
                    <input type="text" id="newListInput" onFocus={() => setIsOnFocus(true)} onBlur={() => setIsOnFocus(false)} placeholder="Your new list" />
                    <button onClick={handleNewlist} className="newListBtn">
                        <span className="icon"><TfiPlus /></span>
                        <span className="text">New List</span>
                    </button>
                </div>
            </aside>
        </>
    )
}