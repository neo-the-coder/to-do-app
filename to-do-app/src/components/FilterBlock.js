import React from 'react'
import styles from '../styles/FilterBlock.module.scss';
import Categories from './Categories';
import TaskStatus from './TaskStatus';

function FilterBlock() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.categoryFilter}>
        <Categories />
      </div>
      <div className={styles.taskSwitch}>
        <TaskStatus />
      </div>
    </div>
  );
}

export default FilterBlock