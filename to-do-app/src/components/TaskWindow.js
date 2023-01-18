import React from 'react'
//import { v4 as uuid } from 'uuid';
//import { MdOutlineClose } from 'react-icons/md';
//import { useDispatch } from 'react-redux';
//import toast from 'react-hot-toast';
//import { addTodo, updateTodo } from '../slices/todoSlice';
import styles from '../styles/TaskWindow.module.scss';


function TaskWindow({ type, taskWindowOpen, setTaskWindowOpen }) {

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
    // }, [type, todo, modalOpen]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      var data = document.getElementById("time");
      console.log(data.value);
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
    //       toast.success('Task Added Successfully!');
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
                {type === 'add' ? 'Add' : 'Update'} Task
              </h1>
              <label htmlFor="task">
                Task
                <input
                  type="text"
                  id="task"
                  autoFocus
                //   value={title}
                //   onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label htmlFor="category">
                Due date & time
                <input type="datetime-local" id="time" value={new Date()} />
              </label>
              <label htmlFor="category">
                Category
                <select
                  name="category"
                  id="category"
                //   value={status}
                //   onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="work">work</option>
                  <option value="personal">personal</option>
                </select>
              </label>
              <div className={styles.buttonContainer}>
                <button type="submit">
                  {type === 'add' ? 'Add' : 'Update'} Task
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