import React from "react";
import { useSelector } from "react-redux";
import { filterData } from "../helpers/filterFunction";
import styles from "../styles/AppBlock.module.scss";
import Timer from "./Timer";
import TodoItem from "./TodoItem";

function AppBlock({ taskWindowOpen, setTaskWindowOpen }) {
  const todoList = useSelector((state) => state.todo.todoList);
  const filters = useSelector((state) => state.filter);

  const filteredList = filterData(todoList, filters);
  const timedTodo = todoList.filter(
    (todo) => todo.status === "pending" && todo.dueOn
  );

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
      {/* Run Timer when non-pending status was filtered */}
      {!filters.status.includes("pending") && filters.status.length !== 0
        ? timedTodo.map((todo) => (
            <Timer id={todo.id} deadline={todo.due} status={todo.status} />
          ))
        : null}
    </div>
  );
}

export default AppBlock;
