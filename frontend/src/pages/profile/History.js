import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookDisplaySection from "../../components/DisplayContent/BookDisplaySection";
import bookImages from "../../utils/loadBookImages";
import bookmarkManager from "../../utils/BookmarkManager";
import holdManager from "../../utils/HoldManager";
import historyManager from "../../utils/HistoryManager";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import "./profile-all-pages.css";
import MuiButton from "@mui/material/Button";
import accountManager from "../../utils/AccountManager";
import Snackbar from "@mui/material/Snackbar";
import AddToBookmark from "../../components/AddToBookmark/AddToBookmark";
import PutOnHold from "../../components/PutOnHold/PutOnHold";
import AddToCart from "../../components/AddToCart/AddToCart";
import bookManager from "../../utils/BookManager";
import accountManager from "../../utils/AccountManager";

const History = () => {
  const userId = accountManager.getCardNumber();
  const [history_books, setHistoryBooks] = useState({});
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [undoAction, setUndoAction] = React.useState(null); // { type: 'bookmark' | 'hold', id: string }
  const [onHoldIds, setOnHoldIds] = React.useState(holdManager.getUserHolds().map((b) => b.id));
  const [bookmarkedIds, setBookmarkedIds] = React.useState(Object.keys(bookmarkManager.getUserStoredBookmarks()));
  
  const books = JSON.parse(sessionStorage.getItem("books")) || {};
  
  useEffect(() => {
    setHistoryBooks(historyManager.getUserHistory().reduce((acc, bookObj) => {
      const id = Object.keys(bookObj)[0];
      acc[id] = bookObj[id];
      return acc;
    }, {}));
  }, []);
  
  const navigate = useNavigate();

  const handleUndo = () => {
    if (undoAction?.type === 'bookmark') {
      const id = undoAction.id;
      bookmarkManager.removeBookmark(id);
      setBookmarkedIds(Object.keys(bookmarkManager.getUserStoredBookmarks()));
      setSnackbarMessage(`You removed "${bookManager.getBook(id)?.name}" from your bookmarks.`);
      setUndoAction(null);
      setSnackbarOpen(false);
    } else if (undoAction?.type === 'hold') {
      const id = undoAction.id;
      holdManager.remove(id);
      setOnHoldIds(holdManager.getUserHolds().map((b) => b.id));
      setSnackbarMessage(`You removed your hold on "${bookManager.getBook(id)?.name}".`);
      setUndoAction(null);
      setSnackbarOpen(false);
    }
  };

  const customTextRenderer = (book) => (
    <div style={{ paddingBottom: "10px" }}>
      <p>
        <strong>Checked out:</strong> {book.checked_out_date}
      </p>
      <p>
        <strong>Returned on:</strong> {book.returned_date}
      </p>
    </div>
  );

  return (
    <div className="profile-page-container">
      <ProfileSidebar is_history={true} />
      <div className="profile-page-content-container">
        {Object.keys(history_books).length > 0 ? (
          <BookDisplaySection
            title="History"
            books={Object.entries(history_books)
              .filter(([id, record]) => {
                const exists = books[id];
                return exists;
              })
              .map(([id, record]) => {
                return {
                  id,
                  title: books[id].name,
                  author: books[id].authors.join(", "),
                  cover: bookImages[id],
                  checked_out_date: record.checked_out_date,
                  returned_date: record.returned_date,
                };
              })}
            renderButtons={(book) => {
              const physicalCount = books[book.id]?.number_of_physical_copies_available ?? 0;
              const isEbookAvailable = books[book.id]?.is_ebook_available ?? false;

              return (
                <div className="card-button-container">
                  {physicalCount > 0 || isEbookAvailable ? (
                    <>
                      <AddToCart type="physical" count={physicalCount} />
                      <AddToCart type="digital" ebook={isEbookAvailable} />
                    </>
                  ) : (
                    <PutOnHold
                    bookId={book.id}
                    bookTitle={book.title}
                    initiallyOnHold={onHoldIds.includes(book.id)}
                    updateHoldList={() => setOnHoldIds(holdManager.getUserHolds().map((b) => b.id))}
                    setSnackbarMessage={setSnackbarMessage}
                    setSnackbarOpen={setSnackbarOpen}
                    setUndoAction={setUndoAction}
                    />
                  )}
                  <AddToBookmark
                    bookId={book.id}
                    bookTitle={book.title}
                    initiallyBookmarked={bookmarkedIds.includes(book.id)}
                    updateBookmarks={() =>
                      setBookmarkedIds(Object.keys(bookmarkManager.getUserStoredBookmarks()))
                    }
                    setSnackbarMessage={setSnackbarMessage}
                    setSnackbarOpen={setSnackbarOpen}
                    setUndoAction={setUndoAction}
                  />
                </div>
              );
            }}
            customTextRenderer={customTextRenderer}
            showAvailability={false}
          />
        ) : (
          <div>
            <h2 className="no-data-available">No History Available!!!</h2>
          </div>
        )}
      </div>
      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        autoHideDuration={8000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        message={snackbarMessage}
        action={
          <MuiButton size="small" onClick={handleUndo} className="snackbar-undo-button">
            Undo
          </MuiButton>
        }
        ContentProps={{
          className: 'success-snackbar',
        }}
      />
    </div>
  );
};

export default History;
