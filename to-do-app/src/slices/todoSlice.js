import { createSlice } from '@reduxjs/toolkit';

const initValue = {
    todoList: [{
        id : 2,
        category: 'work',
        task : 'Some task to complete',
        due: new Date(2022, 11, 5, 15, 43, 26).toLocaleString(),
        status: 'pending',
    }]
}

const todoSlice = createSlice({
  name: "todo",
  initialState: initValue,
  reducers: {
    addTodo: (state, action) => {
      return {
        ...state,
        todoList: [...state.todoList, action.payload],
      };
    },
    deleteTodo: (state, action) => {
      return {
        ...state,
        todoList: state.todoList.filter(
          (todo) => todo.id !== action.payload
        ),
      };
    },
    updateTodo: (state, action) => {
        console.log('Payload:', action.payload)
      return {
        ...state,
        todoList: state.todoList.map((todo) => {
          return todo.id === action.payload.id ? action.payload : todo;
        }),
      };
    },
  },
});

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;

// //category initial state
// const initialValue = [{
//     name: 'work',
//     color: getColor(),
//     numOfTasks: getTaskSum()
// }]