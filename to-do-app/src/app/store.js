import {configureStore} from '@reduxjs/toolkit';
import todoReducer from '../slices/todoSlice';
import categoryReducer from '../slices/categorySlice';
import filterReducer from '../slices/filterSlice';

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        category: categoryReducer,
        filter: filterReducer 
    }
})