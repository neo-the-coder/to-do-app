import { format } from 'date-fns';
import React, { useState } from 'react'
import { BsCheck2Square, BsPencilSquare, BsTrash } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { subtractCount } from '../slices/categorySlice';
import { deleteTodo } from '../slices/todoSlice';
import styles from '../styles/TodoItem.module.scss';
import ConfirmationBox from './ConfirmationBox';
import TaskWindow from './TaskWindow';

function TodoItem( {todo} ) {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const dispatch = useDispatch();

  const handleUpdate = () => setOpenUpdate(true);
  const handleDelete = () => setOpenConfirm(true);
  const handleConfirmation = () => {
    dispatch(deleteTodo(todo.id));
    dispatch(subtractCount(todo.category));
  }

  return (
    <>
      <div className={styles.todoItem}>
        <div className={styles.todoDetails}>
          <div className={styles.checkbox}>
            <BsCheck2Square />
          </div>
          <p className={styles.task}>{todo.task}</p>
          <div className={styles.time}>
            {format(new Date(todo.due), 'dd LLL yyyy HH:mm')}
          </div>
          <hr />
          <div className={styles.todoButtons}>
            <div
              className={styles.button}
              onClick={handleUpdate}
              onKeyDown={handleUpdate}
              role="button"
              tabIndex={0}
            >
              <BsPencilSquare />
            </div>
            <div
              className={styles.button}
              onClick={handleDelete}
              onKeyDown={handleDelete}
              tabIndex={0}
              role="button"
            >
              <BsTrash />
            </div>
          </div>
        </div>
      </div>
      <TaskWindow todo={todo} type="update" taskWindowOpen={openUpdate} setTaskWindowOpen={setOpenUpdate} />
      <ConfirmationBox handleConfirmation={handleConfirmation} openConfirm={openConfirm} setOpenConfirm={setOpenConfirm} />
    </>
  );
}

export default TodoItem