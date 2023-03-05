import React, { useState } from "react";
import { BsCheck2Circle, BsPencilSquare, BsTrash } from "react-icons/bs";
import { CgInfinity } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { subtractCount } from "../slices/categorySlice";
import { addStatus, subtractStatus } from "../slices/statusSlice";
import { deleteTodo, updateTodo } from "../slices/todoSlice";
import { modalON } from "../styles/LayoutFix";
import styles from "../styles/TodoItem.module.scss";
import ConfirmationBox from "./ConfirmationBox";
import TaskWindow from "./TaskWindow";
import Timer from "./Timer";

function TodoItem({ todo }) {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const categories = useSelector((state) => state.category);
  const statuses = useSelector((state) => state.status);
  const dispatch = useDispatch();

  // Styles
  const statusIcon = statuses[todo.status].icon;
  const todoBg = statuses[todo.status].bg;
  const catColor = {
    "--catColor": categories[todo.category].color,
    "--catTextColor": categories[todo.category].textColor,
  };

  const handleAccomplishment = (status) => {
    if (status === "unaccomplished") return;
    const newStatus = status === "pending" ? "accomplished" : "pending";
    const updatedTask = {
      id: todo.id,
      status: newStatus,
      dueOn:
        status === "accomplished"
          ? Date.now() > Date.parse(todo.due)
            ? false
            : todo.dueOn
          : todo.dueOn,
    };
    // update task
    dispatch(updateTodo(updatedTask));
    // update status
    dispatch(addStatus(newStatus));
    dispatch(subtractStatus(status));
  };

  const handleUpdate = () => {
    setOpenUpdate(true);
    modalON();
  }

  const handleDelete = () => setOpenConfirm(true);

  const handleConfirmation = () => {
    dispatch(deleteTodo(todo.id));
    dispatch(subtractCount(todo.category));
    dispatch(subtractStatus(todo.status));
  };

  return (
    <>
      <div
        className={styles.todoItem}
        style={{
          background: todoBg,
          borderLeft: `10px solid ${categories[todo.category].color}`,
        }}
      >
        <div className={styles.todoDetails}>
          <div className={styles.description}>
            <button
              title="Mark Complete"
              className={styles.button}
              onClick={() => handleAccomplishment(todo.status)}
              disabled={todo.status === "unaccomplished"}
              style={catColor}
            >
              <BsCheck2Circle />
            </button>
            <p
              className={styles.task}
              style={{
                textDecoration:
                  todo.status === "accomplished" ? "line-through" : null,
              }}
            >
              {todo.task}
            </p>
          </div>

          <div className={styles.status}>
            <span className={styles.statusIcon}>{statusIcon}</span>
            <span className={styles.statusText}>
              {todo.status.toUpperCase()}
            </span>
            {todo.status === "pending" ? (
              todo.dueOn ? (
                <Timer
                  pending={true}
                  id={todo.id}
                  deadline={todo.due}
                  status={todo.status}
                  catColor={catColor}
                />
              ) : (
                <CgInfinity />
              )
            ) : null}
          </div>
        </div>
        <div className={styles.todoButtons}>
          <button
            title="Edit"
            className={styles.button}
            onClick={handleUpdate}
            style={catColor}
          >
            <BsPencilSquare />
          </button>
          <button
            title="Delete"
            className={styles.button}
            onClick={handleDelete}
            style={catColor}
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
          message={
            <p className={styles.confirmMsg}>
              You will not be able to recover it later
            </p>
          }
          handleConfirmation={handleConfirmation}
          openConfirm={openConfirm}
          setOpenConfirm={setOpenConfirm}
        />
      )}
    </>
  );
}

export default TodoItem;
