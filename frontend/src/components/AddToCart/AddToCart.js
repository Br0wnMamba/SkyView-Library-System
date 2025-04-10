import React, { useState } from "react";
import "./AddToCart.css";
import cartManager from "../../utils/CartManager";

const AddToCart = ({ type, book_id }) => {
  // First get the label type (physical or digital)
  const label = type === "physical" ? "Physical Copy" : "Digital Copy";

  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    const result = cartManager.add(book_id, type);

    if (result === 200) {
      setAdded(true);
    }
  };
  const handleRemove = () => setAdded(false);

  return (
    <div className="cart-toggle-container">
      {cartManager.canAdd(book_id, type) ? (
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
