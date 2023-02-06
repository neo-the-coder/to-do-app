import React from "react";
import styles from "../styles/Timer.module.scss";
import { useState, useEffect } from "react";
import { differenceInMonths, differenceInYears } from "date-fns";
import { useDispatch } from "react-redux";
import { updateTodo } from "../slices/todoSlice";
import { addStatus, subtractStatus } from "../slices/statusSlice";

const Timer = ({ pending, id, deadline, status, catColor }) => {
  const dispatch = useDispatch();
  let timeLeft = Math.floor((Date.parse(deadline) - Date.now()) / 1000);

  // Visible time state initializes/updates if "pending" filter is ON
  const [years, setYears] = useState(() =>
    pending ? differenceInYears(Date.parse(deadline), Date.now()) : undefined
  );
  const [months, setMonths] = useState(() =>
    pending
      ? Math.floor(differenceInMonths(Date.parse(deadline), Date.now()) % 12)
      : undefined
  );
  const [days, setDays] = useState(() =>
    pending ? Math.floor((timeLeft / (60 * 60 * 24)) % 30.04) : undefined
  );
  const [hours, setHours] = useState(() =>
    pending ? Math.floor((timeLeft / (60 * 60)) % 24) : undefined
  );
  const [minutes, setMinutes] = useState(() =>
    pending ? Math.floor((timeLeft / 60) % 60) : undefined
  );
  const [seconds, setSeconds] = useState(() =>
    pending ? Math.floor(timeLeft % 60) : undefined
  );

  const updateVisibleTime = (time) => {
    setYears(differenceInYears(Date.parse(deadline), Date.now()));
    setMonths(Math.floor(differenceInMonths(Date.parse(deadline), Date.now()) % 12));
    setDays(Math.floor((time / (60 * 60 * 24)) % 30.04));
    setHours(Math.floor((time / (60 * 60)) % 24));
    setMinutes(Math.floor((time / 60) % 60));
    setSeconds(Math.floor(time % 60));
  };

  useEffect(() => {
    if (pending) updateVisibleTime(timeLeft);
  }, [deadline]);

  useEffect(() => {
    if (status === "pending") {
      const interval = setInterval(() => {
        timeLeft -= 1;
        if (pending) updateVisibleTime(timeLeft);
        if (timeLeft <= 0) {
          clearInterval(interval);
          dispatch(updateTodo({ id, status: "unaccomplished" }));
          dispatch(addStatus("unaccomplished"));
          dispatch(subtractStatus("pending"));
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [deadline, status]);

  return pending ? (
    <div style={catColor} className={styles.timer} role="timer">
      <div className={styles.longer}>
        {years !== 0 ? (
          <div className={styles.timeUnit}>
            <span>{years < 10 ? "0" + years : years}</span>
            <span>{years > 1 ? "years" : "year"}</span>
          </div>
        ) : null}
        {months !== 0 ? (
          <div className={styles.timeUnit}>
            <span>{months < 10 ? "0" + months : months}</span>
            <span>{months > 1 ? "months" : "month"}</span>
          </div>
        ) : null}
        {days !== 0 ? (
          <div className={styles.timeUnit}>
            <span>{days < 10 ? "0" + days : days}</span>
            <span>{days > 1 ? "days" : "day"}</span>
          </div>
        ) : null}
      </div>
      <div className={styles.shorter}>
        {hours !== 0 ? (
          <>
            <div className={styles.timeUnit}>
              <span>{hours < 10 ? "0" + hours : hours}</span>
              <span>{hours > 1 ? "hours" : "hour"}</span>
            </div>
            <span className={styles.colon}>:</span>
          </>
        ) : null}
        {minutes !== 0 ? (
          <>
            <div className={styles.timeUnit}>
              <span>{minutes < 10 ? "0" + minutes : minutes}</span>
              <span>{minutes > 1 ? "minutes" : "minute"}</span>
            </div>
            <span className={styles.colon}>:</span>
          </>
        ) : null}
        {seconds >= 0 ? (
          <div className={styles.timeUnit}>
            <span>{seconds < 10 ? "0" + seconds : seconds}</span>
            <span>{seconds > 1 ? "seconds" : "second"}</span>
          </div>
        ) : null}
      </div>
    </div>
  ) : null;
};

export default Timer;
