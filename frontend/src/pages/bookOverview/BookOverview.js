import React, { useState } from "react";
import Search from "../../components/Search/Search";
import Button from "@mui/material/Button";
import PhysicalBookLogo from "../../assets/physical-book.svg";
import EBookLogo from "../../assets/ebook.svg";
import AuthorProfile from "../../assets/bookoverview-user-profile.svg";
import { useParams } from "react-router-dom";
import "./BookOverview.css";
import bookImages from "../../utils/loadBookImages";
import {
  handleAddToCart,
  handleCheckout,
  handlePlaceOnHold,
} from "../../utils/setSessionStorage";
import AddToBookmark from "../../components/AddToBookmark/AddToBookmark";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import savedAuthorsManager from "../../utils/SavedAuthorsManager";
import bookManager from "../../utils/BookManager";
import holdManager from "../../utils/HoldManager";
import bookmarkManager from "../../utils/BookmarkManager";
import Snackbar from "@mui/material/Snackbar";
import StoreAuthor from "../../components/StoreAuthor/StoreAuthor";

const BookOverview = () => {
  const { bookId: id } = useParams();
  const [bookTypeCheckout, setBookTypeCheckout] = useState("");
  const [quantity, setQuantity] = useState(0);
  const books = JSON.parse(sessionStorage.getItem("books")) || {};
  const book = books[id] || {};
  const [savedAuthors, setSavedAuthors] = useState(
    savedAuthorsManager.getUserStoredAuthors() || []
  );
  const flattenedSavedAuthors = Object.values(savedAuthors || {}).flat();
  const [bookmarkedIds, setBookmarkedIds] = React.useState(
    Object.keys(bookmarkManager.getUserStoredBookmarks())
  );
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [undoAction, setUndoAction] = React.useState(null); // { type: 'bookmark' | 'hold', id: string }
  const [onHoldIds, setOnHoldIds] = React.useState(
    holdManager.getUserHolds().map((b) => b.id)
  );
  const {
    name,
    authors,
    published_date,
    number_of_physical_copies_available,
    is_ebook_available,
    description,
  } = book;

  const handleUndo = () => {
    if (undoAction?.type === "hold" && undoAction?.state === "remove") {
      const id = undoAction.id;
      holdManager.remove(id);
      setOnHoldIds(holdManager.getUserHolds());
      setSnackbarMessage(
        `You removed your hold on "${bookManager.getBook(id)?.name}".`
      );
      setUndoAction(null);
      setSnackbarOpen(false);
    } else if (undoAction?.type === "hold" && undoAction?.state === "add") {
      const id = undoAction.id;
      holdManager.add(id);
      const updated = holdManager.getUserHolds();
      setOnHoldIds(updated.map((b) => b.id));
      setSnackbarMessage(
        `You placed a hold on "${bookManager.getBook(id)?.name}".`
      );
      setUndoAction(null);
      setSnackbarOpen(false);
    } else if (
      undoAction?.type === "author" &&
      undoAction?.state === "remove"
    ) {
      const author = undoAction.id;
      savedAuthorsManager.removeAuthor(author);
      setSavedAuthors((prev) => prev.filter((a) => a !== author));
      setSnackbarMessage(`You removed "${author}" from your saved authors.`);
      setUndoAction(null);
      setSnackbarOpen(false);
    } else if (undoAction?.type === "author" && undoAction?.state === "add") {
      const author = undoAction.id;
      savedAuthorsManager.addAuthor(author);
      setSavedAuthors((prev) => [...prev, author]);
      setSnackbarMessage(`You saved "${author}".`);
      setUndoAction(null);
      setSnackbarOpen(false);
    } else if (
      undoAction?.type === "bookmark" &&
      undoAction?.state === "remove"
    ) {
      const id = undoAction.id;
      bookmarkManager.removeBookmark(id);
      setBookmarkedIds(Object.keys(bookmarkManager.getUserStoredBookmarks()));
      setSnackbarMessage(
        `You removed "${bookManager.getBook(id)?.name}" from your bookmarks.`
      );
      setUndoAction(null);
      setSnackbarOpen(false);
    } else if (undoAction?.type === "bookmark" && undoAction?.state === "add") {
      const id = undoAction.id;
      bookmarkManager.addBookmark(id);
      setBookmarkedIds(Object.keys(bookmarkManager.getUserStoredBookmarks()));
      setSnackbarMessage(
        `You added "${bookManager.getBook(id)?.name}" to your bookmarks.`
      );
      setUndoAction(null);
      setSnackbarOpen(false);
    }
  };

  return (
    <div>
      <div className="book-overview-container">
        <div className="book-overview">
          <div className="book-overview-image-container">
            <div className="book-overview-image">
              <img src={bookImages[id]} alt="Book Cover" />
            </div>
            <div className="book-sample-info-buttons">
              <Button
                className="sample-button"
                variant="outlined"
                startIcon={<PlayArrowIcon />}
              >
                Audio Sample
              </Button>
              <Button
                className="sample-button"
                variant="outlined"
                startIcon={<FormatAlignLeftIcon />}
              >
                Read Sample
              </Button>
            </div>
          </div>
          <div className="book-overview-info">
            <div className="book-overview-info-title">
              <div className="book-overview-info-published-date-name">
                <h1>{name}</h1>
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
            <div
              className="book-overview-bookmark-save-author-buttons"
              style={{ justifyContent: "center", alignItems: "center", display: "flex", gap: "10px", flexWrap: "wrap" }}
            >
              {authors.map((author, index) => (
                <div key={index} style={{ minWidth: "150px" }}>
                  <StoreAuthor
                    author={author}
                    initiallySaved={flattenedSavedAuthors.includes(author)}
                    updateSavedList={() =>
                      setSavedAuthors(savedAuthorsManager.getUserStoredAuthors())
                    }
                    setSnackbarMessage={setSnackbarMessage}
                    setSnackbarOpen={setSnackbarOpen}
                    setUndoAction={(action) => setUndoAction(action)}
                  />
                </div>
              ))}
              <div style={{ minWidth: "150px" }}>
                <AddToBookmark
                  bookId={id}
                  bookTitle={book.name}
                  initiallyBookmarked={bookmarkedIds.includes(id)}
                  updateBookmarks={() =>
                    setBookmarkedIds(
                      Object.keys(bookmarkManager.getUserStoredBookmarks())
                    )
                  }
                  setSnackbarMessage={setSnackbarMessage}
                  setSnackbarOpen={setSnackbarOpen}
                  setUndoAction={(action) => setUndoAction(action)}
                />
              </div>
            </div>
            <Snackbar
              open={snackbarOpen}
              onClose={() => setSnackbarOpen(false)}
              autoHideDuration={8000}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              message={snackbarMessage}
              action={
                <Button
                  size="small"
                  onClick={handleUndo}
                  className="snackbar-undo-button"
                >
                  Undo
                </Button>
              }
              ContentProps={{
                className: "success-snackbar",
              }}
            />
            <hr />
            <div className="book-overview-info-description">{description}</div>
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
            <Button
              className={
                bookTypeCheckout === "physical"
                  ? "book-overview-checkout-book-type selected"
                  : "book-overview-checkout-book-type"
              }
              onClick={() => setBookTypeCheckout("physical")}
            >
              Paperback
            </Button>
            <Button
              className={
                bookTypeCheckout === "ebook"
                  ? "book-overview-checkout-book-type selected"
                  : "book-overview-checkout-book-type"
              }
              onClick={() => setBookTypeCheckout("ebook")}
            >
              E-Book
            </Button>
            <Button
              className={
                bookTypeCheckout === "audio"
                  ? "book-overview-checkout-book-type selected"
                  : "book-overview-checkout-book-type"
              }
              onClick={() => setBookTypeCheckout("audio")}
            >
              Audiobook
            </Button>
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
                  handlePlaceOnHold({ id, bookTypeCheckout });
                }}
                fontSize={"18px"}
                backgroundColor={"#f4d473"}
              />
            ) : (
              <Button
                variant="contained"
                style={{ fontSize: "18px", backgroundColor: "green" }}
                onClick={() => {
                  handleAddToCart({ id, bookTypeCheckout, quantity });
                  setSnackbarMessage(`Added "${book.name}" to your cart.`);
                  setSnackbarOpen(true);
                }}
                disabled={
                  !bookTypeCheckout ||
                  (bookTypeCheckout === "physical" &&
                    number_of_physical_copies_available <= 0) ||
                  ((bookTypeCheckout === "ebook" ||
                    bookTypeCheckout === "audio") &&
                    is_ebook_available === false)
                }
              >
                Add to Cart
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleCheckout({ id, bookTypeCheckout, quantity });
              }}
              style={{ fontSize: "18px" }}
              disabled={
                !bookTypeCheckout ||
                (bookTypeCheckout === "physical" &&
                  number_of_physical_copies_available <= 0) ||
                ((bookTypeCheckout === "ebook" || bookTypeCheckout === "audio") &&
                  is_ebook_available === false)
              }
            >
              Checkout Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookOverview;