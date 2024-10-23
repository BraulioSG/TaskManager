"use client"
import TasksContainer from "./components/tasksContainer";
import Sidebar from "@/app/components/Sidebar";

import { TaskList } from "@/app/Models/Task";
import { useState, createContext, useEffect } from "react";
import { getTaskLists } from "@/app/utils/Storage";


import "./page.scss"

export const ListsContext = createContext([new TaskList("")])
export const ActiveListContext = createContext(0);

export default function Home() {
  const [lists, setLists] = useState<TaskList[]>([]);
  const [activeIdx, setActiveIdx] = useState<number>(0);

  useEffect(() => {
    setLists(getTaskLists());
  }, []);

  return (
    <ListsContext.Provider value={lists}>
      <ActiveListContext.Provider value={activeIdx}>
        <div className={"main-container"}>
          <Sidebar />
          <TasksContainer />
        </div>
      </ActiveListContext.Provider>
    </ListsContext.Provider>

  );
}
