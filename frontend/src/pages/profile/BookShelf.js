import React from "react";
import "./profile-all-pages.css";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import bookImages from "../../utils/loadBookImages";
import Button from "../../components/Button/Button";
import BookDisplaySection from "../../components/DisplayContent/BookDisplaySection";
import { useNavigate } from "react-router-dom";
import loanManager from "../../utils/LoanManager";

const BookShelf = () => {
  const navigate = useNavigate();
  const my_library = loanManager.getUserLoans() || [];
  const books = JSON.parse(sessionStorage.getItem("books")) || {};
  const my_library_books = {};
  my_library.forEach((loan) => {
    const bookData = books[loan.id];
    if (bookData) {
      my_library_books[loan.id] = {
        ...loan,
        ...bookData,
      };
    }
  });

  const customTextRenderer = (book) => (
    <div style={{ paddingBottom: "10px" }}>
      <p><strong>Checked out on:</strong> {my_library_books[book.id].checked_out_date}</p>
      <p><strong>Due on:</strong> {my_library_books[book.id].return_date}</p>
    </div>
  );

  return (
    <div className="profile-page-container">
      <ProfileSidebar is_my_library={true} />
      <div className="profile-page-content-container">
        <div className="profile-page-header"></div>
        <BookDisplaySection
          title="My Library"
          books={Object.keys(my_library_books).map((id) => ({
            id,
            title: my_library_books[id].name,
            author: my_library_books[id].authors?.join(", "),
            cover: bookImages[id],
            availability: [
              my_library_books[id].is_physical ? 1 : 0,
              my_library_books[id].is_physical ? "n" : "y",
            ],
          }))}
          renderButtons={(book) => (
            <div className="card-button-container">
              {my_library_books[book.id].is_physical === true ? (
                <p>Physical Copy</p>
              ) : (
                <Button
                  text={"Read this Book"}
                  borderRadius={"0"}
                  textColor={"white"}
                  backgroundColor={"#434EB4"}
                  onClick={() => navigate("bookShelf/" + book.id)}
                />
              )}
              
            </div>
          )}
          customTextRenderer={customTextRenderer}
          showAvailability={false}
        />
      </div>
    </div>
  );
};

export default BookShelf;
