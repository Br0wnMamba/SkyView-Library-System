import React from "react";
import "./Home.css";

// Home page that will display the main page content, it will contain a series of book groupings grouped as a news feed
const Home = () => {
  // Object that will be passed as parameter that will contain book Title Container, and its respective books
  // along with the book id for refrence
  const DisplayContent = [
    {
      Title: "Recently Added",
      Books: [
        { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
        { id: 2, title: "1984", author: "George Orwell" },
        { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee" },
        { id: 4, title: "Brave New World", author: "Aldous Huxley" },
      ],
    },
    {
      Title: "Top Picks",
      Books: [
        { id: 5, title: "Sapiens", author: "Yuval Noah Harari" },
        { id: 6, title: "Educated", author: "Tara Westover" },
        { id: 7, title: "The 48 Laws of Power", author: "Roberte Greene" },
      ],
    },
  ];

  return (
    // Main container for the home section
    <section className="home-section">
      {/* Loop through each content section (e.g., Recently Added, Top Picks) */}
      {DisplayContent.map((section, sectionIndex) => (
        // Wrapper for each section of books
        <div key={sectionIndex} className="home-book-group">
          {/* Section title (e.g., "Recently Added") */}
          <h2 className="home-group-title">{section.Title}</h2>

          {/* Container for the list of books in this section */}
          <div className="home-books-container">
            {/* Loop through and display each book */}
            {section.Books.map((book) => (
              <div key={book.id} className="home-book-item">
                {/* Book title */}
                <h3>{book.title}</h3>

                {/* Book author */}
                <p>{book.author}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Home;
