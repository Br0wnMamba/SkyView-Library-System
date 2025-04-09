import React from "react";
import "./Home.css";
import { DisplayContent } from '../../data/book';
import AddToCart from "../../components/AddToCart/AddToCart";
import { IoMdPhonePortrait } from "react-icons/io";
import { FaBook } from "react-icons/fa";
import BookCard from "../../components/BookCard/BookCard";

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
                <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Home;
