import React from "react";
import styles from "../styles/TaskStatus.module.scss";
import {
  BsCalendarCheck,
  BsCalendarX,
  BsHourglassSplit,
  BsListUl,
} from "react-icons/bs";
import { useDispatch } from "react-redux";
import { allStatus, pickStatus } from "../slices/filterSlice";

function TaskStatus() {
  const statuses = [
    {
      name: "pending",
      icon: <BsHourglassSplit />,
    },
    {
      name: "accomplished",
      icon: <BsCalendarCheck />,
    },
    {
      name: "unaccomplished",
      icon: <BsCalendarX />,
    },
  ];

  const dispatch = useDispatch();

  return (
    <>
      <button
        className={styles.status}
        onClick={() => dispatch(allStatus())}
      >
        <BsListUl />
        <span>ALL</span>
      </button>
      {statuses.map((status) => (
        <button
          key={status.name}
          className={styles.status}
          onClick={() => dispatch(pickStatus(status.name))}
        >
          {status.icon}
          <span>{status.name}</span>
        </button>
      ))}
      {/* <div>
        <BsHourglassSplit />
        <span>pending</span>
      </div>
      <div>
        <BsCalendarCheck />
        <span>accomplished</span>
      </div>
      <div>
        <BsCalendarX />
        <span>unaccomplished</span>
      </div> */}
    </>
  );
}

export default TaskStatus;
