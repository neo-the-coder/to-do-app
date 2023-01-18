import React, { useState } from 'react'
import styles from '../styles/TodoItem.module.scss';
import TaskWindow from './TaskWindow';

function TodoItem( {todo, taskWindowOpen, setTaskWindowOpen} ) {
  const [openUpdate, setOpenUpdate] = useState(false);

  return (
    <>
      <div className={styles.todoItem}>
        <div className={styles.todoDetails}>
          <div className={styles.checkbox}>[x]</div>
          <p className={styles.task}>{todo.task}</p>
          <div className={styles.time}>
            {todo.due}
            {/* <p className={styles.time}>
              {format(new Date(todo.time), 'dd/MM/yyyy, HH:mm')}
            </p> */}
          </div>
          <hr />
          <div className={styles.todoButtons}>
            <div
              className={styles.button}
              //onClick={handleDelete}
              //onKeyDown={handleDelete}
              tabIndex={0}
              role="button"
            >
              Delete{/* <MdDelete /> */}
            </div>
            <div
              className={styles.button}
              onClick={() => setOpenUpdate(true)}
              onKeyDown={() => setOpenUpdate(true)}
              role="button"
              tabIndex={0}
            >
              Edit{/* <MdEdit /> */}
            </div>
          </div>
        </div>
      </div>
      <TaskWindow todo={todo} type="update" taskWindowOpen={openUpdate} setTaskWindowOpen={setOpenUpdate} />
    </>
  );
}

export default TodoItem