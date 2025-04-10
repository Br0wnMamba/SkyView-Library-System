import React, { useState, useEffect } from "react";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import BookDisplaySection from "../../components/DisplayContent/BookDisplaySection";
import MuiButton from "@mui/material/Button";
import accountManager from "../../utils/AccountManager";
import holdManager from "../../utils/HoldManager";
import Snackbar from "@mui/material/Snackbar";
import "./profile-all-pages.css";
import bookImages from "../../utils/loadBookImages";
import PutOnHold from "../../components/PutOnHold/PutOnHold";
import bookManager from "../../utils/BookManager";

const OnHold = () => {
  const userId = accountManager.getCardNumber();
  const [on_hold_books, setOnHoldBooks] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [onHoldIds, setOnHoldIds] = useState(
    holdManager.getUserHolds().map((b) => b.id)
  );
  const [undoAction, setUndoAction] = useState(null);
  const [removedHoldID, setRemovedHoldID] = useState(null);

  const books = JSON.parse(sessionStorage.getItem("books")) || {};

  const handleUndo = () => {
    holdManager.add(removedHoldID);
    const updated = holdManager.getUserHolds();
    setOnHoldBooks(updated);
    setOnHoldIds(updated.map((b) => b.id));
    const bookName = bookManager.getBook(removedHoldID).name;

    setSnackbarMessage(`You re-added your hold on "${bookName}".`);
    setSnackbarOpen(false);
    setRemovedHoldID(null);
    setUndoAction(null);
  };

  useEffect(() => {
    const onHoldBooks = holdManager.getUserHolds();
    if (onHoldBooks) {
      setOnHoldBooks(onHoldBooks);
    }
  }, [userId]);

  const customTextRenderer = (book) => (
    <div style={{ paddingBottom: "10px" }}>
      <p>
        <strong>Put on hold:</strong> {book.addedtoholddate}
      </p>
      <p>
        <strong>Available:</strong> {book.receivedate}
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
                title: books[hold.id]?.name,
                author: books[hold.id]?.authors.join(", "),
                cover: bookImages[hold.id],
                onHold: true,
                addedtoholddate: hold.addedtoholddate,
                receivedate: hold.receivedate,
              }))}
              renderButtons={(book) => (
                <div className="home-addtocart-container">
                  <PutOnHold
                    bookId={book.id}
                    bookTitle={book.title}
                    initiallyOnHold={onHoldIds.includes(book.id)}
                    setUndoAction={(action) => setUndoAction(action)}
                    updateHoldList={() => {
                      setRemovedHoldID(book.id);
                      const updated = holdManager.getUserHolds();
                      setOnHoldBooks(updated);
                      setOnHoldIds(updated.map((b) => b.id));
                    }}
                    setSnackbarMessage={setSnackbarMessage}
                    setSnackbarOpen={setSnackbarOpen}
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
        action={
          <MuiButton
            className="snackbar-undo-button"
            size="small"
            onClick={handleUndo}
          >
            Undo
          </MuiButton>
        }
        ContentProps={{
          className: "success-snackbar",
        }}
      />
    </div>
  );
};

export default OnHold;
