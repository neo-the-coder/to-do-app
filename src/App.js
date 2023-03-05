import styles from "./styles/App.module.scss";
import AppBlock from "./components/AppBlock";
import FilterBlock from "./components/FilterBlock";
import { useState } from "react";
import TaskWindow from "./components/TaskWindow";
import { BsHeartFill, BsPlus } from "react-icons/bs";
import { modalON } from "./styles/LayoutFix";

function App() {
  const [taskWindowOpen, setTaskWindowOpen] = useState(false);

  const handleAdd = () => {
    setTaskWindowOpen(true);
    modalON();
  }

  return (
    <>
      <h1 className={styles.appHeader}>React Todo App</h1>
      <div className={styles.app__wrapper}>
        <FilterBlock />
        <AppBlock/>
      </div>
      <footer>Made with <BsHeartFill /> by <a href="https://github.com/neo-the-coder">Kamran Zeynalov</a></footer>
      <button
        onClick={handleAdd}
        title="Add task"
        className={styles.addButton}
        id="add-button"
      >
        <BsPlus />
      </button>
      <TaskWindow
        type="add"
        taskWindowOpen={taskWindowOpen}
        setTaskWindowOpen={setTaskWindowOpen}
      />
    </>
  );
}

export default App;
