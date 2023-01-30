import React from "react";
import styles from "../styles/TaskStatus.module.scss";
import { BsListUl } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { allStatus, pickStatus } from "../slices/filterSlice";
import { statuses } from "../app/statuses";

function TaskStatus() {
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
      {Object.keys(statuses).map((status) => (
        <button
          key={status}
          className={styles.status}
          onClick={() => dispatch(pickStatus(status))}
        >
          {statuses[status].icon}
          <span>{status}</span>
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
