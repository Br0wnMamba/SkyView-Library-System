import React, { useState, useEffect } from 'react';
import holdManager from '../../utils/HoldManager';
import './PutOnHold.css';

const PutOnHold = ({
  bookId,
  bookTitle,
  initiallyOnHold,
  updateHoldList,
  setSnackbarMessage,
  setSnackbarOpen
}) => {
  const [onHold, setOnHold] = useState(initiallyOnHold);

  useEffect(() => {
    setOnHold(initiallyOnHold);
  }, [initiallyOnHold]);

  const handleAddHold = () => {
    const type = "digital";
    const quantity = 1;
    console.log("[DEBUG] Adding hold:", { bookId, type, quantity });
    holdManager.add(bookId, type, quantity);
    updateHoldList(holdManager.getHolds());
    console.log("[DEBUG] Updated hold list after add:", holdManager.getHolds());
    setOnHold(true);
    setSnackbarMessage(`You placed a hold on "${bookTitle}".`);
    setSnackbarOpen(true);
  };

  const handleRemoveHold = () => {
    const type = "digital";
    console.log("[DEBUG] Removing hold:", { bookId, type });

    const holdsBefore = holdManager.getHolds();
    console.log("[DEBUG] Hold list before remove:", holdsBefore);

    holdManager.remove(bookId, type);

    const holdsAfter = holdManager.getHolds();
    console.log("[DEBUG] Hold list after remove:", holdsAfter);

    setOnHold(false);
    setSnackbarMessage(`You removed "${bookTitle}" from your holds.`);
    setSnackbarOpen(true);
  };

  const handleClick = () => {
    console.log("[DEBUG] Handle click - current hold state:", onHold);
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
