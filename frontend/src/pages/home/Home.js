import React from "react";
import "./Home.css";
import AddToCart from "../../components/AddToCart/AddToCart";
import BookDisplaySection from "../../components/DisplayContent/BookDisplaySection";
import bookImages from "../../utils/loadBookImages";
import bookManager from "../../utils/BookManager";
import PutOnHold from "../../components/PutOnHold/PutOnHold";
import Snackbar from "@mui/material/Snackbar";
import holdManager from "../../utils/HoldManager";
import AddToBookmark from "../../components/AddToBookmark/AddToBookmark";
import bookmarkManager from "../../utils/BookmarkManager";
import MuiButton from "@mui/material/Button";

const DisplayContent = [
  {
    title: "Recently Added",
    books: [
      {
        id: "book-101",
        title: bookManager.getBook("book-101").name,
        author: bookManager.getBook("book-101").authors[0],
        cover: bookImages["book-101"],
        physical:
          bookManager.getBook("book-101").number_of_physical_copies_available,
        digital: bookManager.getBook("book-101").is_ebook_available,
      },
      {
        id: "book-102",
        title: bookManager.getBook("book-102").name,
        author: bookManager.getBook("book-102").authors[0],
        cover: bookImages["book-102"],
        physical:
          bookManager.getBook("book-102").number_of_physical_copies_available,
        digital: bookManager.getBook("book-102").is_ebook_available,
      },
      {
        id: "book-103",
        title: bookManager.getBook("book-103").name,
        author: bookManager.getBook("book-103").authors[0],
        cover: bookImages["book-103"],
        physical:
          bookManager.getBook("book-103").number_of_physical_copies_available,
        digital: bookManager.getBook("book-103").is_ebook_available,
      },
      {
        id: "book-104",
        title: bookManager.getBook("book-104").name,
        author: bookManager.getBook("book-104").authors[0],
        cover: bookImages["book-104"],
        physical:
          bookManager.getBook("book-104").number_of_physical_copies_available,
      },
    ],
  },
  {
    title: "Top Picks",
    books: [
      {
        id: "book-105",
        title: bookManager.getBook("book-105").name,
        author: bookManager.getBook("book-105").authors[0],
        cover: bookImages["book-105"],
        physical:
          bookManager.getBook("book-105").number_of_physical_copies_available,
        digital: bookManager.getBook("book-105").is_ebook_available,
      },
      {
        id: "book-106",
        title: bookManager.getBook("book-106").name,
        author: bookManager.getBook("book-106").authors[0],
        cover: bookImages["book-106"],
        physical:
          bookManager.getBook("book-106").number_of_physical_copies_available,
        digital: bookManager.getBook("book-106").is_ebook_available,
      },
      {
        id: "book-107",
        title: bookManager.getBook("book-107").name,
        author: bookManager.getBook("book-107").authors[0],
        cover: bookImages["book-107"],
        physical:
          bookManager.getBook("book-107").number_of_physical_copies_available,
        digital: bookManager.getBook("book-107").is_ebook_available,
      },
      {
        id: "book-108",
        title: bookManager.getBook("book-108").name,
        author: bookManager.getBook("book-108").authors[0],
        cover: bookImages["book-108"],
        physical:
          bookManager.getBook("book-108").number_of_physical_copies_available,
        digital: bookManager.getBook("book-108").is_ebook_available,
      },
    ],
  },
  {
    title: "Staff Picks",
    books: [
      {
        id: "book-109",
        title: bookManager.getBook("book-109").name,
        author: bookManager.getBook("book-109").authors[0],
        cover: bookImages["book-109"],
        physical:
          bookManager.getBook("book-109").number_of_physical_copies_available,
        digital: bookManager.getBook("book-107").is_ebook_available,
      },
      {
        id: "book-110",
        title: bookManager.getBook("book-110").name,
        author: bookManager.getBook("book-110").authors[0],
        cover: bookImages["book-110"],
        physical:
          bookManager.getBook("book-110").number_of_physical_copies_available,
        digital: bookManager.getBook("book-110").is_ebook_available,
      },

      {
        id: "book-111",
        title: bookManager.getBook("book-111").name,
        author: bookManager.getBook("book-111").authors[0],
        cover: bookImages["book-111"],
        physical:
          bookManager.getBook("book-111").number_of_physical_copies_available,
        digital: bookManager.getBook("book-111").is_ebook_available,
      },
      {
        id: "book-112",
        title: bookManager.getBook("book-112").name,
        author: bookManager.getBook("book-112").authors[0],
        cover: bookImages["book-112"],
        physical:
          bookManager.getBook("book-112").number_of_physical_copies_available,
        digital: bookManager.getBook("book-112").is_ebook_available,
      },
    ],
  },
  {
    title: "Award Winners",
    books: [
      {
        id: "book-113",
        title: bookManager.getBook("book-113").name,
        author: bookManager.getBook("book-113").authors[0],
        cover: bookImages["book-113"],
        physical:
          bookManager.getBook("book-113").number_of_physical_copies_available,
        digital: bookManager.getBook("book-113").is_ebook_available,
      },
      {
        id: "book-114",
        title: bookManager.getBook("book-114").name,
        author: bookManager.getBook("book-114").authors[0],
        cover: bookImages["book-114"],
        physical:
          bookManager.getBook("book-114").number_of_physical_copies_available,
        digital: bookManager.getBook("book-114").is_ebook_available,
      },
      {
        id: "book-115",
        title: bookManager.getBook("book-115").name,
        author: bookManager.getBook("book-115").authors[0],
        cover: bookImages["book-115"],
        physical:
          bookManager.getBook("book-115").number_of_physical_copies_available,
        digital: bookManager.getBook("book-115").is_ebook_available,
      },
      {
        id: "book-116",
        title: bookManager.getBook("book-116").name,
        author: bookManager.getBook("book-116").authors[0],
        cover: bookImages["book-116"],
        physical:
          bookManager.getBook("book-116").number_of_physical_copies_available,
        digital: bookManager.getBook("book-116").is_ebook_available,
      }
    ],
  },
  {
    title: "Trending Now",
    books: [
      {
        id: "book-117",
        title: bookManager.getBook("book-117").name,
        author: bookManager.getBook("book-117").authors[0],
        cover: bookImages["book-117"],
        physical:
          bookManager.getBook("book-117").number_of_physical_copies_available,
        digital: bookManager.getBook("book-117").is_ebook_available,
      
      },
      {
        id: "book-118",
        title: bookManager.getBook("book-118").name,
        author: bookManager.getBook("book-118").authors[0],
        cover: bookImages["book-118"],
        physical:
          bookManager.getBook("book-118").number_of_physical_copies_available,
        digital: bookManager.getBook("book-118").is_ebook_available,
      },
      {
        id: "book-119",
        title: bookManager.getBook("book-119").name,
        author: bookManager.getBook("book-119").authors[0],
        cover: bookImages["book-119"],
        physical:
          bookManager.getBook("book-119").number_of_physical_copies_available,
        digital: bookManager.getBook("book-119").is_ebook_available,
      },
      {
        id: "book-120",
        title: bookManager.getBook("book-120").name,
        author: bookManager.getBook("book-120").authors[0],
        cover: bookImages["book-120"],
        physical:
          bookManager.getBook("book-120").number_of_physical_copies_available,
        digital: bookManager.getBook("book-120").is_ebook_available,
      }
    ]
  }
];

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
