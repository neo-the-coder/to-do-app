import { createSlice } from "@reduxjs/toolkit";

const initValue = {
  miscellaneous: {
    color: "#777777",
    textColor: "white",
    count: 0,
  },
  work: {
    color: "#2278fb",
    textColor: "white",
    count: 0,
  },
  health: {
    color: "#4caf50",
    textColor: "white",
    count: 0,
  },
  payment: {
    color: "#feb92d",
    textColor: "black",
    count: 0,
  },
};

const categorySlice = createSlice({
  name: "categories",
  initialState: initValue,
  reducers: {
    addCategory: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    editCategory: (state, action) => {
      const { [action.payload.prevName]: values, ...rest } = state;
      return {
        ...(action.payload.prevName === action.payload.newName ? state : rest),
        [action.payload.newName]: {
          ...state[action.payload.prevName],
          ...action.payload.data,
        },
      };
    },
    deleteCategory: (state, action) => {
      const { [action.payload]: values, ...rest } = state;
      return action.payload === "miscellaneous" ? state : { ...rest };
    },
    addCount: (state, action) => {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          count: state[action.payload].count + 1,
        },
      };
    },
    subtractCount: (state, action) => {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          count: state[action.payload].count - 1,
        },
      };
    },
  },
});

export const {
  addCategory,
  editCategory,
  deleteCategory,
  addCount,
  subtractCount,
} = categorySlice.actions;
export default categorySlice.reducer;
