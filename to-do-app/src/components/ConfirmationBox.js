import React from 'react'
import styles from '../styles/ConfirmationBox.module.scss';
import { CgClose } from 'react-icons/cg';

function ConfirmationBox({message ,handleConfirmation, openConfirm, setOpenConfirm}) {
  console.log('CONFIRM')
  //Are you sure to delete?
  return (
    openConfirm && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <button
            className={styles.closeButton}
            onClick={() => setOpenConfirm(false)}
          >
            <CgClose />
          </button>
          <div className={styles.confirmMsg}>
            <h1 className={styles.warning}>Are you sure to delete?</h1>
            <div className={styles.customMsg}>{message}</div>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.confirmBtn} onClick={handleConfirmation}>Delete</button>
            <button onClick={() => setOpenConfirm(false)}>Cancel</button>
          </div>
        </div>
      </div>
    )
  );
}

export default ConfirmationBox