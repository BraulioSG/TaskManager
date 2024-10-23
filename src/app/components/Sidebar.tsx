import { useEffect, useState } from "react";
import { getPreferredTheme, getTaskLists, saveNewTaskList } from "@/app/utils/Storage";
import { TaskList } from "@/app/Models/Task";

import "./Sidebar.scss"
import { TfiArrowCircleLeft, TfiPlus } from "react-icons/tfi";


export default function Sidebar() {

    const [lists, setLists] = useState<TaskList[]>([]);
    const [activeIdx, setActiveIdx] = useState<number>(0);
    const [isOnFocus, setIsOnFocus] = useState<boolean>(true);




    //TESTING THE STORAGE
    useEffect(() => {
        setLists(getTaskLists());
    }, []);

    const handleNewlist = () => {
        const input = document.querySelector("#newListInput") as HTMLInputElement;

        const newList = new TaskList(input.value);

        input.value = "";

        setLists(saveNewTaskList(newList));
    }

    const handleKeyPressed = (event: any) => {
        if (isOnFocus) return;
        const code = event.code;

        if (code.startsWith('Digit')) {
            const digit: string = code.replace('Digit', '');

            let num: number = parseInt(digit) - 1;
            if (num < 0) num = 9;

            setActiveIdx(num);
        }

    }



    return (
        <aside className="sidebar" onKeyDown={(e) => handleKeyPressed(e)}>
            <div className="sidebar-top">

                <h2>My Lists</h2>
                <button>

                    <TfiArrowCircleLeft />
                </button>
            </div>
            <div className="lists-container">
                {lists.map((list, index) => {
                    return (
                        <button
                            key={`${list.getName()}-${index}`}
                            className={`list-btn ${index === activeIdx ? "activeList" : ""}`}
                            onClick={() => {
                                if (index < 10) setActiveIdx(index)
                            }}
                        >
                            {index < 10 && <span className="key-to-press">{(index + 1) % 10}</span>}
                            <h3>{list.getName()}</h3>
                        </button>
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
    )
}