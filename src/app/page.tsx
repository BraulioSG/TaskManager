import styles from "./page.module.css";
import TasksContainer from "./components/tasksContainer";

export default function Home() {
  return (
    <div className={styles.page}>
      <TasksContainer />
    </div>
  );
}
