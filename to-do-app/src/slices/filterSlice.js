import { createSlice } from '@reduxjs/toolkit';

const initValue = {
  category: [], 
  status: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState: initValue,
  reducers: {
    pickCategory: (state, action) => {
      // if all categories were picked, return empty array
      if (!(state.category.length + 1 === action.payload.cLength)) {
        return {
          ...state,
          category: state.category.includes(action.payload.category)
            ? state.category.filter((cat) => cat !== action.payload.category)
            : [...state.category, action.payload.category],
        };
      } else {
        return {
          ...state,
          category: [],
        };
      }
    },
    allCategory: (state) => {
      if (state.category.length !== 0) {
        return {
          ...state,
          category: [],
        };
      }
    },
  },
});

export const { pickCategory, allCategory } = filterSlice.actions;
export default filterSlice.reducer;
