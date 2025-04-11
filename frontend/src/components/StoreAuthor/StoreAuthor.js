import React, { useState, useEffect } from 'react';
import savedAuthorsManager from '../../utils/SavedAuthorsManager';
import './StoreAuthor.css';

const StoreAuthor = ({
  author,
  initiallySaved,
  updateSavedList,
  setSnackbarMessage,
  setSnackbarOpen,
  setUndoAction
}) => {
  const [saved, setSaved] = useState(initiallySaved);

  useEffect(() => {
    setSaved(initiallySaved);
  }, [initiallySaved]);

  const handleSave = () => {
    savedAuthorsManager.addAuthor(author);
    updateSavedList(savedAuthorsManager.getUserStoredAuthors());
    setSaved(true);
    setSnackbarMessage(`You saved "${author}".`);
    setUndoAction({ type: 'author', state: 'remove', id: author });
    setSnackbarOpen(true);
  };

  const handleRemoveAuthor = () => {
    savedAuthorsManager.removeAuthor(author);
    updateSavedList(savedAuthorsManager.getUserStoredAuthors());
    setSaved(false);
    setSnackbarMessage(`You removed "${author}" from your saved authors.`);
    setUndoAction({ type: 'author', state: 'add', id: author });
    setSnackbarOpen(true);
  };

  const handleClick = () => {
    if (saved) {
      handleRemoveAuthor();
    } else {
      handleSave();
    }
  };

  return (
    <div className="store-author-container">
      {saved ? (
        <button className="store-author-button" onClick={handleClick}>
          Remove Author
        </button>
      ) : (
        <button className="store-author-button" onClick={handleClick}>
          Save Author
        </button>
      )}
    </div>
  );
};

export default StoreAuthor;
