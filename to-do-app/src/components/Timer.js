import React from "react";
import styles from '../styles/Timer.module.scss';
import { useState, useEffect } from "react";
import { differenceInMonths, differenceInYears } from "date-fns";
import { useDispatch } from "react-redux";
import { updateTodo } from "../slices/todoSlice";

const Timer = ({ id, deadline, status }) => {
  const dispatch = useDispatch();
  const [years, setYears] = useState(0);
  const [months, setMonths] = useState(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  
  const runTimer = (time) => {
    setYears(differenceInYears(Date.parse(deadline), Date.now()));
    setMonths(Math.floor(differenceInMonths(Date.parse(deadline), Date.now()) % 12));
    setDays(Math.floor((time /(60 * 60 * 24)) % 30.04));
    setHours(Math.floor((time / (60 * 60)) % 24));
    setMinutes(Math.floor((time / 60) % 60));
    setSeconds(Math.floor(time % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const time = Math.floor((Date.parse(deadline) - Date.now()) / 1000);
      if (status === "pending" && time >= 0) {
        runTimer(time);
        if (time === 0) {
          clearInterval(interval);
          dispatch(updateTodo({ id, status: "unaccomplished" }));
        }
      } else clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [deadline, status]);

  return (
    <div className={styles.timer} role="timer">
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
      {/* <span id="year">{years !== 0 ? years + <br/> +(years > 1 ? ' years' : ' year') : null}</span> */}
      {/* <span id="month">{months !== 0 ? (months < 10 ? "0" + months : months) + (months > 1 ? ' months' : ' month') : null}</span> */}
      {/* <span id="day">{days !== 0 ? (days < 10 ? "0" + days : days) + (days > 1 ? ' days' : ' day') : null}</span> */}
      {/* <span id="hour">{hours !== 0 ? (hours < 10 ? "0" + hours : hours) + (hours > 1 ? ' hours' : ' hour') : null}:</span> */}
      {/* <span id="minute">{(minutes < 10 ? "0" + minutes : minutes) + (minutes > 1 ? ' mins' : ' min')}:</span> */}
      {/* <span id="second">{seconds < 10 ? "0" + seconds : seconds}</span> */}
    </div>
  );
};

export default Timer;
