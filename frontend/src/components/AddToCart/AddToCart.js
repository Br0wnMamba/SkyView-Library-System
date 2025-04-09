import React, { useState } from 'react';
import './AddToCart.css';
import { FaRegTrashAlt } from "react-icons/fa";

const AddToCart = ({type, count}) => {
  
    // First get the label type (physical or digital)
    const label = type === 'physical' ? 'Physical Booking' : 'Digital Booking';
    
    // variable that checks to make sure there are books
    var availabilityCheck = true;

    // if its physical we want to see how many copies there are if its 0 then automatically set the useState var to false
    if (type === 'physical') {
        if (count == 0)
            availabilityCheck = false;
    }
    // otherwise its a digital copy and we need to see if its available
    else {
        if (count === 'n')
            availabilityCheck = false;
    }

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
          Extended {label}
        </button>
      </div>
    )}
  </div>
  );
};

export default AddToCart;
