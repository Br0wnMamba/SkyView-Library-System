// components/BookCard.js
import React from "react";
import { IoMdPhonePortrait } from "react-icons/io";
import { FaBook } from "react-icons/fa";
import AddToCart from "../AddToCart/AddToCart"; 
import "./BookCard.css"; 

const BookCard = ({ book }) => {
  return (
    <div className="home-book-item">
      <img src={book.cover} alt={book.title} className="book-cover" />
      <h3>{book.title}</h3>
      <h4 className="home-bookAuthor">{book.author}</h4>

      <div className="home-phsycial-avaiablity-container">
        <FaBook className="availability-icon" />
        <p>
          <strong>physical:</strong>{" "}
          {book.availability[0] === 0 ? (
            <span className="availability-no">unavailable</span>
          ) : (
            <span className="availability-yes">
              {book.availability[0]} available
            </span>
          )}
        </p>
      </div>

      <div className="home-digital-avaiablity-container">
        <IoMdPhonePortrait className="availability-icon" />
        <p>
          <strong>digital:</strong>{" "}
          <span
            className={
              book.availability[1] === "n"
                ? "availability-no"
                : "availability-yes"
            }
          >
            {book.availability[1] === "n" ? "unavailable" : "available"}
          </span>
        </p>
      </div>

      <div className="home-addtocart-container">
        <AddToCart type="physical" count={book.availability[0]} />
        <AddToCart type="digital" count={book.availability[1]} />
      </div>
    </div>
  );
};

export default BookCard;
