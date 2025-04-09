import React, { useState } from 'react';
import './AddToCart.css';
import { FaRegTrashAlt } from "react-icons/fa";

const ExtendHold = ({type}) => {
  

const [added, setAdded] = useState(false);

  const handleAdd = () => setAdded(true);
  const handleRemove = () => setAdded(false);

  

  return (
    <div className="cart-toggle-container">
    {availabilityCheck ? (
      added === false ? (
        <button className="add-to-cart-button" onClick={handleAdd}>
          Add {label}
        </button>
      ) : (
        <div className="added-toggle">
          <button className="add-to-cart-button" onClick={handleRemove}>
            Added {label}
          </button>
        </div>
      )
    ) : (
      <button className="add-to-cart-button" disabled>
        {label} Unavailable
      </button>
    )}
  </div>
  );
};

export default AddToCart;
