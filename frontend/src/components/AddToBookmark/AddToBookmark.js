import React, { useState, useEffect } from "react";
import bookmarkManager from "../../utils/BookmarkManager";
import "./AddToBookmark.css";
import accountManager from "../../utils/AccountManager";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AddToBookmark = ({
  bookId,
  bookTitle,
  initiallyBookmarked,
  updateBookmarks,
  setSnackbarMessage,
  setSnackbarOpen
}) => {
  const [bookmarked, setBookmarked] = useState(initiallyBookmarked);
  const navigate = useNavigate();
  const user = accountManager.getUser();
  const location = useLocation();
  useEffect(() => {
    setBookmarked(initiallyBookmarked);
  }, [initiallyBookmarked]);

  const handleAddBookmark = () => {
    const response = bookmarkManager.addBookmark(bookId);
    if (response.status === 200) {
      updateBookmarks();
      setBookmarked(true);
      setSnackbarMessage(`You added "${bookTitle}" to your bookmarks.`);
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage(response.message);
      setSnackbarOpen(true);
    }
  };

  const handleRemoveBookmark = () => {
    const response = bookmarkManager.removeBookmark(bookId);
    if (response.status === 200) {
      updateBookmarks();
      setBookmarked(false);
      setSnackbarMessage(`You removed "${bookTitle}" from your bookmarks.`);
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage(response.message);
      setSnackbarOpen(true);
    }
  };

  const handleClick = () => {
    if (!user) {
      navigate("/login", { state: { backgroundLocation: location.pathname } });
      return;
    }
    if (bookmarked) {
      handleRemoveBookmark();
    } else {
      handleAddBookmark();
    }
  };

  return (
    <div className="bookmark-container">
      {bookmarked ? (
        <button className="bookmark-button" onClick={handleClick}>
          Remove Bookmark
        </button>
      ) : (
        <button className="bookmark-button" onClick={handleClick}>
          Add Bookmark
        </button>
      )}
    </div>
  );
};

export default AddToBookmark;