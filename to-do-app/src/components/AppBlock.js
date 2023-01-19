import React from 'react'
import { useSelector } from 'react-redux';
import styles from '../styles/AppBlock.module.scss';
import TodoItem from './TodoItem';

function AppBlock({taskWindowOpen, setTaskWindowOpen}) {
    const todoList = useSelector(state => state.todo.todoList);
    //console.log('current todoList -->', todoList)
    return (
    <div>
        {todoList.map(todo => <TodoItem key={todo.id} todo={todo} taskWindowOpen={taskWindowOpen} setTaskWindowOpen={setTaskWindowOpen}/>)}
    </div>
  )
}

export default AppBlock