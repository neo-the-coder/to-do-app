import {
    BsCalendarCheck,
    BsCalendarX,
    BsHourglassSplit,
  } from "react-icons/bs";

export const statuses = {
  pending : {icon: <BsHourglassSplit />, bg: '#e4e4e4'},
  accomplished : {icon: <BsCalendarCheck />, bg: '#89dc94'},
  unaccomplished : {icon: <BsCalendarX />, bg: '#d33537'}
  //#c74244
  //#fefadd
  //#f9f395
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