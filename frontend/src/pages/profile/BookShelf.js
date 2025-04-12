import React from "react";
import "./profile-all-pages.css";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import BookCard from "../../components/BookCard/BookCard";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import loanManager from "../../utils/LoanManager";
import bookManager from "../../utils/BookManager";
import BookDisplaySection from "../../components/DisplayContent/BookDisplaySection";

const BookShelf = () => {
  const navigate = useNavigate();
  const my_library_books_info = loanManager.getUserLoans();
  const all_books = bookManager.getAllBooks(); // result is an array of objects

  const my_library_books = my_library_books_info.map((book) => {
	const bookDetails = all_books.find((b) => Number(b.id) === Number(book.book_id));
	return {
	  ...book,
	  ...bookDetails,
	  author: bookDetails?.authors?.join(", ") || "Unknown Author",
	};
  });


  return (
    <div className="profile-page-container my-library-page">
      <ProfileSidebar is_my_library={true} />
      <div className="profile-page-content-container">
        <div className="profile-page-header">
        </div>
        <div className="profile-page-cards-container">
          {my_library_books && my_library_books.length > 0 ? (
            <BookDisplaySection
              title="My Library"
              books={my_library_books}
              showAvailability={false}
              customTextRenderer={(book) => (
                
                <div style={{ paddingBottom: "10px" }}>
                  <p>
                    <strong>Checked out:</strong> {book.checked_out_date}
                  </p>
                  <p>
                    <strong>Access Until:</strong> {book.return_date}
                  </p>
                </div>
              )}
              renderButtons={(book) => (
                <div className="card-button-container" key={`buttons-${book.book_id}`}>
                  {book.type === "physical" ? (
                    <p className="physical-copy-badge" title="This copy must be picked up at the library and cannot be read online.">
                      Physical Copy - In Library Only
                    </p>
                  ) : (
                    <Button
                      text={"Read this Book"}
                      borderRadius={"0"}
                      textColor={"white"}
                      backgroundColor={"#434EB4"}
                      onClick={() => navigate("/bookShelf/" + book.book_id)}
                    />
                  )}
                </div>
              )}
            />
          ) : (
            <div>
              <h2 className="no-data-available">No books available in your library.</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookShelf;


