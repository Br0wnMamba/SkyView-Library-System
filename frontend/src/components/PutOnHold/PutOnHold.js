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
  type,
  quantity
}) => {
  const [onHold, setOnHold] = useState(initiallyOnHold);

  useEffect(() => {
    setOnHold(initiallyOnHold);
  }, [initiallyOnHold]);

  const handleAddHold = () => {
    const type = "digital";
    const quantity = 1;
    holdManager.add(bookId, type, quantity);
    updateHoldList(holdManager.getHolds());
    setOnHold(true);
    setSnackbarMessage(`You placed a hold on "${bookTitle}".`);
    setSnackbarOpen(true);
  };

  const handleRemoveHold = () => {
    const type = "digital";

    const holdsBefore = holdManager.getHolds();

    holdManager.remove(bookId, type, quantity);

    const holdsAfter = holdManager.getHolds();

    setOnHold(false);
    setSnackbarMessage(`You removed "${bookTitle}" from your holds.`);
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
