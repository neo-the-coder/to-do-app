import {configureStore} from '@reduxjs/toolkit';
import todoReducer from '../slices/todoSlice';
import categoryReducer from '../slices/categorySlice';

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        category: categoryReducer
    }
})