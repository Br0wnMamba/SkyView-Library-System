import React, { useState, useEffect } from 'react';
import holdManager from '../../utils/HoldManager';
import './PutOnHold.css';

const PutOnHold = ({
  bookId,
  bookTitle,
  initiallyOnHold,
  updateHoldList,
  setSnackbarMessage,
  setSnackbarOpen,
  setUndoAction
}) => {
  const [onHold, setOnHold] = useState(initiallyOnHold);

  useEffect(() => {
    setOnHold(initiallyOnHold);
  }, [initiallyOnHold]);

  const handleAddHold = () => {
    holdManager.add(bookId);
    updateHoldList(holdManager.getUserHolds());
    setOnHold(true);
    setSnackbarMessage(`You placed a hold on "${bookTitle}".`);
    setUndoAction({ type: 'hold', state: 'remove', id: bookId });
    setSnackbarOpen(true);
  };

  const handleRemoveHold = () => {
    holdManager.remove(bookId);
    updateHoldList(holdManager.getUserHolds());
    setOnHold(false);
    setSnackbarMessage(`You removed "${bookTitle}" from your holds.`);
    setUndoAction({ type: 'hold', state: 'add', id: bookId });
    setSnackbarOpen(true);
  };

  const handleClick = () => {
    if (onHold) {
      handleRemoveHold();
    } else {
      handleAddHold();
    }
  };

  return (
    <div className="put-on-hold-container">
      {onHold ? (
        <button className="put-on-hold-button" onClick={handleClick}>
          Remove Hold
        </button>
      ) : (
        <button className="put-on-hold-button" onClick={handleClick}>
          Place Hold
        </button>
      )}
    </div>
  );
};

export default PutOnHold;
