import { createSlice } from "@reduxjs/toolkit";
import { BsCalendarCheck, BsCalendarX, BsHourglassSplit } from "react-icons/bs";

const initValue = {
  pending: { icon: <BsHourglassSplit />, bg: "#e4e4e4", count: 250 },
  accomplished: { icon: <BsCalendarCheck />, bg: "#89dc94", count: 50 },
  unaccomplished: { icon: <BsCalendarX />, bg: "#d33537", count: 10 },
  //#c74244
  //#fefadd
  //#f9f395
};

const statusSlice = createSlice({
  name: "statuses",
  initialState: initValue,
  reducers: {
    addStatus: (state, action) => {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          count: state[action.payload].count + 1,
        },
      };
    },
    subtractStatus: (state, action) => {
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
