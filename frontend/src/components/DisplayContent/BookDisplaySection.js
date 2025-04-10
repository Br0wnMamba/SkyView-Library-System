import React from "react";
import "./BookDisplaySection.css";
import { IoMdPhonePortrait } from "react-icons/io";
import { FaBook } from "react-icons/fa";

const BookDisplaySection = ({ title, books, renderButtons, customTextRenderer, showAvailability }) => {
  return (
    <div className="home-booknewsFeedGroupings">
      <h2 className="home-group-title">{title}</h2>
      <div className="home-books-container">
        {books.map((book) => (
          <div key={book.id} className="home-book-item">
            <img src={book.cover} alt={book.title} className="book-cover"/>
            <h3 className="home-book-title">{book.title}</h3>
            <h4 className="home-bookAuthor">{book.author}</h4>

            {customTextRenderer
              ? customTextRenderer(book)
              : (
                <>
                  {book.first_line && <p className="home-book-first-line">{book.first_line}</p>}
                  {book.second_line && <p className="home-book-second-line">{book.second_line}</p>}
                </>
              )}
            {showAvailability && (
              <>
                <div className="home-phsycial-avaiablity-container">
                  <FaBook className="availability-icon"/>
                  <p>
                    <strong>physical:</strong>{" "}
                    {book.physical === 0 ? (
                      <span className="availability-no">unavailable</span>
                    ) : (
                      <span className="availability-yes">{book.physical} available</span>
                    )}
                  </p>
                </div>
                
                <div className="home-digital-avaiablity-container">
                  <IoMdPhonePortrait className="availability-icon"/>
                  <p>
                    <strong>digital:</strong>{" "}
                    <span className={book.digital ? "availability-yes" : "availability-no"}>
                      {book.digital ? "available" : "unavailable"}
                    </span>
                  </p>
                </div>
              </>
            )}
            <div className="home-addtocart-container">
              {renderButtons && renderButtons(book)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookDisplaySection;