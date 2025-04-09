import React, { useState } from 'react';
import './AddToCart.css';
import { FaRegTrashAlt } from "react-icons/fa";

const ExtendHold = ({type}) => {
  
// First get the label type (physical or digital)
const label = type === 'physical' ? 'Physical Booking' : 'Digital Booking';
    
// variable that checks to make sure there are books
var availabilityCheck = true;


const [added, setAdded] = useState(false);

  const handleAdd = () => setAdded(true);
  const handleRemove = () => setAdded(false);

  

  return (
    <div className="cart-toggle-container">
      {added === false ? (
        <button className="add-to-cart-button" onClick={handleAdd}>
          Extend {label}
        </button>
      ) : (
        <div className="added-toggle">
          <button className="add-to-cart-button" onClick={handleRemove}>
          Extend {label}
          </button>
        </div>
      )}
    </div>
  );
};

export default ExtendHold;
