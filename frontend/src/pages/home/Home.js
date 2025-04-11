import React from "react";
import "./Home.css";
import AddToCart from "../../components/AddToCart/AddToCart";
import BookDisplaySection from "../../components/DisplayContent/BookDisplaySection";
import bookManager from "../../utils/BookManager";
import PutOnHold from "../../components/PutOnHold/PutOnHold";
import Snackbar from "@mui/material/Snackbar";
import holdManager from "../../utils/HoldManager";
import AddToBookmark from "../../components/AddToBookmark/AddToBookmark";
import bookmarkManager from "../../utils/BookmarkManager";
import MuiButton from "@mui/material/Button";
import { DisplayContent } from "../../data/DisplayContent";

const Home = () => {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [undoAction, setUndoAction] = React.useState(null); // { type: 'bookmark' | 'hold', id: string }
  const [onHoldIds, setOnHoldIds] = React.useState(
    holdManager.getUserHolds().map((b) => b.id)
  );
  const [bookmarkedIds, setBookmarkedIds] = React.useState(
    Object.keys(bookmarkManager.getUserStoredBookmarks())
  );

  const handleUndo = () => {
    if (undoAction?.type === "bookmark" && undoAction?.state === "remove") {
      console.log("Undoing bookmark removal (adding it back)");
      const id = undoAction.id;
      bookmarkManager.removeBookmark(id);
      setBookmarkedIds(Object.keys(bookmarkManager.getUserStoredBookmarks()));
      setSnackbarMessage(
        `You removed "${bookManager.getBook(id)?.name}" from your bookmarks.`
      );
      setUndoAction(null);
      setSnackbarOpen(false);
    } else if (undoAction?.type === "bookmark" && undoAction?.state === "add") {
      console.log("Undoing bookmark addition (removing it)");
      const id = undoAction.id;
      bookmarkManager.addBookmark(id);
      setBookmarkedIds(Object.keys(bookmarkManager.getUserStoredBookmarks()));
      setSnackbarMessage(
        `You added "${bookManager.getBook(id)?.name}" to your bookmarks.`
      );
      setUndoAction(null);
      setSnackbarOpen(false);
    } else if (undoAction?.type === "hold" && undoAction?.state === "remove") {
      console.log("Undoing hold removal (adding it back)");
      const id = undoAction.id;
      holdManager.remove(id);
      setOnHoldIds(holdManager.getUserHolds());
      setSnackbarMessage(
        `You removed your hold on "${bookManager.getBook(id)?.name}".`
      );
      setUndoAction(null);
      setSnackbarOpen(false);
    } else if (undoAction?.type === "hold" && undoAction?.state === "add") {
      console.log("Undoing hold addition (removing it)");
      const id = undoAction.id;
      holdManager.add(id);
      const updated = holdManager.getUserHolds();
      setOnHoldIds(updated.map((b) => b.id));
      setSnackbarMessage(
        `You placed a hold on "${bookManager.getBook(id)?.name}".`
      );
      setUndoAction(null);
      setSnackbarOpen(false);
    }
  };

  return (
    <section className="homepage-container">
      {DisplayContent.map((section, sectionIndex) => (
        <BookDisplaySection
          key={sectionIndex}
          title={section.title}
          books={section.books}
          renderButtons={(book) => {
            const physicalCount = book.physical ?? 0;
            const digitalAvailability = book.digital ?? false;

            return (
              <div className="home-addtocart-container">
                {physicalCount > 0 || digitalAvailability ? (
                  <>
                    <AddToCart type="physical" count={physicalCount} />
                    <AddToCart type="digital" ebook={digitalAvailability} />
                  </>
                ) : (
                  <PutOnHold
                    bookId={book.id}
                    bookTitle={book.title}
                    initiallyOnHold={onHoldIds.includes(book.id)}
                    updateHoldList={() =>
                      setOnHoldIds(holdManager.getUserHolds().map((b) => b.id))
                    }
                    setSnackbarMessage={setSnackbarMessage}
                    setSnackbarOpen={setSnackbarOpen}
                    setUndoAction={(action) => setUndoAction(action)}
                  />
                )}
                <AddToBookmark
                  bookId={book.id}
                  bookTitle={book.title}
                  initiallyBookmarked={bookmarkedIds.includes(book.id)}
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
            );
          }}
          showAvailability={true}
        />
      ))}
      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        autoHideDuration={8000}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        message={snackbarMessage}
        action={
          <MuiButton
            size="small"
            onClick={handleUndo}
            className="snackbar-undo-button"
          >
            Undo
          </MuiButton>
        }
        ContentProps={{
          className: "success-snackbar",
        }}
      />
    </section>
  );
};

export default Home;
