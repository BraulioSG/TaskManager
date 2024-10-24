"use client"
import "./page.scss"

import { TaskList } from "@/app/Models/Task";
import { useState, createContext, useEffect } from "react";
import { getPreferredTheme, getTaskLists } from "@/app/utils/Storage";

import TasksContainer from "./components/tasksContainer";
import Sidebar from "@/app/components/Sidebar";
import Toolbar from "./components/Toolbar";

//Contexts
export const ListsContext = createContext({
  lists: [] as TaskList[],
  setLists: (lists: TaskList[]) => { }
});

export const ActiveListContext = createContext({
  activeIdx: 0,
  setActiveIdx: (index: number) => { }
});

export const ThemeContext = createContext({
  theme: 'dark' as 'dark' | 'light',
  setTheme: (theme: 'dark' | 'light') => { }
});

export default function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>("dark");
  const [lists, setLists] = useState<TaskList[]>([]);
  const [activeIdx, setActiveIdx] = useState<number>(0);

  useEffect(() => {
    setTheme(getPreferredTheme());
    setLists(getTaskLists());
  }, []);

  document.documentElement.setAttribute("data-theme", theme as string);

  return (
    <ListsContext.Provider value={{ lists, setLists }}>
      <ActiveListContext.Provider value={{ activeIdx, setActiveIdx }}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <div className={"main-container"}>
            <Toolbar />
            <Sidebar />
            <TasksContainer />
          </div>
        </ThemeContext.Provider>
      </ActiveListContext.Provider>
    </ListsContext.Provider>

  );
}
