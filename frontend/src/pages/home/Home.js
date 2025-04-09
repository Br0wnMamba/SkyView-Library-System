import React from "react";
import "./Home.css";
import { DisplayContent } from '../../data/book';
import AddToCart from "../../components/AddToCart/AddToCart";
import { IoMdPhonePortrait } from "react-icons/io";
import { FaBook } from "react-icons/fa";


// Home page that will display the main page content, it will contain a series of book groupings grouped as a news feed
const Home = () => {
  // Object that will be passed as parameter that will contain book Title Container, and its respective books
  // along with the book id for refrence
  return (
    // Main container for the home container
    <section className="homepage-container">
      {/* Loop through each content section (e.g., Recently Added, Top Picks) */}
      {DisplayContent.map((section, sectionIndex) => (
        // Wrapper for each section of books
        <div key={sectionIndex} className="home-booknewsFeedGroupings">
          {/* Section title (e.g., "Recently Added") */}
          <h2 className="home-group-title">{section.title}</h2>

          {/* Container for the list of books in this section */}
          <div className="home-books-container">
            {/* Loop through and display each book */}
            {section.books.map((book) => (
              <div key={book.id} className="home-book-item">
                
                {/* Book Cover Image */}
                <img src={book.cover} alt={book.title} className="book-cover"/>

                {/* Book title */}
                <h3>{book.title}</h3>

                {/* Book author */}
                <h4 className="home-bookAuthor">{book.author}</h4>

                <div className="home-phsycial-avaiablity-container">
                  <FaBook className="availability-icon"/>
                  <p>
                    <strong>physical:</strong>{" "}
                    {book.availability[0] === 0 ? (
                      <span className="availability-no">unavailable</span>
                    ) : (
                      <span className="availability-yes">{book.availability[0]} available</span>
                    )}
                  </p>
                </div>

                <div className="home-digital-avaiablity-container">
                  <IoMdPhonePortrait className="availability-icon"/>
                  <p>
                    <strong>digital:</strong>{" "}
                    <span className={book.availability[1] === 'n' ? "availability-no" : "availability-yes"}>
                      {book.availability[1] === 'n' ? "unavailable" : "available"}
                    </span>
                  </p>
                </div>

                <div className="home-addtocart-container">
                  <AddToCart type="physical" count={book.availability[0]}/>
                  <AddToCart type="digital" count={book.availability[1]}/>
                </div>


              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Home;
