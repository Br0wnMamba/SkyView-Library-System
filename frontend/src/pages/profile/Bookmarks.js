import React, { useState, useEffect } from "react";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import BookDisplaySection from "../../components/DisplayContent/BookDisplaySection";
import Snackbar from "@mui/material/Snackbar";
import MuiButton from "@mui/material/Button";
import bookmarkManager from "../../utils/BookmarkManager";
import bookManager from "../../utils/BookManager";
import holdManager from "../../utils/HoldManager";
import AddToBookmark from "../../components/AddToBookmark/AddToBookmark";
import PutOnHold from "../../components/PutOnHold/PutOnHold";
import AddToCart from "../../components/AddToCart/AddToCart";
import "./profile-all-pages.css";

const Bookmarks = () => {
  const [bookmarkedData, setBookmarkedData] = useState([]);
  const [on_hold_books, setOnHoldBooks] = useState({});
  const [bookmarkedOnBooks, setBookmarkedOnBooks] = useState({});
  const books = JSON.parse(sessionStorage.getItem("books")) || {};
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [onHoldIds, setOnHoldIds] = useState([]);

  const refreshBookmarks = (onHoldIdsList) => {
    const bookmarked_books = bookmarkManager.getUserStoredBookmarks();
    const data = [];
    const bookmarkedOn = {};

    for (const id in bookmarked_books) {
      if (books[id]) {
        data.push({
          id,
          title: books[id].title,
          author: books[id].authors.join(", "),
          cover: books[id].cover,
          availability: books[id].availability,
          description: books[id].description,
          onHold: onHoldIdsList.includes(id),
        });
        bookmarkedOn[id] = bookmarked_books[id].bookmarked_on;
      }
    }
    setBookmarkedData(data);
    setBookmarkedOnBooks(bookmarkedOn);
  };

  useEffect(() => {
    const updatedHoldBooks = holdManager.getHolds();
    const onHoldIdsList = updatedHoldBooks.map((b) => b.id);
    setOnHoldIds(onHoldIdsList);
    setOnHoldBooks(
      updatedHoldBooks.reduce((acc, bookObj) => {
        acc[bookObj.id] = bookObj;
        return acc;
      }, {})
    );
    refreshBookmarks(onHoldIdsList);
  }, []);

  const customTextRenderer = (book) => (
    <div style={{ paddingBottom: "10px" }}>
      <p>
        <strong>Bookmarked on:</strong> {bookmarkedOnBooks[book.id]}
      </p>
    </div>
  );

  return (
    <div className="profile-page-container">
      <ProfileSidebar is_bookmark={true} />
      <div className="profile-page-content-container">
        <div className="profile-page-cards-container">
          {bookmarkedData && bookmarkedData.length > 0 ? (
            <BookDisplaySection
              title="Bookmarks"
              books={bookmarkedData}
              showAvailability={false}
              customTextRenderer={customTextRenderer}
              renderButtons={(book) => {
                const physicalCount = books[book.id]?.availability?.physical ?? 0;
                const digitalCount = books[book.id]?.availability?.digital ?? 0;

                return (
                  <div
                    className="card-button-container"
                    key={`buttons-${book.id}`}
                  >
                    {physicalCount === 0 && digitalCount === 0 ? (
                      <PutOnHold
                        bookId={book.id}
                        bookTitle={book.title}
                        initiallyOnHold={onHoldIds.includes(book.id)}
                        updateHoldList={() => {
                          const updated = holdManager.getHolds();
                          setOnHoldBooks(
                            updated.reduce((acc, bookObj) => {
                              acc[bookObj.id] = bookObj;
                              return acc;
                            }, {})
                          );
                          setOnHoldIds(updated.map((b) => b.id));
                        }}
                        setSnackbarMessage={setSnackbarMessage}
                        setSnackbarOpen={setSnackbarOpen}
                      />
                    ) : (
                      <>
                        <AddToCart
                          id={book.id}
                          type="physical"
                          onAddToCart={() => {
                            setSnackbarMessage(`You added a physical copy of "${book.title}" to your cart.`);
                            setSnackbarOpen(true);
                          }}
                        />
                        <AddToCart
                          id={book.id}
                          type="digital"
                          onAddToCart={() => {
                            setSnackbarMessage(`You added a digital copy of "${book.title}" to your cart.`);
                            setSnackbarOpen(true);
                          }}
                        />
                      </>
                    )}
                    <AddToBookmark
                      bookId={book.id}
                      bookTitle={book.title}
                      initiallyBookmarked={Object.keys(
                        bookmarkManager.getUserStoredBookmarks()
                      ).includes(book.id)}
                      updateBookmarks={() => {
                        refreshBookmarks(onHoldIds);
                        setSnackbarMessage(
                          `You removed "${book.title}" from your bookmarks.`
                        );
                        setSnackbarOpen(true);
                      }}
                      setSnackbarMessage={setSnackbarMessage}
                      setSnackbarOpen={setSnackbarOpen}
                    />
                  </div>
                );
              }}
            />
          ) : (
            <div>
              <h2 className="no-data-available">No Bookmarks Yet!</h2>
            </div>
          )}
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={8000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        ContentProps={{ className: "success-snackbar" }}
      />
    </div>
  );
};

export default Bookmarks;
