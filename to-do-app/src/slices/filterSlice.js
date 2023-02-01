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
      if (!(state.category.length + 1 === action.payload.cLength && !state.category.includes(action.payload.category))) {
        return {
          ...state,
          category: state.category.includes(action.payload.category)
            ? state.category.filter((cat) => cat !== action.payload.category)
            : action.payload.cLength === "DEL"
            ? [...state.category]
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
    pickStatus: (state, action) => {
      if (!(state.status.length + 1 === 3 && !state.status.includes(action.payload))) {
        return {
          ...state,
          status: state.status.includes(action.payload)
            ? state.status.filter((st) => st !== action.payload)
            : [...state.status, action.payload],
        };
      } else {
        return {
          ...state,
          status: [],
        };
      }
    },
    allStatus: (state) => {
      if (state.status.length !== 0) {
        return {
          ...state,
          status: [],
        };
      }
    },
  },
});

export const { pickCategory, allCategory, pickStatus, allStatus } = filterSlice.actions;
export default filterSlice.reducer;
