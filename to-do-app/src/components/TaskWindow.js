import React, { useState } from 'react'
import { v4 as uuid } from 'uuid';
import { MdOutlineClose } from 'react-icons/md';
//import { useDispatch } from 'react-redux';
//import toast from 'react-hot-toast';
//import { addTodo, updateTodo } from '../slices/todoSlice';
import styles from '../styles/TaskWindow.module.scss';
import {format, addMinutes } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, updateTodo } from '../slices/todoSlice';

function TaskWindow({ type, todo, taskWindowOpen, setTaskWindowOpen }) {
    const categoryList = useSelector(state => state.category.categoriesList);
    const dispatch = useDispatch();

    // DateTime state helper functions
    const dtTZFixed = () => {
      const timeZoneOffset = new Date().getTimezoneOffset() * 60000; //offset in ms
      return new Date(Date.now() - timeZoneOffset);
    };
    const dtToSlicedISO = (time) => time.toISOString().slice(0, 16);

    // DateTime state values
    const dtMin = dtToSlicedISO(dtTZFixed());
    const initDueTime = dtToSlicedISO(addMinutes(dtTZFixed(), 30));

    const [task, setTask] = useState('');
    const [due, setDue] = useState(initDueTime);
    const [category, setCategory] = useState('work');
    //const [status, setStatus] = useState('ongoing');

    //2018-06-12T19:30

    const closeWindow = () => {
        setTaskWindowOpen(false);
    }
    // const [title, setTitle] = useState('');
    // const [status, setStatus] = useState('incomplete');
    // const dispatch = useDispatch();
  
    // useEffect(() => {
    //   if (type === 'update' && todo) {
    //     setTitle(todo.title);
    //     setStatus(todo.status);
    //   } else {
    //     setTitle('');
    //     setStatus('incomplete');
    //   }
    // }, [type, todo, modalOpen]);~~
  
    const handleSubmit = (e) => {
      e.preventDefault();

      if (type === 'add') {
        const newTask = {
          id: uuid(),
          category,
          task,
          due,
          status: 'ongoing'
        }
        dispatch(addTodo(newTask));
      } else {
        const updatedTask = {
          ...todo,
          category,
          task,
          due
        }
        dispatch(updateTodo(updatedTask));
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
      closeWindow();
    };
    console.log(type, 'inside window')
    return (
      taskWindowOpen && (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div
              className={styles.closeButton}
              onClick={closeWindow}
              onKeyDown={closeWindow}
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
                <button
                  onClick={closeWindow}
                  onKeyDown={closeWindow}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )
    );
  }
  

export default TaskWindow