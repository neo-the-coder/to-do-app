import React from 'react'

function ConfirmationBox({handleConfirmation, openConfirm, setOpenConfirm}) {
  console.log('CONFIRM')

  return (
    openConfirm && (
      <div className="wrapper">
        <div className="container">
          <h1>Are you sure to delete?</h1>
          <div className="choices">
            <button onClick={handleConfirmation}>Yes</button>
            <button onClick={() => setOpenConfirm(false)}>No</button>
          </div>
        </div>
      </div>
    )
  );
}

export default ConfirmationBox