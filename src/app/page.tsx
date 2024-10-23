"use client"
import "./page.scss"

import { TaskList } from "@/app/Models/Task";
import { useState, createContext, useEffect } from "react";
import { getPreferredTheme, getTaskLists } from "@/app/utils/Storage";

import TasksContainer from "./components/tasksContainer";
import Sidebar from "@/app/components/Sidebar";
import ThemeToggler from "./components/ThemeToggler";


//Contexts
export const ListsContext = createContext([new TaskList("")])
export const ActiveListContext = createContext(0);
export const ThemeContext = createContext('dark' as "dark" | "light")

export default function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>();
  const [lists, setLists] = useState<TaskList[]>([]);
  const [activeIdx, setActiveIdx] = useState<number>(0);

  useEffect(() => {
    setTheme(getPreferredTheme());
    setLists(getTaskLists());
  }, []);

  document.documentElement.setAttribute("data-theme", theme as string);

  return (
    <ListsContext.Provider value={lists}>
      <ActiveListContext.Provider value={activeIdx}>
        {/* @ts-ignore */}
        <ThemeContext.Provider value={theme}>
          <div className={"main-container"}>
            <ThemeToggler setTheme={setTheme} />
            <Sidebar setLists={setLists} setActiveIdx={setActiveIdx} />
            {/* @ts-ignore */}
            <TasksContainer setLists={setLists} />
          </div>
        </ThemeContext.Provider>
      </ActiveListContext.Provider>
    </ListsContext.Provider>

  );
}
