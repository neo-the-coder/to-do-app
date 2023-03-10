import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { useForm } from 'react-hook-form';
import styles from "../styles/TaskWindow.module.scss";
import { addMinutes } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo } from "../slices/todoSlice";
import { addCount, subtractCount } from "../slices/categorySlice";
import { dtToSlicedISO, dtTZFixed } from "../helpers/DateTimeValue";
import { CgClose } from 'react-icons/cg';
import { addStatus, subtractStatus } from "../slices/statusSlice";
import { modalOFF } from "../styles/LayoutFix";

function TaskWindow({ type, todo, taskWindowOpen, setTaskWindowOpen }) {
  const [dueToggle, setDueToggle] = useState(todo ? todo.dueOn : false);
  const categoryList = useSelector((state) => state.category);
  const dispatch = useDispatch();

  // DateTime initial state values
  const dtMin = dtToSlicedISO(addMinutes(dtTZFixed(), 1));
  const initDueTime = dtToSlicedISO(addMinutes(dtTZFixed(), 30));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
  });

  //const dueToggle = watch("dueOn", todo ? todo.dueOn : false);

  const handleCancel = () => {
    setTaskWindowOpen(false);
    reset();
    setDueToggle(todo ? todo.dueOn : false);
    modalOFF();
  };

  const onSubmit = (data) => {
    if (type === "add") {
      const newTask = {
        id: uuid(),
        category: data.category,
        task: data.task,
        dueOn: dueToggle,
        due: dueToggle ? data.due : undefined,
        status: "pending",
      };
      dispatch(addTodo(newTask));
      // add to the category
      dispatch(addCount(data.category));
      // add to the status
      dispatch(addStatus('pending'));

      setDueToggle(false);
    } else {
      const updatedTask = {
        id: todo.id,
        category: data.category,
        task: data.task,
        dueOn: dueToggle,
        due: dueToggle ? data.due : undefined,
        status: "pending"
      };
      dispatch(updateTodo(updatedTask));
      if (todo.status !== 'pending') {
        dispatch(addStatus('pending'));
        dispatch(subtractStatus(todo.status));
      }
      if (todo.category !== data.category) {
        dispatch(addCount(data.category));
        dispatch(subtractCount(todo.category));
      }
    }
    
    setTaskWindowOpen(false);
    reset();
    modalOFF();
  };

  const moveCaretAtEnd = (e) => {
    let temp_value = e.target.value;
    e.target.value = '';
    e.target.value = temp_value;
  }

  return (
    taskWindowOpen && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <button className={styles.closeButton} onClick={handleCancel}>
            <CgClose />
          </button>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
              <legend className={styles.formTitle}>
                {type === "add" ? "Add" : "Update"} Task
              </legend>
              <div className={styles.formGroup}>
                <label htmlFor="task">
                  Task
                  <textarea
                    rows={3}
                    //input before
                    //type="text"
                    id="task"
                    className={errors.task?.message ? styles.error : ''}
                    autoFocus
                    onFocus={(e) => moveCaretAtEnd(e)}
                    defaultValue={todo ? todo.task : ""}
                    placeholder="What do you want to accomplish?"
                    {...register("task", {
                      required: "Task description cannot be empty",
                    })}
                  ></textarea>
                </label>
                {<p className={styles.errorMsg}>{errors.task?.message}</p>}
              </div>

              <label htmlFor="category">
                Category
                <select
                  id="category"
                  defaultValue={todo ? todo.category : "miscellaneous"}
                  {...register("category", { required: true })}
                >
                  {Object.keys(categoryList).map((category) => (
                    <option key={category} value={category}>
                      {category[0].toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </label>

              <label htmlFor="dueToggle">
                Set a deadline
                <input
                  type="checkbox"
                  id="dueToggle"
                  value={dueToggle}
                  onChange={() => setDueToggle(!dueToggle)}
                  checked={dueToggle}
                />
              </label>
              {dueToggle && (
                <div className={styles.formGroup}>
                  <label htmlFor="deadline">
                    Due date & time
                    <input
                      type="datetime-local"
                      id="deadline"
                      className={errors.due?.message ? styles.error : ''}
                      defaultValue={todo?.dueOn ? todo.due : initDueTime}
                      {...register("due", {
                        required:
                          dueToggle && "Either set a deadline or disable it",
                        min: {
                          value: dtMin,
                          message: "Deadline cannot be set in the past",
                        },
                      })}
                    />
                  </label>
                  {<p className={styles.errorMsg}>{errors.due?.message}</p>}
                </div>
              )}
            </fieldset>
            <div className={styles.buttonContainer}>
              <button className={styles.confirmBtn} type="submit">{type === "add" ? "Add" : "Update"}</button>
              <button onClick={handleCancel} onKeyDown={handleCancel}>
                Cancel
              </button>
            </div>
          </form>

          {/* <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
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
          </form> */}
        </div>
      </div>
    )
  );
}

export default TaskWindow;
