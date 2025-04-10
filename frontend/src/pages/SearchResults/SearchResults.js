// SearchResults.js
import React from "react";
import { useLocation } from "react-router-dom";
import "./SearchResults.css";
import "../../components/AddToCart/AddToCart.css";
import BookCard from "../../components/BookCard/BookCard";
import DropdownFilterSection from "../../components/DropdownFilterSection/DropdownFilterSection";

// icons
import { IoFilter } from "react-icons/io5";
import { DisplayContent } from '../../data/book';
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { BsChevronExpand } from "react-icons/bs";



const SearchResults = () => {

  const location = useLocation();

  const params = new URLSearchParams(location.search);

    // Get the query parameter from the URL
  const query = params.get("q")?.toLowerCase() || "";
  const books = [
    ...DisplayContent[0].books,
    ...DisplayContent[1].books
  ];

  // Toggle that filters the filter options
  const [filterToggle, setFilterToggle] = React.useState(true);

  // Toggle Filter helper function
  const toggleFilters = () => {
    setFilterToggle(!filterToggle);
  };

    // Dropdown filter section toggle
  const [isOpen, setIsOpen] = React.useState(true);
  
  // very basic search filter for books
  const results = books.filter(
    
    (book) =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
  );


  return (
    <>
        <div className="search-results-page-container">
            <div className="search-results-container">

                <div className="search-results-meta-data-options-container">
                    <div className="search-results-meta-data-options-inner">
                        <div className="filter-toggle-container">
                                
                            <div className="search-results-filter-results-container">
                                
                                <div className="search-results-filter-button-container">
                                    <button onClick={toggleFilters} className="search-results-filter-button">
                                        <div className="search-results-filter-button-icon">
                                            <div>
                                                <IoFilter />
                                            </div>
                                            <div>
                                                {filterToggle ? "Hide Filters" : "Show Filters"}
                                            </div>

                                        </div>
                                        
                                    </button>
                                </div>
    
                            </div>

                        </div>    

                        <div className="search-results-title-container">      
                            <h2 className="search-results-title-header">
                                Showing Results for "<span style={{ fontStyle: 'italic' }}>{query}"</span>
                            </h2>
                        </div>

                    </div>
                
                    </div>
                                             
                <div className="search-results-list-container">


                <div  className={`search-results-filter-container ${filterToggle ? "open" : "collapsed"}`}> 
                    
                    <div className="search-results-filter-content-">
                        <div className="search-results-filter-title-container">
                            <DropdownFilterSection title="Genre">
                                <div className="search-results-filter-content-genre">
                                    {[
                                    "Fiction", "Non-Fiction", "Mystery", "Romance","Science Fiction",
                                    "Fantasy", "Thriller", "Horror", "Historical Fiction", "Biography",
                                    "Self-Help", "Poetry", "Drama", "Graphic Novels", "Adventure",
                                    "Young Adult", "Children's Books", "Classic Literature",
                                    "Religious", "Science & Technology", "History", "Philosophy",
                                    "Psychology", "Politics", "Economics", "Business", "Education",
                                    "Law", "Medicine", "Sociology", "Art & Photography", "Travel",
                                    "Cookbooks", "Sports", "True Crime", "Essays",
                                ].map((genre) => {
                                    const id = genre.toLowerCase().replace(/[^a-z0-9]/g, "-");
                                    return (
                                        <div key={id} className="search-results-filter-content-genre-item">
                                        <input type="checkbox" id={id} name={id} value={genre} />
                                        <label htmlFor={id}>{genre}</label>
                                        </div>
                                    );
                                    })}
                                </div>
                            </DropdownFilterSection>
                        </div>

                    </div>     

                    <div className="search-results-filter-content-">
                        <div className="search-results-filter-title-container">
                            <DropdownFilterSection title="Media Format">
                                <div className="search-results-filter-content-genre">
                                    {[
                                    "Digital", "Physical",
                                ].map((genre) => {
                                    const id = genre.toLowerCase().replace(/[^a-z0-9]/g, "-");
                                    return (
                                        <div key={id} className="search-results-filter-content-genre-item">
                                        <input type="checkbox" id={id} name={id} value={genre} />
                                        <label htmlFor={id}>{genre}</label>
                                        </div>
                                    );
                                    })}
                                </div>
                            </DropdownFilterSection>
                        </div>

                    </div>     

                    <div className="search-results-filter-content-">
                        
                        <div className="search-results-filter-title-container">
                            <DropdownFilterSection title="Saved Author">
                                <div className="search-results-filter-content-author">
                                    {["J.K. Rowling", "Robert Greene", "George Orwell", "J.R.R. Tolkien"].map((author) => {
                                    const id = `author-${author.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
                                    return (
                                        <div key={id} className="search-results-filter-content-author-item">
                                        <input type="checkbox" id={id} name="saved-authors" value={author} />
                                        <label htmlFor={id}>{author}</label>
                                        </div>
                                    );
                                    })}
                                </div>
                            </DropdownFilterSection>
                        </div>                   
                    </div>

                    <div className="search-results-filter-content-">
                        
                        <div className="search-results-filter-title-container">
                            <DropdownFilterSection title="Availability">
                                <div className="search-results-filter-content-availability">
                                    {["Available", "Unavailable"].map((status) => {
                                    const id = `availability-${status.toLowerCase()}`;
                                    return (
                                        <div key={id} className="search-results-filter-content-availability-item">
                                        <input type="checkbox" id={id} name="availability" value={status} />
                                        <label htmlFor={id}>{status}</label>
                                        </div>
                                    );
                                    })}
                                </div>
                            </DropdownFilterSection>
                        </div>  
                    </div>

                    <div className="search-results-filter-content-">
                        
                        <div className="search-results-filter-title-container">
                            <DropdownFilterSection title="Language">
                                <div className="search-results-filter-content-language">
                                    {["English", "French", "Spanish", "Arabic", "German", "Chinese"].map((lang) => {
                                    const id = `lang-${lang.toLowerCase()}`;
                                    return (
                                        <div key={id} className="search-results-filter-content-language-item">
                                        <input type="checkbox" id={id} name="language" value={lang} />
                                        <label htmlFor={id}>{lang}</label>
                                        </div>
                                    );
                                    })}
                                </div>
                            </DropdownFilterSection>
                        </div> 
                    </div>
                    </div>

                    <div className="search-results-list-grid-display-container">
                        {results.length === 0 ? (
                            <p>No books found.</p>
                        ) : (
                            <div className="books-grid">
                            {results.map((book) => (
                                <BookCard key={book.id} book={book} />
                            ))}
                            </div>
                        )}
                    </div>

                    
                </div>               
            </div>
        </div>
    </>
  );
};

export default SearchResults;
