import React from "react";
import "./profile-all-pages.css";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import BookCard from "../../components/BookCard/BookCard";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import loanManager from "../../utils/LoanManager";
import bookManager from "../../utils/BookManager";

const BookShelf = () => {
  const navigate = useNavigate();
  const my_library_books_info = loanManager.getUserLoans();
  const all_books = bookManager.getAllBooks(); // result is an array of objects

  const my_library_books = my_library_books_info.map((book) => {
	const bookDetails = all_books.find((b) => Number(b.id) === Number(book.book_id));
	return {
	  ...book,
	  ...bookDetails,
	};
  });


  return (
    <div className="profile-page-container">
      <ProfileSidebar is_my_library={true} />
      <div className="profile-page-content-container">
        <div className="profile-page-header">
          <h1 className="profile-page-header-text">My Library</h1>
        </div>
        <div className="profile-page-cards-container">
          {my_library_books && my_library_books.length > 0 ? (
            my_library_books.map((book) => (
              <BookCard
                key={book.book_id}
                id={book.book_id}
                name={book.title}
                authors={book.authors}
                first_line={
                  "Checked out: " + book.checked_out_date
                }
                second_line={
                  "Access Until: " + book.return_date
                }
                ButtonComponent={() => (
                  <div className="card-button-container">
                    {book.type === "physical" ? (
                      <p>Physical Copy</p>
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
            ))
          ) : (
			<div>
				<h2 className="no-data-available">No books available in your library.!!!</h2>
			</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookShelf;
