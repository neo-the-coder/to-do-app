import React from "react";
import { useSelector } from "react-redux";
import { filterData } from "../helpers/filterFunction";
import styles from "../styles/AppBlock.module.scss";
import TodoItem from "./TodoItem";

function AppBlock({ taskWindowOpen, setTaskWindowOpen }) {
  const todoList = useSelector((state) => state.todo.todoList);
  const filters = useSelector((state) => state.filter);
  const filteredList = filterData(todoList, filters);

  return (
    <div className={styles.todoList}>
      {filteredList.length > 0 ? (
        filteredList.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            taskWindowOpen={taskWindowOpen}
            setTaskWindowOpen={setTaskWindowOpen}
          />
        ))
      ) : (
        <div className={styles.noTodo}>
          <p>No todo in a given filters</p>
        </div>
      )}
    </div>
  );
}

export default AppBlock;
