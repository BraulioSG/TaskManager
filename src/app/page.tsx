"use client"
import TasksContainer from "./components/tasksContainer";
import Sidebar from "@/app/components/Sidebar";

import { TaskList } from "@/app/Models/Task";
import { useState, createContext, useEffect } from "react";
import { getPreferredTheme, getTaskLists } from "@/app/utils/Storage";


import "./page.scss"
import ThemeToggler from "./components/ThemeToggler";

export const ListsContext = createContext([new TaskList("")])
export const ActiveListContext = createContext(0);

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>("dark");
  const [lists, setLists] = useState<TaskList[]>([]);
  const [activeIdx, setActiveIdx] = useState<number>(0);

  useEffect(() => {
    setTheme(getPreferredTheme())
    setLists(getTaskLists());
  }, []);

  console.log(theme);
  return (
    <ListsContext.Provider value={lists}>
      <ActiveListContext.Provider value={activeIdx}>
        <div className={"main-container"} data-theme={theme}>
          <ThemeToggler />
          <Sidebar />
          <TasksContainer />
        </div>
      </ActiveListContext.Provider>
    </ListsContext.Provider>

  );
}
