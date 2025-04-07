import React, { useState } from 'react';
import './AddToCart.css';
import { FaRegTrashAlt } from "react-icons/fa";

const AddToCart = ({ onAdd, onRemove }) => {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
  };

  const handleRemove = () => {
    setAdded(false);
  };

  return (
    <div className="cart-toggle-container">
      {added === false ? (
        <button className="add-to-cart-button" onClick={handleAdd}>
          Add to Cart
        </button>
      ) : (
        <div className="added-toggle">
          <button className="add-to-cart-button" onClick={handleRemove}>
          Added to Cart
        </button>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
