import { format } from "date-fns";
import React, { useState } from "react";
import { BsCheck2Square, BsPencilSquare, BsTrash } from "react-icons/bs";
import { CgInfinity } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { subtractCount } from "../slices/categorySlice";
import { deleteTodo, updateTodo } from "../slices/todoSlice";
import styles from "../styles/TodoItem.module.scss";
import ConfirmationBox from "./ConfirmationBox";
import TaskWindow from "./TaskWindow";
import Timer from "./Timer";

function TodoItem({ todo }) {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const dispatch = useDispatch();

  const handleAccomplishment = (status) => {
    if (status === "unaccomplished") return;
    const updatedTask = {
      id: todo.id,
      status: status === "pending" ? "accomplished" : "pending",
      dueOn:
        status === "accomplished"
          ? Date.now() > Date.parse(todo.due)
            ? false
            : todo.dueOn
          : todo.dueOn,
    };
    // if (status === 'pending') {
    //   const updatedTask = {
    //     id: todo.id,
    //     status: 'accomplished'
    //   };
    // }
    // if (status === 'accomplished') {
    //   const updatedTask = {
    //     id: todo.id,
    //     status: 'pending',
    //     dueOn: Date.now() > Date.parse(todo.due) ? false : todo.dueOn,
    //   };
    // }
    dispatch(updateTodo(updatedTask));
  };

  const handleUpdate = () => setOpenUpdate(true);
  const handleDelete = () => setOpenConfirm(true);
  const handleConfirmation = () => {
    dispatch(deleteTodo(todo.id));
    dispatch(subtractCount(todo.category));
  };

  //let a = `linear-gradient(, ${todo.color}, white`;
  return (
    <>
      <div
        className={styles.todoItem}
        style={{
          background: `linear-gradient(to top right, limegreen, transparent)`,
        }}
      >
        <div className={styles.todoDetails}>
          <div className={styles.description}>
            <button
              className={styles.checkbox}
              onClick={() => handleAccomplishment(todo.status)}
              disabled={todo.status === "unaccomplished"}
            >
              <BsCheck2Square />
            </button>
            <p className={styles.task}>{todo.task}</p>
          </div>
          {/* <div className={styles.time}>
            DueOn ? {todo.dueOn ? format(new Date(todo.due), 'dd LLL yyyy HH:mm') : '-'}
            <br />
            Status {todo.status}
          </div> */}
          <p className={styles.status}>
          <span>[O]</span>
          {todo.dueOn ? (
            <Timer id={todo.id} deadline={todo.due} status={todo.status} />
          ) : (
            <CgInfinity />
          )}
          </p>
        </div>
        <div className={styles.todoButtons}>
          <div
            className={styles.button}
            onClick={handleUpdate}
            //onKeyDown={handleUpdate}
            role="button"
            tabIndex={0}
          >
            <BsPencilSquare />
          </div>
          <div
            className={styles.button}
            onClick={handleDelete}
            //onKeyDown={handleDelete}
            tabIndex={0}
            role="button"
          >
            <BsTrash />
          </div>
        </div>
      </div>
      {/* optimize rendering by adding conditional state  */}
      {openUpdate && (
        <TaskWindow
          todo={todo}
          type="update"
          taskWindowOpen={openUpdate}
          setTaskWindowOpen={setOpenUpdate}
        />
      )}
      {openConfirm && (
        <ConfirmationBox
          message={<h2>It will be gone forever</h2>}
          handleConfirmation={handleConfirmation}
          openConfirm={openConfirm}
          setOpenConfirm={setOpenConfirm}
        />
      )}
    </>
  );
}

export default TodoItem;
