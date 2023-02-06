import { createSlice } from "@reduxjs/toolkit";
import { BsCalendarCheck, BsCalendarX, BsHourglassSplit } from "react-icons/bs";

const getInitValue = () => {
  const initStatusState = {
    pending: { icon: <BsHourglassSplit />, bg: "#e4e4e4", count: 0 },
    accomplished: { icon: <BsCalendarCheck />, bg: "#89dc94", count: 0 },
    unaccomplished: { icon: <BsCalendarX />, bg: "#d33537", count: 0 },
  };
  let localStatusCount = window.localStorage.getItem("statusCounts");
  if (localStatusCount) {
    localStatusCount = JSON.parse(localStatusCount);
    for (const status in localStatusCount) {
      initStatusState[status].count = localStatusCount[status];
    }
  }
  return initStatusState;
};

const initValue = getInitValue();

const statusSlice = createSlice({
  name: "statuses",
  initialState: initValue,
  reducers: {
    addStatus: (state, action) => {
      const localCounts = {};
      for (const status in state) {
        localCounts[status] =
          status === action.payload
            ? state[status].count + 1
            : state[status].count;
      }
      window.localStorage.setItem("statusCounts", JSON.stringify(localCounts));
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          count: state[action.payload].count + 1,
        },
      };
    },
    subtractStatus: (state, action) => {
      const localCounts = {};
      for (const status in state) {
        localCounts[status] =
          status === action.payload
            ? state[status].count - 1
            : state[status].count;
      }
      window.localStorage.setItem("statusCounts", JSON.stringify(localCounts));
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

export const { addStatus, subtractStatus } = statusSlice.actions;
export default statusSlice.reducer;
