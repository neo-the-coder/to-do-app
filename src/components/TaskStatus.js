import React from "react";
import styles from "../styles/TaskStatus.module.scss";
import { BsListUl } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { allStatus, pickStatus } from "../slices/filterSlice";
import { RiFilterFill } from "react-icons/ri";

function TaskStatus() {
  const statusState = useSelector((state) => state.filter.status);
  const statuses = useSelector((state) => state.status);
  const statusesArr = Object.keys(statuses);
  const allStatusCount = statusesArr.reduce(
    (sum, status) => sum + statuses[status].count,
    0
  );

  const dispatch = useDispatch();

  return (
    <>
      <h3 className={styles.filterTitle}>
        <RiFilterFill />
        STATUS
      </h3>
      <div className={styles.filterButtons}>
        <button
          className={`${styles.status} ${
            statusState.length === 0 ? styles.active : ""
          }`}
          onClick={() => dispatch(allStatus())}
        >
          <BsListUl />
          <span className={styles.statusTitle}>ALL</span>
          <span className={styles.statusCount} key={allStatusCount + 'A'}>{allStatusCount}</span>
        </button>

        {statusesArr.map((status) => (
          <button
            key={status}
            className={`${styles.status} ${
              statusState.includes(status) ? styles.active : ""
            }`}
            onClick={() => dispatch(pickStatus(status))}
          >
            {statuses[status].icon}
            <span className={styles.statusTitle}>{status.toUpperCase()}</span>
            <span className={styles.statusCount} key={statuses[status].count + status[0]}>{statuses[status].count}</span>
          </button>
        ))}
      </div>
    </>
  );
}

export default TaskStatus;
