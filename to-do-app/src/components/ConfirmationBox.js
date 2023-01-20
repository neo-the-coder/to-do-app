import React from 'react'
import { useDispatch } from 'react-redux';

function ConfirmationBox({delItem, delAction, openConfirm, setOpenConfirm}) {
  const dispatch = useDispatch();

  return (
    openConfirm && (
      <div className="wrapper">
        <div className="container">
          <h1>Are you sure to delete?</h1>
          <div className="choices">
            <button onClick={() => dispatch(delAction(delItem))}>Yes</button>
            <button onClick={() => setOpenConfirm(false)}>No</button>
          </div>
        </div>
      </div>
    )
  );
}

export default ConfirmationBox