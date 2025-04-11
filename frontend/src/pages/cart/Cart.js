import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

import ebookIcon from "../../assets/ebook.svg";
import physicalBookIcon from "../../assets/physical-book.svg";
import placeholderImage from "../../assets/empty-cart-image.png";
import bookImage from "../../assets/image.png";
import cartManager from "../../utils/CartManager";
import bookmarkManager from "../../utils/BookmarkManager"; 
import loanManager from "../../utils/LoanManager";
import { Link } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const rawCart = cartManager.getCart();
  
    if (!Array.isArray(rawCart)) {
      console.error("Cart data is not an array:", rawCart);
      return;
    }
  
    const booksList = rawCart
      .filter(item => item && item.book && item.book_id)
      .map((item) => ({
        id: String(item.book_id),
        name: item.book.title,
        authors: item.book.authors,
        image_url: item.book.cover || bookImage,
        is_physical: item.type === "physical" ? "true" : "false",
        quantity: item.quantity,
        return_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        type: item.type,
      }));
  
    setBooks(booksList);
  }, []);  

  const totalBooks = books.reduce(
    (acc, book) => {
      if (book.is_physical === "true") acc.physical += book.quantity;
      else acc.ebooks += book.quantity;
      return acc;
    },
    { ebooks: 0, physical: 0 }
  );

  const handleQuantityChange = (book_id, type, delta) => {
    const book = books.find((b) => Number(b.id) === Number(book_id) && b.type === type);
    if (!book) return;
  
    if (delta < 0 && book.quantity === 1) return;
  
    const result = delta > 0
      ? cartManager.add(book_id, type, 1)
      : cartManager.remove(book_id, type, 1);
  
    if (result?.status !== 200) {
      alert(result.message || "Failed to update cart.");
      return;
    }
  
    // Get and group the updated cart
    const updatedCart = cartManager.getCart();
    const groupedMap = new Map();
  
    updatedCart.forEach((item) => {
      const key = `${item.book_id}-${item.type}`;
      if (!groupedMap.has(key)) {
        groupedMap.set(key, {
          id: item.book_id,
          type: item.type,
          name: item.book.title,
          authors: item.book.authors,
          image_url: item.book.cover || bookImage,
          is_physical: item.type === "physical" ? "true" : "false",
          quantity: item.quantity,
          return_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        });
      } else {
        groupedMap.get(key).quantity += item.quantity;
      }
    });
  
    setBooks(Array.from(groupedMap.values()));
  };
  
  const handleDelete = (book_id, type) => {
    cartManager.remove(book_id, type, 999);
  
    const updatedCart = cartManager.getCart();
    const groupedMap = new Map();
  
    updatedCart.forEach((item) => {
      const key = `${item.book_id}-${item.type}`;
      if (!groupedMap.has(key)) {
        groupedMap.set(key, {
          id: item.book_id,
          type: item.type,
          name: item.book.title,
          authors: item.book.authors,
          image_url: item.book.cover || bookImage,
          is_physical: item.type === "physical" ? "true" : "false",
          quantity: item.quantity,
          return_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        });
      } else {
        groupedMap.get(key).quantity += item.quantity;
      }
    });
  
    setBooks(Array.from(groupedMap.values()));
  };  

  const handleBookmark = (bookId) => {
    const result = bookmarkManager.addBookmark(bookId);
    if (result?.status === 200) {
      alert("Book bookmarked!");
    } else if (result?.status === 400) {
      alert("Book already bookmarked!");
    } else {
      alert("Something went wrong.");
    }
  };

  const isEmpty = books.length === 0;

  const handleCheckout = () => {
    const rawCart = cartManager.getCart();
  
    // Format loanManager expects
    const transformedCart = rawCart.map(item => ({
      id: item.book_id,
      type: item.type,
      quantity: item.quantity
    }));
  
    loanManager.checkoutCart(transformedCart); 
    setBooks([]); 
    navigate("/bookshelf");
  };
   
  return (
    <div className="page-wrapper">
      <div className="cart-container">
        <h1 className="cart-title">Your Cart</h1>

        {isEmpty ? (
          <div className="empty-cart">
            <img
              src={placeholderImage}
              alt="Empty cart"
              className="empty-cart-img"
            />
            <h2>Your cart is empty</h2>
            <p>Go explore and add some books to get started!</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {books.map((book) => (
                <div key={`${book.id}-${book.type}`} className="cart-item">
                  <img src={book.image_url} alt={book.name} />
                  <div className="cart-info">
                  <Link to={`/book/${book.id}`} className="book-title">
                    {book.name}
                  </Link>
                    <p className="book-author">by {book.authors.join(", ")}</p>
                    <div className="book-type">
                      <img
                        src={
                          book.is_physical === "true"
                            ? physicalBookIcon
                            : ebookIcon
                        }
                        alt={
                          book.is_physical === "true"
                            ? "Physical Book"
                            : "eBook"
                        }
                      />
                      <span>
                        {book.is_physical === "true" ? "Book" : "eBook"}{" "}
                        Available
                      </span>
                    </div>
                    <p className="return-date">
                      Return Date: {book.return_date}
                    </p>

                    <div className="quantity-wrapper">
                      <div className="quantity-controls">
                        <button
                          onClick={() => handleQuantityChange(book.id, book.type, -1)}
                          disabled={book.quantity === 1}
                          className="qty-button"
                        >
                          -
                        </button>
                        <span>{book.quantity}</span>
                        {(() => {
                          const disableAddButton =
                            (book.type === "digital" && book.quantity >= 1) ||
                            (book.type === "physical" && !cartManager.canAdd(book.id, "physical"));

                          return (
                            <button
                              onClick={() => handleQuantityChange(book.id, book.type, 1)}
                              className="qty-button"
                              disabled={disableAddButton}
                            >
                              +
                            </button>
                          );
                        })()}
                      </div>
                      {book.quantity === 1 && (
                        <p className="qty-warning">Minimum quantity is 1</p>
                      )}
                    </div>

                    <div className="cart-controls">
                      <button
                        onClick={() => handleDelete(book.id, book.type)}
                        className="delete-link"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleBookmark(book.id)}
                        className="bookmark-link"
                      >
                        Bookmark
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>
                Finalize checkout of{" "}
                {books.reduce((total, b) => total + b.quantity, 0)} books
              </h3>
              <ul>
                <li>{totalBooks.ebooks} e-book(s)</li>
                <li>{totalBooks.physical} physical book(s)</li>
              </ul>
              <p>
                Pick up at: <strong>Sky view Library, Calgary, AB</strong>
              </p>
              <button className="checkout-button" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
