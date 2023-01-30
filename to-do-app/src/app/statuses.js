import {
    BsCalendarCheck,
    BsCalendarX,
    BsHourglassSplit,
  } from "react-icons/bs";

export const statuses = {
  pending : {icon: <BsHourglassSplit />, bg: '#f5f5f5'},
  accomplished : {icon: <BsCalendarCheck />, bg: '#d1e7dd'},
  unaccomplished : {icon: <BsCalendarX />, bg: '#f8d7da'}
}




// [
//     {
//       name: "pending",
//       icon: <BsHourglassSplit />,
//     },
//     {
//       name: "accomplished",
//       icon: <BsCalendarCheck />,
//     },
//     {
//       name: "unaccomplished",
//       icon: <BsCalendarX />,
//     },
//   ];