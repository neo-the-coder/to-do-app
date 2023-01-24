import { createSlice } from '@reduxjs/toolkit';

const initValue = {
  todoList: [
    {
      id: 2,
      category: "work",
      task: "Some task to complete",
      dueOn: true,
      due: "2022-11-05T16:43",
      status: "pending",
    },
    {
      id: 5,
      category: "health",
      task: "Bu sehir girdap",
      due: "2028-11-05T16:43",
      dueOn: false,
      status: "pending",
    },
    {
      id: 9,
      category: "payment",
      task: "Listen to me you little",
      dueOn: true,
      due: "2035-11-05T16:43",
      status: "pending",
    }
  ],
};

const todoSlice = createSlice({
  name: "todo",
  initialState: initValue,
  reducers: {
    addTodo: (state, action) => {
      console.log('Payload Add', action.payload)
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
          return todo.id === action.payload.id ? {...todo, ...action.payload} : todo;
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