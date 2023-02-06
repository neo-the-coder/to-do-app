import { createSlice } from "@reduxjs/toolkit";

const getInitValue = () => {
  const localTodos = window.localStorage.getItem("todos");
  if (localTodos) {
    return JSON.parse(localTodos);
  }
  window.localStorage.setItem("todos", []);
  return [];
};

const initValue = {
  todoList: getInitValue(),
};

const todoSlice = createSlice({
  name: "todo",
  initialState: initValue,
  reducers: {
    addTodo: (state, action) => {
      const newState = {
        ...state,
        todoList: [...state.todoList, action.payload],
      };
      window.localStorage.setItem("todos", JSON.stringify(newState.todoList));
      return newState;
    },
    deleteTodo: (state, action) => {
      const newState = {
        ...state,
        todoList: state.todoList.filter((todo) => todo.id !== action.payload),
      };
      window.localStorage.setItem("todos", JSON.stringify(newState.todoList));
      return newState;
    },
    updateTodo: (state, action) => {
      const newState = {
        ...state,
        todoList: state.todoList.map((todo) => {
          return todo.id === action.payload.id
            ? { ...todo, ...action.payload }
            : todo;
        }),
      };
      window.localStorage.setItem("todos", JSON.stringify(newState.todoList));
      return newState;
    },
  },
});

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
