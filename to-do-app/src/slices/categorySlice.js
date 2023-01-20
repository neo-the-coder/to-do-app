import { createSlice } from '@reduxjs/toolkit';
import {v4 as uuid} from 'uuid';

const getRandomColor = () => "#" + Math.floor(Math.random()*16777215).toString(16);


const initValue = {
  categoriesList: [
    {
      id: 'miscellaneous',
      name: 'miscellaneous',
      color: '#d4d4d4',
      textColor: 'black',
      count: 0
    },
    {
      id: uuid(),
      name: 'work',
      color: '#2278fb',
      textColor: 'white',
      count: 0,
    },
    {
      id: uuid(),
      name: 'health',
      color: '#4caf50',
      textColor: 'black',
      count: 0,
    },
    {
      id: uuid(),
      name: 'payment',
      color: '#feb92d',
      textColor: 'black',
      count: 0,
    },
  ],
};

const categorySlice = createSlice({
  name: "categories",
  initialState: initValue,
  reducers: {
    addCategory: (state, action) => {
      return {
        ...state,
        categoriesList: [...state.categoriesList, action.payload],
      };
    },
    editCategory: (state, action) => {
      return {
        ...state,
        categoriesList: state.categoriesList.map((category) => {
          return category.id === action.payload.id
          ? { ...category, ...action.payload }
          : category;
        }),
      };
    },
    deleteCategory: (state, action) => {
      return {
        ...state,
        categoriesList: state.categoriesList.filter(
          (category) =>
          category.id !== action.payload || action.payload === "miscellaneous"
          ),
        };
      },
      addCount: (state, action) => {
        return {
          ...state,
          categoriesList: state.categoriesList.map((category) => {
            return category.name === action.payload.name
              ? { ...category, count: category.count + 1 }
              : category;
          }),
        };
      },
      // updateTodo: (state, action) => {
        //     return state.todoList.map(todo => {
          //         return todo.id === action.payload.id ? action.payload : todo;
          //     })
          // }
  },
});

export const { addCategory, editCategory, deleteCategory, addCount } = categorySlice.actions;
export default categorySlice.reducer;
