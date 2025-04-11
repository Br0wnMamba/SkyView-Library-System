import React, { useState, useEffect } from "react";
import "./AddToCart.css";
import cartManager from "../../utils/CartManager";

const AddToCart = ({ id, type, title, author, image }) => {
  const label = type === 'physical' ? 'Physical Copy' : 'Digital Copy';

  const [added, setAdded] = useState(false);
  const [locked, setLocked] = useState(false);

  const isAvailable = cartManager.canAdd(id, type);

  const handleAdd = () => {
    const result = cartManager.add(id, type, 1);

    if (result?.status === 200) {
      setAdded(true);
      if (type === "digital") {
        setTimeout(() => {
          setAdded(false);
          setLocked(true);
        }, 2000);
      } else {
        setTimeout(() => setAdded(false), 2000);
      }
    } else {
      alert(result?.message || "Could not add to cart.");
    }
  };

  useEffect(() => {
    if (type === "digital") {
      const rawCart = cartManager.getRawCart?.();
  
      if (Array.isArray(rawCart)) {
        const alreadyAdded = rawCart.find(item =>
          item.book_id === id && item.type === "digital"
        );
        if (alreadyAdded) {
          setLocked(true);
        }
      }
    }
  }, [id, type]);
  

  return (
    <div className="cart-toggle-container">
      {locked ? (
        <button className="add-to-cart-button added" disabled>
          eBook Already Added
        </button>
      ) : isAvailable ? (
        <button
          className={`add-to-cart-button ${added ? "added" : ""}`}
          onClick={handleAdd}
        >
          {added ? "Added to Cart" : `Add ${label}`}
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
