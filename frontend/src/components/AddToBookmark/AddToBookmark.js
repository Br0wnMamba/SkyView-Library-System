import React, { useState, useEffect } from "react";
import bookmarkManager from "../../utils/BookmarkManager";
import "./AddToBookmark.css";

const AddToBookmark = ({
  bookId,
  bookTitle,
  initiallyBookmarked,
  updateBookmarks,
  setSnackbarMessage,
  setSnackbarOpen,
  setUndoAction
}) => {
  const [bookmarked, setBookmarked] = useState(initiallyBookmarked);

  useEffect(() => {
    setBookmarked(initiallyBookmarked);
  }, [initiallyBookmarked]);

  const handleAddBookmark = () => {
    bookmarkManager.addBookmark(bookId);
    updateBookmarks();
    setBookmarked(true);
    setSnackbarMessage(`You added "${bookTitle}" to your bookmarks.`);
    setUndoAction({ type: 'bookmark', state:"remove" ,id: bookId });
    setSnackbarOpen(true);
  };

  const handleRemoveBookmark = () => {
    bookmarkManager.removeBookmark(bookId);
    updateBookmarks();
    setBookmarked(false);
    setSnackbarMessage(`You removed "${bookTitle}" from your bookmarks.`);
    setUndoAction({ type: 'bookmark', state:"add" ,id: bookId });
    setSnackbarOpen(true);
  };

  const handleClick = () => {
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