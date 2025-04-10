import React, { useState } from "react";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import BookCard from "../../components/BookCard/BookCard";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import "./profile-all-pages.css";
import bookManager from "../../utils/BookManager";
import bookmarkManager from "../../utils/BookmarkManager";
import holdManager from "../../utils/HoldManager";
import historyManager from "../../utils/HistoryManager";

const History = () => {
  const historyBooksInfo = historyManager.getHistory();
  const on_hold_books = holdManager.getHolds();
  const books = bookManager.getAllBooks();
  const [bookmarked_books, setBookmarkedBooks] = useState(bookmarkManager.getAllBookmarks());
  const navigate = useNavigate();

  const history_books = historyBooksInfo.map((book) => {
	const bookDetails = books.find((b) => Number(b.id) === Number(book.book_id));
	return {
	  ...book,
	  ...bookDetails,
	};
  });

  const handleAddBookmark = (book_id) => {
	bookmarkManager.addBookmark(book_id);
	setBookmarkedBooks(bookmarkManager.getAllBookmarks());
  };

  const handleRemoveBookmark = (book_id) => {
	bookmarkManager.removeBookmark(book_id);
	setBookmarkedBooks(bookmarkManager.getAllBookmarks());
  };

  return (
    <div className="profile-page-container">
      <ProfileSidebar is_history={true} />
      <div className="profile-page-content-container">
        <div className="profile-page-header">
          <h1 className="profile-page-header-text">History</h1>
        </div>
        <div className="profile-page-cards-container">
          {history_books && history_books.length > 0 ? (
            history_books.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                authors={book.authors}
                first_line={`Checked out: ${book.checked_out_date}`}
                second_line={`Returned on: ${book.return_date}`}
                name={book.title}
                ButtonComponent={() => (
                  <div className="card-button-container">
                    {on_hold_books && on_hold_books.length > 0 && on_hold_books.some((holdBook) => Number(holdBook.id) === Number(book.id)) ? (
                      <Button
                        text={"On Hold"}
                        textColor={"white"}
                        backgroundColor={"#D0BD67"}
                        borderRadius={"0px"}
                        padding={"10px 20px"}
                        fontSize={"16px"}
                        onClick={() => navigate("/onHold")}
                      />
                    ) : (
                      <Button
                        text={"Add to Cart"}
                        onClick={() => navigate(`/book/${book.id}`)}
                        textColor={"white"}
                        backgroundColor={"#43B447"}
                        borderRadius={"0px"}
                        padding={"10px 20px"}
                        fontSize={"16px"}
                      />
                    )}
                    {bookmarked_books &&
                    bookmarked_books.includes(book.id) ? (
                      <Button
                        text={"Remove Bookmark"}
                        onClick={() => handleRemoveBookmark(book.id)}
                        textColor={"white"}
                        borderRadius={"0px"}
                        padding={"10px 20px"}
                        fontSize={"16px"}
                      />
                    ) : (
                      <Button
                        text={"Bookmark"}
                        onClick={() => handleAddBookmark(book.id)}
                        textColor={"white"}
                        borderRadius={"0px"}
                        padding={"10px 20px"}
                        fontSize={"16px"}
                      />
                    )}
                  </div>
                )}
              />
            ))
          ) : (
            <div>
              <h2 className="no-data-available">No History Available!!!</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
