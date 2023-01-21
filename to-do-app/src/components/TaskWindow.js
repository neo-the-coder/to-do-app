import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { MdOutlineClose } from "react-icons/md";
//import toast from 'react-hot-toast';
import styles from "../styles/TaskWindow.module.scss";
import { format, addMinutes } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo } from "../slices/todoSlice";
import { addCount, subtractCount } from "../slices/categorySlice";
import { dtToSlicedISO, dtTZFixed } from "../helpers/DateTimeValue";

function TaskWindow({ type, todo, taskWindowOpen, setTaskWindowOpen }) {
  // DateTime initial state values
  const dtMin = dtToSlicedISO(dtTZFixed());
  const initDueTime = dtToSlicedISO(addMinutes(dtTZFixed(), 30));

  // State
  const [task, setTask] = useState("");
  const [due, setDue] = useState(initDueTime);
  const [category, setCategory] = useState("miscellaneous");
  const categoryList = useSelector((state) => state.category.categoriesList);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("USEEFFECT");
    if (type === "update" && todo) {
      setTask(todo.task);
      setDue(todo.due);
      setCategory(todo.category);
    } else {
      setTask("");
      setDue(initDueTime);
      setCategory("miscellaneous");
    }
  }, [type, todo, taskWindowOpen, initDueTime]);

  const handleCancel = () => {
    setTaskWindowOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Don't add if task is empty
    if (type === "add") {
      const newTask = {
        id: uuid(),
        category,
        task,
        due,
        status: "pending",
      };
      dispatch(addTodo(newTask));
      dispatch(addCount(category));
    } else {
      const updatedTask = {
        ...todo,
        category,
        task,
        due,
      };
      dispatch(updateTodo(updatedTask));
      if (todo.category !== category) {
        dispatch(addCount(category));
        dispatch(subtractCount(todo.category));
      }
    }
    //   if (title === '') {
    //     toast.error('Please enter a title.');
    //     return;
    //   }
    //   if (title && status) {
    //     if (type === 'add') {
    //       dispatch(
    //         addTodo({
    //           id: uuid(),
    //           title,
    //           status,
    //           time: new Date().toLocaleString(),
    //         })
    //       );
    //       toast.success('Task Added ~~Successfully!');
    //     } else if (type === 'update') {
    //       if (todo.title !== title || todo.status !== status) {
    //         dispatch(
    //           updateTodo({
    //             ...todo,
    //             title,
    //             status,
    //           })
    //         );
    //       } else {
    //         toast.error('No changes made');
    //       }
    //     }
    //   } else {
    //     toast.error("Title Shouldn't be empty");
    //   }
    handleCancel();
  };

  return (
    taskWindowOpen && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div
            className={styles.closeButton}
            onClick={handleCancel}
            onKeyDown={handleCancel}
            tabIndex={0}
            role="button"
          >
            <MdOutlineClose />
          </div>
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <h1 className={styles.formTitle}>
              {type === "add" ? "Add" : "Update"} Task
            </h1>
            <label htmlFor="task">
              Task
              <input
                type="text"
                id="task"
                autoFocus
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </label>
            <label htmlFor="category">
              Due date & time
              <input
                type="datetime-local"
                id="time"
                min={dtMin}
                defaultValue={due}
                onChange={(e) => setDue(e.target.value)}
              />
            </label>
            <label htmlFor="category">
              Category
              <select
                name="category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categoryList.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <div className={styles.buttonContainer}>
              <button type="submit">
                {type === "add" ? "Add" : "Update"} Task
              </button>
              <button onClick={handleCancel} onKeyDown={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default TaskWindow;
