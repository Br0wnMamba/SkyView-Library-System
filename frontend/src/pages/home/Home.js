import React from "react";
import "./Home.css";
import { DisplayContent } from "../../data/book";
import AddToCart from "../../components/AddToCart/AddToCart";
import { IoMdPhonePortrait } from "react-icons/io";
import { FaBook } from "react-icons/fa";
import bookManager from "../../utils/BookManager";

const Home = () => {
  return (
    <section className="homepage-container">
      {DisplayContent.map((section, sectionIndex) => (
        <div key={sectionIndex} className="home-booknewsFeedGroupings">
          <h2 className="home-group-title">{section.title}</h2>

          <div className="home-books-container">
            {section.books.map((book_id) => {
              const book = bookManager.getBook(book_id);

              return (
                <div key={book.id} className="home-book-item">
                  {/* Book Cover */}
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="book-cover"
                  />

                  {/* Book Title */}
                  <h3>{book.title}</h3>

                  {/* Book Authors */}
                  <h4 className="home-bookAuthor">
                    {book?.authors?.map((author, index) => (
                      <span key={index}>
                        {index !== 0 && ", "}
                        {author}
                      </span>
                    ))}
                  </h4>

                  {/* Physical Availability */}
                  <div className="home-phsycial-avaiablity-container">
                    <FaBook className="availability-icon" />
                    <p>
                      <strong>physical:</strong>{" "}
                      {book.availability.physical === 0 ? (
                        <span className="availability-no">unavailable</span>
                      ) : (
                        <span className="availability-yes">
                          {book.availability.physical} available
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Digital Availability */}
                  <div className="home-digital-avaiablity-container">
                    <IoMdPhonePortrait className="availability-icon" />
                    <p>
                      <strong>digital:</strong>{" "}
                      <span
                        className={
                          book.availability.digital === 0
                            ? "availability-no"
                            : "availability-yes"
                        }
                      >
                        {book.availability.digital === 0
                          ? "unavailable"
                          : "available"}
                      </span>
                    </p>
                  </div>

                  {/* Add to Cart Buttons */}
                  <div className="home-addtocart-container">
                    <AddToCart
                      id={book.id}
                      type="physical"
                    />
                    <AddToCart
                      id={book.id}
                      type="digital"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Home;
