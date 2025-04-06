import React, { useState } from 'react';
import './AddToCart.css';
import { FaRegTrashAlt } from "react-icons/fa";

const AddToCart = ({ onAdd, onRemove }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    onAdd?.(newQty);
  };

  const handleRemove = () => {
    const newQty = Math.max(quantity - 1, 0);
    setQuantity(newQty);
    onRemove?.(newQty);
  };

  return (
    <div className="cart-toggle-container">
      {quantity === 0 ? (
        <button className="add-to-cart-button" onClick={handleAdd}>
          Add to Cart
        </button>
      ) : (
        <div className="quantity-toggle">
          <button className="toggle-btn" onClick={handleRemove}>
            {quantity === 1 ? <span className="trash-icon"><FaRegTrashAlt /></span> : '-'}
          </button>
          <span className="quantity">{quantity}</span>
          <button className="toggle-btn" onClick={handleAdd}>+</button>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
