import React, { useState } from "react";
import Search from "../../components/Search/Search";
import Button from "../../components/Button/Button";
import PhysicalBookLogo from "../../assets/physical-book.svg";
import EBookLogo from "../../assets/ebook.svg";
import AuthorProfile from "../../assets/bookoverview-user-profile.svg";
import { useParams } from "react-router-dom";
import "./BookOverview.css";
import bookManager from "../../utils/BookManager";
import bookmarkManager from "../../utils/BookmarkManager";
import cartManager from "../../utils/CartManager";
import holdManager from "../../utils/HoldManager";
import loanManager from "../../utils/LoanManager";

const BookOverview = () => {
  const { bookId: id } = useParams();
  const [bookTypeCheckout, setBookTypeCheckout] = useState("");
  const [quantity, setQuantity] = useState(1);
  const book = bookManager.getBook(id);
  const { title, authors, availability } = book;
  const number_of_physical_copies_available = availability.physical;
  const is_ebook_available = availability.digital;
  const published_date = "2001-01-01";

  return (
    <div>
      {/* <Search buttonName={"Filter"} /> */}
      <div className="book-overview-container">
        <div className="book-overview">
          <div className="book-overview-image-container">
            <div className="book-overview-image">
              <img src={book.cover} alt="Book Cover" />
            </div>
            <div className="book-sample-info-buttons">
              <button>Read Sample</button>
              <i className="bi bi-play-fill"></i>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-play-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                </svg>{" "}
                Audible Sample
              </button>
            </div>
          </div>
          <div className="book-overview-info">
            <div className="book-overview-info-title">
              <div className="book-overview-info-published-date-name">
                <h1>{title}</h1>
                <p> - {published_date}</p>
              </div>
              <div className="book-overview-info-authors">
                <h1>
                  By{" "}
                  {authors &&
                    authors.length > 0 &&
                    authors.map((author, index) => (
                      <span key={index}>
                        {author}
                        {index < authors.length - 1 && ", "}
                      </span>
                    ))}
                </h1>
              </div>
            </div>
            <hr />
            <div className="book-overview-info-availability">
              <img src={PhysicalBookLogo} alt="Physical Book" />
              <p>
                Physical:{" "}
                <span
                  className={
                    number_of_physical_copies_available > 0 ? "green" : "red"
                  }
                >
                  {number_of_physical_copies_available} Left
                </span>
              </p>
              <img src={EBookLogo} alt="E-Book" />
              <p>
                E-Book:{" "}
                <span className={is_ebook_available ? "green" : "red"}>
                  {is_ebook_available ? "Available" : "Not Available"}
                </span>
              </p>
            </div>
            <hr />
            <div className="book-overview-bookmark-save-author-buttons">
              <Button
                text="Save Author"
                borderRadius={"0"}
                onClick={() => {
                  const savedAuthors =
                    JSON.parse(sessionStorage.getItem("saved_authors")) || [];
                  if (authors && authors.length > 0) {
                    authors.forEach((author) => {
                      if (!savedAuthors.includes(author)) {
                        savedAuthors.push(author);
                      }
                    });
                  }
                  sessionStorage.setItem(
                    "saved_authors",
                    JSON.stringify(savedAuthors)
                  );
                }}
              />
              <Button
                text="Bookmark"
                borderRadius={"0"}
                onClick={() => {
                  bookmarkManager.addBookmark(id);
                }}
              />
            </div>
            <hr />
            <div className="book-overview-info-description">{book.desc}</div>
            <hr />
            <div className="book-overview-info-learn-more">
              <b>Learn more about the authors!</b>
              {authors &&
                authors.length > 0 &&
                authors.map((author, index) => (
                  <div
                    className="book-overview-info-author-learn-more"
                    key={index}
                  >
                    <img src={AuthorProfile} alt="Author Profile" />
                    <p>{author}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="book-overview-checkout">
          <h1>Checkout Book!</h1>
          <div className="book-overview-checkout-buttons">
            <button
              className={
                bookTypeCheckout === "physical"
                  ? "book-overview-checkout-book-type selected"
                  : "book-overview-checkout-book-type"
              }
              onClick={() => setBookTypeCheckout("physical")}
            >
              Paperback
            </button>
            <button
              className={
                bookTypeCheckout === "ebook"
                  ? "book-overview-checkout-book-type selected"
                  : "book-overview-checkout-book-type"
              }
              onClick={() => setBookTypeCheckout("ebook")}
            >
              E-Book
            </button>
            <button
              className={
                bookTypeCheckout === "audio"
                  ? "book-overview-checkout-book-type selected"
                  : "book-overview-checkout-book-type"
              }
              onClick={() => setBookTypeCheckout("audio")}
            >
              Audiobook
            </button>
          </div>
          <div className="book-overview-checkout-pickup-location">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-geo-alt-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
            </svg>
            Pick up at - 1513 Brookfield Way
          </div>
          <div className="book-overview-checkout-quantity">
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            >
              {Array.from(
                { length: Math.min(10, number_of_physical_copies_available) },
                (_, index) => {
                  const value = index + 1;
                  return (
                    <option key={value} value={value}>
                      Quantity: {value}
                    </option>
                  );
                }
              )}
            </select>
          </div>
          <div className="book-overview-checkout-cart-book-now-buttons">
            {(bookTypeCheckout &&
              bookTypeCheckout === "physical" &&
              number_of_physical_copies_available <= 0) ||
            ((bookTypeCheckout === "ebook" || bookTypeCheckout === "audio") &&
              is_ebook_available === false) ? (
              <Button
                text={"Place On Hold"}
                onClick={() => {
                  holdManager.add(id, bookTypeCheckout, 1);
                }}
                fontSize={"18px"}
                backgroundColor={"#f4d473"}
              />
            ) : (
              <Button
                text="Add to Cart"
                onClick={() => {
                  console.log(cartManager.add(id, bookTypeCheckout, quantity));
                }}
                fontSize={"18px"}
                backgroundColor={"green"}
                disabled={
                  !bookTypeCheckout ||
                  (bookTypeCheckout === "physical" &&
                    number_of_physical_copies_available <= 0) ||
                  ((bookTypeCheckout === "ebook" ||
                    bookTypeCheckout === "audio") &&
                    is_ebook_available === false)
                }
              />
            )}
            <Button
              text="Checkout Book Now"
              onClick={() => {
                loanManager.checkoutBook(id, bookTypeCheckout, quantity);
              }}
              fontSize={"18px"}
              disabled={
                !bookTypeCheckout ||
                (bookTypeCheckout === "physical" &&
                  number_of_physical_copies_available <= 0) ||
                ((bookTypeCheckout === "ebook" ||
                  bookTypeCheckout === "audio") &&
                  is_ebook_available === false)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookOverview;
