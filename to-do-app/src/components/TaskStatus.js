import React from 'react'
import { BsCalendarCheck, BsCalendarX, BsHourglassSplit, BsListUl } from "react-icons/bs";

function TaskStatus() {
  return (
    <>
      <div>
        <BsListUl />
        <span>ALL</span>
      </div>
      <div>
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
      </div>
    </>
  );
}

export default TaskStatus