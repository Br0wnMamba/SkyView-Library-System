// SearchResults.js
import React from "react";
import { useLocation } from "react-router-dom";


import { DisplayContent } from '../../data/book';


const SearchResults = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("q")?.toLowerCase() || "";
  const books = [
    ...DisplayContent[0].books,
    ...DisplayContent[1].books
  ];


  const results = books.filter(
    
    (book) =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
  );

  return (
    <div className="search-results">
      <h2>Search Results for: "{query}"</h2>
      {results.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="books-grid">
          {results.map((book) => (
            <div key={book.id} className="book-card">
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              {/* Replace with your <BookCard /> or <BookCardOnHold /> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
