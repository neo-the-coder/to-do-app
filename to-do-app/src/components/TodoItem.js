import { format } from "date-fns";
import React, { useState } from "react";
import { BsCheck2Circle, BsPencilSquare, BsTrash } from "react-icons/bs";
import { CgInfinity } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { statuses } from "../app/statuses";
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

  const statusIcon = statuses[todo.status].icon;
  const todoBg = statuses[todo.status].bg;

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
          background: todoBg,
        }}
      >
        <div className={styles.todoDetails}>
          <div className={styles.description}>
            <button
              className={styles.button}
              onClick={() => handleAccomplishment(todo.status)}
              disabled={todo.status === "unaccomplished"}
            >
              <BsCheck2Circle />
            </button>
            <p className={styles.task} style={{textDecoration: todo.status === 'accomplished' ? 'line-through' : null}}>{todo.task}</p>
          </div>
          {/* <div className={styles.time}>
            DueOn ? {todo.dueOn ? format(new Date(todo.due), 'dd LLL yyyy HH:mm') : '-'}
            <br />
            Status {todo.status}
          </div> */}
          <div className={styles.status}>
            <span className={styles.statusIcon}>{statusIcon}</span>
            <span className={styles.statusText}>
              {todo.status.toUpperCase()}
            </span>
            {todo.status === "pending" ? (
              todo.dueOn ? (
                <Timer id={todo.id} deadline={todo.due} status={todo.status} />
              ) : (
                <CgInfinity />
              )
            ) : null}
          </div>
        </div>
        <div className={styles.todoButtons}>
          <button
            className={styles.button}
            onClick={handleUpdate}
            //onKeyDown={handleUpdate}
            // role="button"
            // tabIndex={0}
          >
            <BsPencilSquare />
          </button>
          <button
            className={styles.button}
            onClick={handleDelete}
            //onKeyDown={handleDelete}
            // tabIndex={0}
            // role="button"
          >
            <BsTrash />
          </button>
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
