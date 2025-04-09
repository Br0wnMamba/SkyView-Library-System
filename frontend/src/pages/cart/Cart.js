import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Cart.css";

import ebookIcon from "../../assets/ebook.svg";
import physicalBookIcon from "../../assets/physical-book.svg";
import placeholderImage from "../../assets/empty-cart-image.png";
import bookImage from "../../assets/image.png";

import { handleAddBookmark } from "../../utils/setSessionStorage";

export default function Cart() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart")) || {};
    const storedBooks = JSON.parse(sessionStorage.getItem("books")) || {};

    const cartBooks = Object.entries(storedCart).map(([id, item]) => {
      const bookData = storedBooks[id] || {};

      return {
        id,
        name: bookData.title || `Book Title for ${id}`,
        authors: bookData.authors || ["Unknown Author"],
        is_physical: item.is_physical ? "true" : "false",
        quantity: item.quantity,
        return_date: item.return_date,
        image_url: bookImage, // Use bookData.image_url if available
      };
    });

    setBooks(cartBooks);
  }, []);

  const totalBooks = books.reduce(
    (acc, book) => {
      if (book.is_physical === "true") acc.physical += book.quantity;
      else acc.ebooks += book.quantity;
      return acc;
    },
    { ebooks: 0, physical: 0 }
  );

  const handleQuantityChange = (id, delta) => {
    const updatedBooks = books.map(book => {
      if (book.id === id) {
        const newQuantity = Math.max(1, book.quantity + delta);
        return { ...book, quantity: newQuantity };
      }
      return book;
    });
    setBooks(updatedBooks);

    const updatedCart = {};
    updatedBooks.forEach(book => {
      updatedCart[book.id] = {
        is_physical: book.is_physical === "true",
        quantity: book.quantity,
        return_date: book.return_date,
      };
    });
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDelete = (id) => {
    const updatedBooks = books.filter(book => book.id !== id);
    setBooks(updatedBooks);

    const cart = JSON.parse(sessionStorage.getItem("cart")) || {};
    delete cart[id];
    sessionStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleBookmark = (id) => {
    handleAddBookmark(id);
    alert("Book bookmarked!");
  };

  const isEmpty = books.length === 0;

  const handleCheckout = () => {
    const isLoggedIn = sessionStorage.getItem("user");
    if (isLoggedIn) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>

      {isEmpty ? (
        <div className="empty-cart">
          <img src={placeholderImage} alt="Empty cart" className="empty-cart-img" />
          <h2>Your cart is empty</h2>
          <p>Go explore and add some books to get started!</p>
        </div>
      ) : (
        <>
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

                  <div className="quantity-wrapper">
                    <div className="quantity-controls">
                      <button
                        onClick={() => handleQuantityChange(book.id, -1)}
                        disabled={book.quantity === 1}
                        className="qty-button"
                      >
                        -
                      </button>
                      <span>{book.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(book.id, 1)}
                        className="qty-button"
                      >
                        +
                      </button>
                    </div>
                    {book.quantity === 1 && (
                      <p className="qty-warning">Minimum quantity is 1</p>
                    )}
                  </div>

                  <div className="cart-controls">
                    <button onClick={() => handleDelete(book.id)} className="delete-link">
                      Delete
                    </button>
                    <button onClick={() => handleBookmark(book.id)} className="delete-link">
                      Bookmark
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Finalize checkout of {books.reduce((total, b) => total + b.quantity, 0)} books</h3>
            <ul>
              <li>{totalBooks.ebooks} e-book(s)</li>
              <li>{totalBooks.physical} physical book(s)</li>
            </ul>
            <p>Pick up at: <strong>Sky view Library, Calgary, AB</strong></p>
            <button className="checkout-button" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}