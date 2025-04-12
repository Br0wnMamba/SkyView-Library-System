import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookDisplaySection from "../../components/DisplayContent/BookDisplaySection";
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

const History = () => {
  const userId = accountManager.getCardNumber();
  const [history_books, setHistoryBooks] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [onHoldIds, setOnHoldIds] = React.useState(holdManager.getHolds().map((b) => b.id));
  const [bookmarked_books, setBookmarkedBooks] = useState(bookmarkManager.getUserStoredBookmarks());
  
  const books = JSON.parse(sessionStorage.getItem("books")) || {};
  
  useEffect(() => {
    const allHistory = historyManager.getHistory();
    setHistoryBooks(allHistory);
  }, [userId]);
  
  const navigate = useNavigate();

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
        {history_books.length > 0 ? (
          <BookDisplaySection
            title="History"
            books={history_books
              .filter((record) => books[record.id])
              .map((record) => {
                return {
                  id: record.id,
                  title: books[record.id].title,
                  author: books[record.id].authors.join(", "),
                  cover: books[record.id].cover,
                  checked_out_date: record.checked_out_date,
                  returned_date: record.return_date,
                };
              })}
            renderButtons={(book) => {
              const physicalCount = books[book.id]?.availability?.physical ?? 0;
              const digitalAvailability = books[book.id]?.availability?.digital ?? 0;

              return (
                <div className="card-button-container">
                  {physicalCount > 0 || digitalAvailability > 0 ? (
                    <>
                      <AddToCart id={book.id} type="physical" />
                      <AddToCart id={book.id} type="digital" />
                    </>
                  ) : (
                    <PutOnHold
                      bookId={book.id}
                      bookTitle={book.title}
                      initiallyOnHold={onHoldIds.includes(book.id)}
                      updateHoldList={() =>
                        setOnHoldIds(holdManager.getHolds().map((b) => b.id))
                      }
                      setSnackbarMessage={setSnackbarMessage}
                      setSnackbarOpen={setSnackbarOpen}
                    />
                  )}
                  <AddToBookmark
                    bookId={book.id}
                    bookTitle={book.title}
                    initiallyBookmarked={Object.keys(bookmarked_books).includes(String(book.id))}
                    updateBookmarks={() =>
                      setBookmarkedBooks(bookmarkManager.getUserStoredBookmarks())
                    }
                    setSnackbarMessage={setSnackbarMessage}
                    setSnackbarOpen={setSnackbarOpen}
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
        ContentProps={{
          className: 'success-snackbar',
        }}
      />
    </div>
  );
};

export default History;