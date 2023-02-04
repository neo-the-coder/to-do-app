import { createSlice } from "@reduxjs/toolkit";

const initValue = {
  todoList: [
    {
      id: 2,
      category: "work",
      task: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, quam eveniet adipisci ad sapiente quaerat molestiae natus ea nisi perspiciatis ut nihil, ullam aperiam cumque odit, quisquam deserunt quod. Inventore neque cum reprehenderit dolorem, tempora impedit quas numquam culpa ipsa fugiat nemo sapiente pariatur laborum labore dolorum ab hic ullam?",
      dueOn: true,
      due: "2022-11-05T16:43",
      status: "unaccomplished",
    },
    {
      id: 5,
      category: "health",
      task: "Bu sehir girdap",
      dueOn: false,
      due: "unlimited",
      status: "pending",
    },
    {
      id: 9,
      category: "payment",
      task: "Listen to me you little",
      dueOn: true,
      due: "2035-11-05T16:43",
      status: "pending",
    },
  ],
};

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
        todoList: state.todoList.filter((todo) => todo.id !== action.payload),
      };
    },
    updateTodo: (state, action) => {
      return {
        ...state,
        todoList: state.todoList.map((todo) => {
          return todo.id === action.payload.id
            ? { ...todo, ...action.payload }
            : todo;
        }),
      };
    },
  },
});

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
