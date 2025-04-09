// components/BookCardOnHold.js
import React, { useState } from "react";
import { IoMdPhonePortrait } from "react-icons/io";
import { FaBook, FaEllipsisV } from "react-icons/fa";
import ExtendHold from "../AddToCart/ExtendHold";
import "./BookCard.css";
import "./BookCardOnHold.css";


const BookCardOnHold = ({ book }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleExtend = () => {

  };

  const handleReturnEarly = () => {

  };

  return (
    <div className="home-book-item on-hold">
      
      {/* <div className="onhold-actions">
        <button onClick={() => setShowOptions(!showOptions)} className="menu-toggle">
          <FaEllipsisV />
        </button>
        {showOptions && (
          <div className="dropdown-menu">
            <button onClick={handleReturnEarly}>Return Early</button>
          </div>
        )}
      </div> */}

      
      <img src={book.cover} alt={book.title} className="book-cover" />
      <h3>{book.title}</h3>
      <h4 className="home-bookAuthor">{book.author}</h4>

      <div className="hold-type-tag">
        {book.type === "physical" ? (
          <>
            <FaBook className="availability-icon" />
            <span>Physical Hold</span>
          </>
        ) : (
          <>
            <IoMdPhonePortrait className="availability-icon" />
            <span>Digital Hold</span>
          </>
        )}
      </div>

      <div className="onhold-due">
        <p><strong>Due Date:</strong> {book.DueDate}</p>
        <p><strong>Time Left:</strong> {book.TimeLeft} days</p>
      </div>

      <div className="home-addtocart-container">
        <ExtendHold type={book.type}  />
      </div>

      
    </div>
  );
};

export default BookCardOnHold;
