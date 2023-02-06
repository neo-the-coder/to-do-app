import { createSlice } from "@reduxjs/toolkit";

const getInitValue = () => {
  const localCategories = window.localStorage.getItem("categories");
  if (localCategories) {
    return JSON.parse(localCategories);
  }
  const initialCategories = {
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

  window.localStorage.setItem("categories", JSON.stringify(initialCategories));
  return initialCategories;
};

const initValue = getInitValue();

const categorySlice = createSlice({
  name: "categories",
  initialState: initValue,
  reducers: {
    addCategory: (state, action) => {
      const newState = {
        ...state,
        ...action.payload,
      };
      window.localStorage.setItem("categories", JSON.stringify(newState));
      return newState;
    },
    editCategory: (state, action) => {
      const { [action.payload.prevName]: values, ...rest } = state;
      const newState = {
        ...(action.payload.prevName === action.payload.newName ? state : rest),
        [action.payload.newName]: {
          ...state[action.payload.prevName],
          ...action.payload.data,
        },
      };
      window.localStorage.setItem("categories", JSON.stringify(newState));
      return newState;
    },
    deleteCategory: (state, action) => {
      const { [action.payload]: values, ...rest } = state;
      const newState = action.payload === "miscellaneous" ? state : { ...rest };
      window.localStorage.setItem("categories", JSON.stringify(newState));
      return newState;
    },
    addCount: (state, action) => {
      const newState = {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          count: state[action.payload].count + 1,
        },
      };
      window.localStorage.setItem("categories", JSON.stringify(newState));
      return newState;
    },
    subtractCount: (state, action) => {
      const newState = {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          count: state[action.payload].count - 1,
        },
      };
      window.localStorage.setItem("categories", JSON.stringify(newState));
      return newState;
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
