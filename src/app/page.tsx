"use client"
import styles from "./page.module.css";
import TasksContainer from "./components/tasksContainer";
import Sidebar from "@/app/components/Sidebar";

export default function Home() {
  return (
    <div className={styles.page}>
        <Sidebar />
        <TasksContainer />
    </div>
  );
}
