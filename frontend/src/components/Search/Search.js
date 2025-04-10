// Search.js
import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "./Search.css";


const Search = () => {


    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submission
            navigate(`/search?q=${query}`); // Redirect to search page with query
            setQuery(""); // Clear the input field after search
        }
    }


  return (
    <div className="search-container">
      <FaMagnifyingGlass className="search-icon" />
      <input
        type="text"
        className="search-input"
        placeholder="Search for books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Search;
