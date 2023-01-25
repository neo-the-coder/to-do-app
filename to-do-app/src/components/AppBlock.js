import React from 'react'
import { useSelector } from 'react-redux';
import { filterData } from '../helpers/filterExample';
import styles from '../styles/AppBlock.module.scss';
import TodoItem from './TodoItem';

function AppBlock({taskWindowOpen, setTaskWindowOpen}) {
    const todoList = useSelector(state => state.todo.todoList);
    const filters = useSelector(state => state.filter);
    const filteredList = filterData(todoList, filters)
    //console.log('FILTERED', filteredList)
    return (
    <div>
        {filteredList.map(todo => <TodoItem key={todo.id} todo={todo} taskWindowOpen={taskWindowOpen} setTaskWindowOpen={setTaskWindowOpen}/>)}
    </div>
  )
}

export default AppBlock