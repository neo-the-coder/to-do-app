import React from 'react'

function ConfirmationBox({message ,handleConfirmation, openConfirm, setOpenConfirm}) {
  console.log('CONFIRM')
  //Are you sure to delete?
  return (
    openConfirm && (
      <div className="wrapper">
        <div className="container">
          <h1>Are you sure to delete?</h1>
          {message}
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