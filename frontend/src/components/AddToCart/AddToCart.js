import React, { useState, useEffect } from 'react';
import './AddToCart.css';
import { handleAddToCart } from "../../utils/setSessionStorage";

const AddToCart = ({ id, type, count, title, author, image }) => {
  const label = type === 'physical' ? 'Physical Copy' : 'Digital Copy';

  const isAvailable = type === 'physical' ? count > 0 : count !== 'n';

  const [added, setAdded] = useState(false);
  const [locked, setLocked] = useState(false); // for digital, one-time add


  const handleAdd = () => {
    handleAddToCart({
      id,
      bookTypeCheckout: type,
      quantity: 1,
      name: title,
      authors: [author],
      image
    });
  
    setAdded(true);
  
    if (type === "digital") {
      // After 2 seconds, lock it so it shows "eBook Already Added"
      setTimeout(() => {
        setAdded(false);
        setLocked(true);
      }, 2000);
    } else {
      // for physical, allow normal re-adding after timeout
      setTimeout(() => setAdded(false), 2000);
    }
  };  

  useEffect(() => {
    if (type === "digital") {
      const cart = JSON.parse(sessionStorage.getItem("cart")) || {};
      const key = `${id}-digital`;
      if (cart[key]) {
        setLocked(true);
      }
    }
  }, [id, type]);

  return (
    <div className="cart-toggle-container">
      {isAvailable ? (
        <button
          className={`add-to-cart-button ${added || locked ? "added" : ""}`}
          onClick={handleAdd}
          disabled={locked}
        >
          {locked
            ? "eBook Already Added"
            : added
            ? "Added to Cart"
            : `Add ${label}`}
        </button>
      ) : (
        <button className="add-to-cart-button" disabled>
          {label} Unavailable
        </button>
      )}
    </div>
  );
  
};

export default AddToCart;
