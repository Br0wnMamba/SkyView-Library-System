import React from "react";
import "./profile-all-pages.css";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import BookCard from "../../components/BookCard/BookCard";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import accountManager from "../../utils/AccountManager";

const BookShelf = () => {
  const navigate = useNavigate();
  const userId = accountManager.getCardNumber();
  const my_library_all_users = JSON.parse(sessionStorage.getItem("my_library")) || {};
  const my_library = my_library_all_users[userId] || {};
  const books = JSON.parse(sessionStorage.getItem("books")) || {};
  const my_library_book_ids = Object.keys(my_library);
  const my_library_books = {};

  my_library_book_ids.forEach((id) => {
    if (books[id]) {
      my_library_books[id] = {
        ...my_library[id],
        ...books[id],
      };
    }
  });

  return (
    <div className="profile-page-container">
      <ProfileSidebar is_my_library={true} />
      <div className="profile-page-content-container">
        <div className="profile-page-header">
          <h1 className="profile-page-header-text">My Library</h1>
        </div>
        <div className="profile-page-cards-container">
          {my_library_books && Object.keys(my_library_books).length > 0 ? (
            Object.keys(my_library_books).map((id) => (
              <BookCard
                key={id}
                id={id}
                name={my_library_books[id].name}
                authors={my_library_books[id].authors}
                first_line={
                  "Checked out: " + my_library_books[id].checked_out_date
                }
                second_line={
                  "Access Until: " + my_library_books[id].return_date
                }
                ButtonComponent={() => (
                  <div className="card-button-container">
                    {my_library_books[id].is_physical === true ? (
                      <p>Physical Copy</p>
                    ) : (
                      <Button
                        text={"Read this Book"}
                        borderRadius={"0"}
                        textColor={"white"}
                        backgroundColor={"#434EB4"}
                        onClick={() => navigate("bookShelf/" + id)}
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
