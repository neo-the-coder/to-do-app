import styles from "./styles/App.module.scss";
import AppBlock from "./components/AppBlock";
import FilterBlock from "./components/FilterBlock";
import { useState } from "react";
import TaskWindow from "./components/TaskWindow";
import { BsHeartFill, BsPlus } from "react-icons/bs";

function App() {
  const [taskWindowOpen, setTaskWindowOpen] = useState(false);

  return (
    <div className={styles.app}>
      <h1 className={styles.appHeader}>React Todo App</h1>
      <div className={styles.app__wrapper}>
        <FilterBlock />
        <AppBlock
          taskWindowOpen={taskWindowOpen}
          setTaskWindowOpen={setTaskWindowOpen}
        />
      </div>
      <button
        onClick={() => setTaskWindowOpen(true)}
        title="Add task"
        className={styles.addButton}
      >
        <BsPlus />
      </button>
      <TaskWindow
        type="add"
        taskWindowOpen={taskWindowOpen}
        setTaskWindowOpen={setTaskWindowOpen}
      />
    <footer>Made with <BsHeartFill /> by <a href="https://github.com/neo-the-coder">Kamran Zeynalov</a></footer>
    </div>
  );
}

export default App;
