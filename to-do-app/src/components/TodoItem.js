import { format } from 'date-fns';
import React, { useState } from 'react'
import { BsCheck2Square, BsPencilSquare, BsTrash } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { subtractCount } from '../slices/categorySlice';
import { deleteTodo, updateTodo } from '../slices/todoSlice';
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
  //let a = `linear-gradient(, ${todo.color}, white`;
  return (
    <>
      <div className={styles.todoItem} style={{background: `linear-gradient(to top, orange, transparent)`}}>
        <div className={styles.todoDetails}>
          <button className={styles.checkbox} onClick={() => dispatch(updateTodo({id: todo.id, status: 'accomplished'}))}>
            <BsCheck2Square />
          </button>
          <p className={styles.task}>{todo.task}</p>
          <div className={styles.time}>
            {todo.due ? format(new Date(todo.due), 'dd LLL yyyy HH:mm') : '-'}
            || {todo.status}
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
      {/* optimize rendering by adding conditional state  */}
      {openUpdate && <TaskWindow todo={todo} type="update" taskWindowOpen={openUpdate} setTaskWindowOpen={setOpenUpdate} />}
      {openConfirm && <ConfirmationBox message={<h2>It will be gone forever</h2>} handleConfirmation={handleConfirmation} openConfirm={openConfirm} setOpenConfirm={setOpenConfirm} />}
    </>
  );
}

export default TodoItem