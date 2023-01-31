import { createSlice } from '@reduxjs/toolkit';
import {v4 as uuid} from 'uuid';

const initValue = {
  // categoriesList: [
  //   {
  //     id: 'miscellaneous',
  //     name: 'miscellaneous',
  //     color: '#d4d4d4',
  //     textColor: 'black',
  //     count: 0
  //   },
  //   {
  //     id: uuid(),
  //     name: 'work',
  //     color: '#2278fb',
  //     textColor: 'white',
  //     count: 0,
  //   },
  //   {
  //     id: uuid(),
  //     name: 'health',
  //     color: '#4caf50',
  //     textColor: 'black',
  //     count: 0,
  //   },
  //   {
  //     id: uuid(),
  //     name: 'payment',
  //     color: '#feb92d',
  //     textColor: 'black',
  //     count: 0,
  //   },
  // ],
  miscellaneous: {
    color: "#d4d4d4",
    textColor: "black",
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
      console.log('ACTION', action.payload,'STATE', state)
      return {
        ...state,
        // categoriesList: [...state.categoriesList, action.payload],
        ...action.payload
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
      //if (action.payload.prevName === action.payload.newName) {
            // categoriesList: state.categoriesList.map((category) => {
            //   return category.id === action.payload.id
            //     ? { ...category, ...action.payload }
            //     : category;
            // }),
      // } else {
      //   return {
      //     ...rest,
      //     [action.payload.newName] : {
      //       ...state[action.payload.prevName],
      //       ...action.payload.data
      //     }
      //   }
      // }
    },
    deleteCategory: (state, action) => {
      const { [action.payload]: values, ...rest } = state;
      return action.payload === "miscellaneous" ? state : { ...rest };
      // if (action.payload === "miscellaneous") {
      //   return state;
      // } else {
      //   return {
      //     ...rest,
      //   };
      // }
      // return {
      //   ...state,
      //   categoriesList: state.categoriesList.filter(
      //     (category) =>
      //       category.id !== action.payload || action.payload === "miscellaneous"
      //   ),
      // };

    },
    addCount: (state, action) => {
      return {
        ...state,
        [action.payload] : {
          ...state[action.payload],
          count: state[action.payload].count + 1,
        }
      }
      // return {
      //   ...state,
      //   categoriesList: state.categoriesList.map((category) => {
      //     return category.name === action.payload
      //       ? { ...category, count: category.count + 1 }
      //       : category;
      //   }),
      // };
    },
    subtractCount: (state, action) => {
      return {
        ...state,
        [action.payload] : {
          ...state[action.payload],
          count: state[action.payload].count - 1,
        }
      }
      // return {
      //   ...state,
      //   categoriesList: state.categoriesList.map((category) => {
      //     return category.name === action.payload
      //       ? { ...category, count: category.count - 1 }
      //       : category;
      //   }),
      // };
    },
  },
});

export const { addCategory, editCategory, deleteCategory, addCount, subtractCount } = categorySlice.actions;
export default categorySlice.reducer;
