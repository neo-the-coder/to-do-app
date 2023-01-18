import React, { useState } from 'react'
//import { v4 as uuid } from 'uuid';
//import { MdOutlineClose } from 'react-icons/md';
//import { useDispatch } from 'react-redux';
//import toast from 'react-hot-toast';
//import { addTodo, updateTodo } from '../slices/todoSlice';
import styles from '../styles/TaskWindow.module.scss';
import {format, addMinutes } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../slices/todoSlice';

function TaskWindow({ type, taskWindowOpen, setTaskWindowOpen }) {
    const categoryList = useSelector(state => state.category.categoriesList);
    const dispatch = useDispatch();

    const dueIn30minutes = () => {
        const timeZoneOffset = new Date().getTimezoneOffset() * 60000; //offset in ms
        const offsetAdded = new Date(Date.now() - timeZoneOffset);
        return addMinutes(offsetAdded, 30).toISOString().slice(0, -5);
    }

    const [task, setTask] = useState('');
    const [due, setDue] = useState(dueIn30minutes);
    const [category, setCategory] = useState('work');
    //const [status, setStatus] = useState('ongoing');

    // const myTime = new Date();
    // const mdate = format(myTime, 'yyyy-MM-dd');
    // const mtime = format(myTime, 'HH:mm-ss');
    // const yeni = mdate + 'T' + mtime;
    // const z = new Date();
    // const p = z.toISOString();
    // const o = addMinutes(z, 30);
    // const r = o.toISOString();
    // console.log('sasasas',z,p, o,r);

    // console.log(new Date(), due)

    // const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    // const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    // console.log(localISOTime)
    // console.log(localISOTime)  // => '2015-01-26T06:40:36.181'

    
    //const yeni = addMinutes(new Date(), 30).toISOString().slice(0, -5);
     //console.log(yeni)

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
      var data = document.getElementById("time");
      console.log(data.value, '---------', data.value.length);
      dispatch(addTodo({
        id: 5,
        category,
        task,
        due,
        status: 'ongoing'
      }))
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
              [x]{/* <MdOutlineClose /> */}
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
                  //   value={title}
                  //   onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label htmlFor="category">
                Due date & time
                <input type="datetime-local" id="time" defaultValue={due} />
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
                    <option value={category.name}>{category.name}</option>
                  ))}
                </select>
              </label>
              <div className={styles.buttonContainer}>
                <button type="submit">
                  {type === "add" ? "Add" : "Update"} Task
                </button>
                <button
                  //type="button"
                  //variant="secondary"
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