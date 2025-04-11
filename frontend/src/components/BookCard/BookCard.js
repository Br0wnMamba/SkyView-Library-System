import React from "react";
import "./BookCard.css";
import { useNavigate } from "react-router-dom";
import bookManager from "../../utils/BookManager";

const BookCard = ({
  name,
  authors,
  first_line,
  second_line,
  ButtonComponent,
  id,
}) => {
  const navigate = useNavigate();
  const book = bookManager.getBook(id);

  return (
    <div className="book-card-container">
      <div className="book-image" onClick={() => navigate(`/book/${id}`)}>
        <img src={book.cover} alt="Book Cover" />
      </div>
      <div className="book-details">
        <hr />
        <h3>{name}</h3>
        <hr />
        <h3>
          {authors &&
            authors.map((author, index) => (
              <span key={index}>
                {author}
                {index < authors.length - 1 ? ", " : ""}
              </span>
            ))}
        </h3>
        <hr />
       {first_line && <p>{first_line}</p>}
        {first_line && <hr />}
        {second_line && <p>{second_line}</p>}
        {second_line && <hr />}
        <div className="button-container">
          {ButtonComponent && <ButtonComponent />}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
