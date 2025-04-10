import React, { useState, useEffect } from "react";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import BookDisplaySection from "../../components/DisplayContent/BookDisplaySection";
import Snackbar from "@mui/material/Snackbar";
import MuiButton from "@mui/material/Button";
import bookmarkManager from "../../utils/BookmarkManager";
import bookManager from "../../utils/BookManager";
import holdManager from "../../utils/HoldManager";
import bookImages from "../../utils/loadBookImages";
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
  const [removedBookmarkId, setRemovedBookmarkId] = useState(null);
  const [onHoldIds, setOnHoldIds] = useState([]);
  const [undoAction, setUndoAction] = useState(null);
  

  const refreshBookmarks = (onHoldIdsList) => {
    const bookmarked_books = bookmarkManager.getUserStoredBookmarks();
    const data = [];
    const bookmarkedOn = {};

    for (const id in bookmarked_books) {
      if (books[id]) {
        data.push({
          id,
          title: books[id].name,
          author: books[id].authors.join(", "),
          cover: bookImages[id],
          onHold: onHoldIdsList.includes(id),
        });
        bookmarkedOn[id] = bookmarked_books[id].bookmarked_on;
      }
    }
    setBookmarkedData(data);
    setBookmarkedOnBooks(bookmarkedOn);
  };

  useEffect(() => {
    const updatedHoldBooks = holdManager.getUserHolds();
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

  const handleUndo = () => {
    if (removedBookmarkId) {
      bookmarkManager.addBookmark(removedBookmarkId);
      refreshBookmarks(onHoldIds);
      setSnackbarMessage(
        `You re-added "${
          bookManager.getBook(removedBookmarkId)?.name
        }" to your bookmarks.`
      );
      setSnackbarOpen(false);
      setRemovedBookmarkId(null);
    } else if (undoAction?.type === "hold" && undoAction?.state === "remove") {
      holdManager.remove(undoAction.id);
      const updated = holdManager.getUserHolds();
      setOnHoldBooks(
        updated.reduce((acc, bookObj) => {
          acc[bookObj.id] = bookObj;
          return acc;
        }, {})
      );
      setOnHoldIds(updated.map((b) => b.id));
      refreshBookmarks(updated.map((b) => b.id));
      const bookName = bookManager.getBook(undoAction.id)?.name;
      setSnackbarMessage(`You removed your hold on "${bookName}".`);
      setSnackbarOpen(false);
      setUndoAction(null);
    } else if (undoAction?.type === "hold" && undoAction?.state === "add") {
      holdManager.add(undoAction.id);
      const updated = holdManager.getUserHolds();
      setOnHoldBooks(
        updated.reduce((acc, bookObj) => {
          acc[bookObj.id] = bookObj;
          return acc;
        }, {})
      );
      setOnHoldIds(updated.map((b) => b.id));
      refreshBookmarks(updated.map((b) => b.id));
      const bookName = bookManager.getBook(undoAction.id)?.name;
      setSnackbarMessage(`You added a hold on "${bookName}".`);
      setSnackbarOpen(false);
      setUndoAction(null);
    }
  };

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
                const physicalCount =
                  books[book.id]?.number_of_physical_copies_available;
                const isEbookAvailable = books[book.id]?.is_ebook_available;

                return (
                  <div
                    className="card-button-container"
                    key={`buttons-${book.id}`}
                  >
                    {physicalCount === 0 && !isEbookAvailable ? (
                      <PutOnHold
                        bookId={book.id}
                        bookTitle={book.title}
                        initiallyOnHold={onHoldIds.includes(book.id)}
                        updateHoldList={() => {
                          const updated = holdManager.getUserHolds();
                          setOnHoldBooks(
                            updated.reduce((acc, bookObj) => {
                              acc[bookObj.id] = bookObj;
                              return acc;
                            }, {})
                          );
                          setOnHoldIds(updated.map((b) => b.id));
                          setSnackbarMessage(
                            `You placed "${book.title}" on hold.`
                          );
                          setSnackbarOpen(true);
                        }}
                        setSnackbarMessage={setSnackbarMessage}
                        setSnackbarOpen={setSnackbarOpen}
                        setUndoAction={(action) => setUndoAction(action)}
                      />
                    ) : (
                      <>
                        <AddToCart type="physical" count={physicalCount} />
                        <AddToCart type="digital" ebook={isEbookAvailable} />
                      </>
                    )}
                    <AddToBookmark
                      bookId={book.id}
                      bookTitle={book.title}
                      initiallyBookmarked={Object.keys(
                        bookmarkManager.getUserStoredBookmarks()
                      ).includes(book.id)}
                      updateBookmarks={() => {
                        setRemovedBookmarkId(book.id);
                        setBookmarkedData((prev) =>
                          prev.filter((b) => b.id !== book.id)
                        );
                        setSnackbarMessage(
                          `You removed "${book.title}" from your bookmarks.`
                        );
                        setSnackbarOpen(true);
                      }}
                      setSnackbarMessage={setSnackbarMessage}
                      setSnackbarOpen={setSnackbarOpen}
                      setUndoAction={(action) =>
                        setRemovedBookmarkId(action.id)
                      }
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
        action={
          <MuiButton
            size="small"
            onClick={handleUndo}
            className="snackbar-undo-button"
          >
            Undo
          </MuiButton>
        }
      />
    </div>
  );
};

export default Bookmarks;
