import styles from './styles/App.module.scss';
import AppBlock from './components/AppBlock';
import FilterBlock from './components/FilterBlock';
import { useState } from 'react';
import TaskWindow from './components/TaskWindow';
import { BsCalendarPlus } from 'react-icons/bs';

function App() {
  const [taskWindowOpen, setTaskWindowOpen] = useState(false);

  return (
    <div className={styles.app}>
      <h1>To do List</h1>
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
        // onKeyDown={() => setTaskWindowOpen(true)}
        // tabIndex={0}
        // role="button"
      >
        <BsCalendarPlus /> Add Task
      </button>
      <TaskWindow
        type="add"
        taskWindowOpen={taskWindowOpen}
        setTaskWindowOpen={setTaskWindowOpen}
      />
    </div>
  );
}

export default App;
