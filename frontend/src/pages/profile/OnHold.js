import React, { useState, useEffect } from "react";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import BookDisplaySection from "../../components/DisplayContent/BookDisplaySection";
import MuiButton from "@mui/material/Button";
import accountManager from "../../utils/AccountManager";
import holdManager from "../../utils/HoldManager";
import Snackbar from "@mui/material/Snackbar";
import "./profile-all-pages.css";
import PutOnHold from "../../components/PutOnHold/PutOnHold";
import bookManager from "../../utils/BookManager";

const OnHold = () => {
  const userId = accountManager.getCardNumber();
  const [on_hold_books, setOnHoldBooks] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [onHoldIds, setOnHoldIds] = useState(
    holdManager.getHolds().map((b) => b.id)
  );

  const books = JSON.parse(sessionStorage.getItem("books")) || {};

  useEffect(() => {
    const onHoldBooks = holdManager.getHolds();
    if (onHoldBooks) {
      setOnHoldBooks(onHoldBooks);
    }
  }, [userId]);

  const customTextRenderer = (book) => (
    <div style={{ paddingBottom: "10px" }}>
      <p>
        <strong>Put on hold:</strong> {book.hold_date}
      </p>
      <p>
        <strong>Hold expires:</strong> {book.hold_till}
      </p>
    </div>
  );

  return (
    <div className="profile-page-container on-hold-page">
      <ProfileSidebar is_on_hold={true} />
      <div className="profile-page-content-container">
        <div className="profile-page-header"></div>
        <div className="profile-page-cards-container">
          {Array.isArray(on_hold_books) && on_hold_books.length > 0 ? (
            <BookDisplaySection
              title="Books On Hold"
              books={on_hold_books.map((hold) => ({
                id: hold.id,
                title: books[hold.id]?.title,
                author: books[hold.id]?.authors.join(", "),
                cover: books[hold.id]?.cover,
                onHold: true,
                hold_date: hold.hold_date,
                hold_till: hold.hold_till,
                type: hold.type,
                quantity: hold.quantity,
              }))}
              renderButtons={(book) => (
                <div className="home-addtocart-container">
                  <PutOnHold
                    bookId={book.id}
                    bookTitle={book.title}
                    initiallyOnHold={onHoldIds.includes(book.id)}
                    updateHoldList={() => {
                      holdManager.remove(book.id, book.type, book.quantity);
                      const updated = holdManager.getHolds();
                      setOnHoldBooks(updated);
                      setOnHoldIds(updated.map((b) => b.id));
                    }}
                    setSnackbarMessage={setSnackbarMessage}
                    setSnackbarOpen={setSnackbarOpen}
                    type={book.type}
                    quantity={book.quantity}
                  />
                </div>
              )}
              customTextRenderer={customTextRenderer}
              showAvailability={false}
            />
          ) : (
            <div>
              <h2 className="no-data-available">
                No books have been placed on hold yet.
              </h2>
            </div>
          )}
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        autoHideDuration={8000}
        message={snackbarMessage}
        action={null}
        ContentProps={{
          className: "success-snackbar",
        }}
      />
    </div>
  );
};

export default OnHold;