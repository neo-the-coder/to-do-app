import React from "react";
import styles from "../styles/TaskStatus.module.scss";
import { BsListUl } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { allStatus, pickStatus } from "../slices/filterSlice";
import { statuses } from "../app/statuses";

function TaskStatus() {
  const statusState = useSelector((state) => state.filter.status);
  console.log(statusState)
  const dispatch = useDispatch();

  return (
    <>
      <h1 className={styles.filterLabel}>Filter by STATUS</h1>
      <div className={styles.filterButtons}>
        <button
          className={`${styles.status} ${
            statusState.length === 0 ? styles.active : null
          }`}
          onClick={() => dispatch(allStatus())}
        >
          <BsListUl />
          <span>ALL</span>
        </button>

        {Object.keys(statuses).map((status) => (
          <button
            key={status}
            className={`${styles.status} ${
              statusState.includes(status) ? styles.active : null
            }`}
            onClick={() => dispatch(pickStatus(status))}
          >
            {statuses[status].icon}
            <span>{status.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </>
  );
}

export default TaskStatus;
