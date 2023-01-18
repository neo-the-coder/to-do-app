import React from 'react'
import { useSelector } from 'react-redux';
import styles from '../styles/AppBlock.module.scss';
import TodoItem from './TodoItem';

function AppBlock({taskWindowOpen, setTaskWindowOpen}) {
    const todoList = useSelector(state => state.todo.todoList);

  return (
    <div>AppBlock
        <div>getting started</div>
        {todoList.map(todo => <TodoItem key={todo.id} todo={todo} taskWindowOpen={taskWindowOpen} setTaskWindowOpen={setTaskWindowOpen}/>)}
    </div>
  )
}

export default AppBlock