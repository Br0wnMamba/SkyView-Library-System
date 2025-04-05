// File: src/pages/cart/Cart.js
import React, { useState } from "react";
import "./Cart.css";

import ebookIcon from "../../assets/ebook.svg";
import physicalBookIcon from "../../assets/physical-book.svg";
import placeholderImage from "../../assets/image.png";

export default function Cart() {
  const [books, setBooks] = useState([
  {
    id: "book-1",
    name: "Harry Potter: and the Philosopher’s Stone",
    authors: ["J.K. ROWLING"],
    is_physical: "false",
    quantity: 2,
    return_date: "03/25/2025",
    image_url: placeholderImage,
  },
  {
    id: "book-2",
    name: "Harry Potter: and the Sorcerer’s Stone",
    authors: ["J.K. ROWLING"],
    is_physical: "true",
    quantity: 1,
    return_date: "03/25/2025",
    image_url: placeholderImage,
  },
]);

  const totalBooks = books.reduce(
    (acc, book) => {
      if (book.is_physical === "true") acc.physical++;
      else acc.ebooks++;
      return acc;
    },
    { ebooks: 0, physical: 0 }
  );

  const handleQuantityChange = (id, delta) => {
    setBooks(prev =>
      prev.map(book =>
        book.id === id
          ? {
              ...book,
              quantity: Math.max(1, book.quantity + delta),
            }
          : book
      )
    );
  };  

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {books.map((book) => (
          <div key={book.id} className="cart-item">
            <img src={book.image_url} alt={book.name} />
            <div className="cart-info">
              <a href="#" className="book-title">{book.name}</a>
              <p className="book-author">by {book.authors.join(", ")}</p>
              <div className="book-type">
                <img
                  src={book.is_physical === "true" ? physicalBookIcon : ebookIcon}
                  alt={book.is_physical === "true" ? "Physical Book" : "eBook"}
                />
                <span>{book.is_physical === "true" ? "Book" : "eBook"} Available</span>
              </div>
              <p className="return-date">Return Date: {book.return_date}</p>
              
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(book.id, -1)}>-</button>
                <span>{book.quantity}</span>
                <button onClick={() => handleQuantityChange(book.id, 1)}>+</button>
                </div>
                <div className="cart-controls">
                <a href="#" className="delete-link">Delete</a>
                <a href="#" className="delete-link">Bookmark</a>
              </div>

            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Finalize checkout of {books.length} books</h3>
        <ul>
          <li>{totalBooks.ebooks} e-books</li>
          <li>{totalBooks.physical} physical book</li>
        </ul>
        <p>Pick up at: <strong>Sky view Library, Calgary, AB</strong></p>
        <button className="checkout-button">Proceed to Checkout</button>
      </div>
    </div>
  );
}
