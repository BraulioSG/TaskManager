"use client"
import TasksContainer from "./components/tasksContainer";
import Sidebar from "@/app/components/Sidebar";

import "./page.scss"

export default function Home() {
  return (
    <div className={"main-container"}>
        <Sidebar />
        <TasksContainer />
    </div>
  );
}
