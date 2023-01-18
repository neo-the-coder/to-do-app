import { createSlice } from '@reduxjs/toolkit';

const getRandomColor = () => "#" + Math.floor(Math.random()*16777215).toString(16);


const initValue = {
  categoriesList: [
    {
      name: "work",
      color: getRandomColor(),
      count: 0,
    },
    {
      name: "health",
      color: getRandomColor(),
      count: 0,
    },
    {
      name: "payment",
      color: getRandomColor(),
      count: 0,
    },
  ],
};

const categorySlice = createSlice({
    name: 'categories',
    initialState: initValue,
    reducers: {
        addCategory: (state, action) => {
            return [
                ...state,
                action.payload,
            ];
        },
        addCount: (state, action) => {
            return state.categoriesList.map((category) => category.name === action.payload.name ? {...state, count: category.count + 1} : category);
        },
        // updateTodo: (state, action) => {
        //     return state.todoList.map(todo => {
        //         return todo.id === action.payload.id ? action.payload : todo;
        //     })
        // }
    }
})

export const { addCategory, addCount } = categorySlice.actions;
export default categorySlice.reducer;
