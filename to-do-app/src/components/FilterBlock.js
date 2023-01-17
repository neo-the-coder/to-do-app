import React from 'react'
import styles from '../styles/FilterBlock.module.scss';

function FilterBlock() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.categoryFilter}>Filtered color options...</div>
      <div className={styles.taskSwitch}>Completed / Uncompleted Switch</div>
    </div>
  );
}

export default FilterBlock