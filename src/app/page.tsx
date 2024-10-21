import styles from "./page.module.css";
import TaskItem  from "./components/taskItem";

export default function Home() {
  return (
    <div className={styles.page}>
      <TaskItem />
    </div>
  );
}
