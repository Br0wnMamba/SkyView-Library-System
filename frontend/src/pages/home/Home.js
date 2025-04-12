import React from "react";
import "./Home.css";
import { DisplayContent } from "../../data/book";
import AddToCart from "../../components/AddToCart/AddToCart";
import { IoMdPhonePortrait } from "react-icons/io";
import { FaBook } from "react-icons/fa";
import bookManager from "../../utils/BookManager";
import holdManager from "../../utils/HoldManager";
import bookmarkManager from "../../utils/BookmarkManager";
import PutOnHold from "../../components/PutOnHold/PutOnHold";
import accountManager from "../../utils/AccountManager";
import BookDisplaySection from "../../components/DisplayContent/BookDisplaySection";
import MuiButton from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import AddToBookMark from "../../components/AddToBookmark/AddToBookmark";

const Home = () => {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const userId = accountManager.getCardNumber();
  const [onHoldIds, setOnHoldIds] = React.useState([
    ...(holdManager.getHolds()[userId] || []).map((b) => b.id),
  ]);
  const [bookmarkedIds, setBookmarkedIds] = React.useState(
    Object.keys(bookmarkManager.getUserStoredBookmarks())
  );

  return (
    <section className="homepage-container">
      {DisplayContent.map((section, sectionIndex) => (
        <BookDisplaySection
          key={sectionIndex}
          title={section.title}
          books={section.books.map((bookId) => bookManager.getBook(bookId))}
          renderButtons={(book) => {
            const physicalCount = book.availability.physical ?? 0;
            const digitalAvailability = book.availability.digital ?? false;

            return (
              <div className="home-addtocart-container">
                {physicalCount > 0 || digitalAvailability ? (
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
                      setOnHoldIds([
                        ...(holdManager.getHolds()[userId] || []).map(
                          (b) => b.id
                        ),
                      ])
                    }
                    setSnackbarMessage={setSnackbarMessage}
                    setSnackbarOpen={setSnackbarOpen}
                  />
                )}
                <AddToBookMark
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
        ContentProps={{
          className: "success-snackbar",
        }}
      />
    </section>
  );
};

export default Home;