import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./Search.css";
import SearchSidebar from "../../components/SearchSidebar/SearchSidebar";
import bookManager from "../../utils/BookManager";
import { IoMdPhonePortrait } from "react-icons/io";
import { FaBook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import accountManager from "../../utils/AccountManager";
import bookmarkManager from "../../utils/BookmarkManager";
import Login from "../registration/Login";

const genreOptions = [
	"Fiction", "Non-Fiction", "History", "Mystery", "Science Fiction", "Romance", "Thriller", "Horror Fiction", "Biography"
];

const mediaFormatOptions = ["Physical", "eBook"];

const Search = () => {
	const navigate = useNavigate();
	const user = accountManager.getUser();
	const bookmarkBooks = bookmarkManager.getAllBookmarks();
	const [bookmarkedBooks, setBookmarkedBooks] = useState(bookmarkBooks);
	const query = new URLSearchParams(window.location.search).get("q")?.toLowerCase() || "";
	const allBooks = useMemo(() => bookManager.getAllBooks(), []);
	const [savedAuthorOptions, setSavedAuthorOptions] = useState(JSON.parse(sessionStorage.getItem("saved_authors")) || []);

	const [selectedGenre, setSelectedGenre] = useState([]);
	const [selectedMediaFormat, setSelectedMediaFormat] = useState([]);
	const [selectedSaveAuthors, setSelectedSaveAuthors] = useState([]);
	const [filteredBooks, setFilteredBooks] = useState(allBooks);
	const [showLogin, setShowLogin] = useState(false);

	const handleGenreUpdate = (genre) => {
		setSelectedGenre(prev =>
			prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
		);
	};

	const handleMediaFormatUpdate = (format) => {
		setSelectedMediaFormat(prev =>
			prev.includes(format) ? prev.filter((f) => f !== format) : [...prev, format]
		);
	};

	const handleSaveAuthorsUpdate = (author) => {
		setSelectedSaveAuthors(prev =>
			prev.includes(author) ? prev.filter((a) => a !== author) : [...prev, author]
		);
	};

	const filterBooks = useCallback(() => {
		const matchesAnyFilter = (book) => {
			const matchQuery = query && book.title.toLowerCase().includes(query);
			const matchGenre = selectedGenre.length && selectedGenre.includes(book.genre);
			const matchAuthor = selectedSaveAuthors.length && selectedSaveAuthors.includes(book.author);
			const matchFormat =
				(selectedMediaFormat.includes("Physical") && book.availability?.physical > 0) ||
				(selectedMediaFormat.includes("eBook") && book.availability?.digital > 0);

			return matchQuery || matchGenre || matchAuthor || matchFormat;
		};

		if (
			!query &&
			selectedGenre.length === 0 &&
			selectedMediaFormat.length === 0 &&
			selectedSaveAuthors.length === 0
		) {
			setFilteredBooks(allBooks);
		} else {
			const result = allBooks.filter(matchesAnyFilter);
			setFilteredBooks(result);
		}
	}, [query, selectedGenre, selectedMediaFormat, selectedSaveAuthors, allBooks]);

	const handleBookmark = (bookId) => {
		const user = accountManager.getUser();
		if (!user) {
			setShowLogin(true);
			return;
		}
		
		setBookmarkedBooks(bookmarkManager.getAllBookmarks());
		bookmarkManager.addBookmark(bookId);
		setBookmarkedBooks(bookmarkManager.getAllBookmarks());
	};

	const handleRemoveBookmark = (bookId) => {
		const user = accountManager.getUser();
		if (!user) {
			setShowLogin(true);
			return;
		}
		
		setBookmarkedBooks(bookmarkManager.getAllBookmarks());
		bookmarkManager.removeBookmark(bookId);
		setBookmarkedBooks(bookmarkManager.getAllBookmarks());
	};

	const handleSaveAuthor = (authors) => {
		const savedAuthors = JSON.parse(sessionStorage.getItem("saved_authors")) || [];
		const newSavedAuthors = [...new Set([...savedAuthors, ...authors])];
		sessionStorage.setItem("saved_authors", JSON.stringify(newSavedAuthors));
		setSavedAuthorOptions(newSavedAuthors);
	};

	useEffect(() => {
		filterBooks();
	}, [filterBooks]);

	useEffect(() => {
		if (user) {
			setShowLogin(false);
		}
	  }, [user]);

	return (
		<div>
			{showLogin ? <Login backgroundLocation={window.location.pathname} /> : (
			<div className="search-container">
			<SearchSidebar
				genreOptions={genreOptions}
				mediaFormatOptions={mediaFormatOptions}
				savedAuthorOptions={savedAuthorOptions}
				onGenreUpdate={handleGenreUpdate}
				onMediaFormatUpdate={handleMediaFormatUpdate}
				onSaveAuthorsUpdate={handleSaveAuthorsUpdate}
			/>
			<div className="book-list-container">
				<h1 className="search-results-header">
						{filteredBooks.length > 0 ? (
							<>
								Showing Results for <strong>"{query}"</strong>
							</>
						) : (
							"No Results Found"
						)}
				</h1>
				<div className="search-results-books-container">
				{filteredBooks.map((book) => (
					<div key={book.id} className="home-book-item">
					{/* Book Cover */}
					<img
					  src={book.cover}
					  alt={book.title}
					  className="book-cover"
					  onClick={() => navigate(`/book/${book.id}`)}
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
					  <Button text="Add to Cart" backgroundColor={"#43B447"} borderRadius={"5px"} padding={"10px 20px"} fontSize={"16px"} onClick={() => navigate(`/book/${book.id}`)} />
					{(Array.isArray(bookmarkedBooks) && bookmarkedBooks.includes(book.id)) ? (
						<Button text="Remove Bookmark" borderRadius={"5px"} padding={"10px 20px"} fontSize={"16px"} onClick={() => handleRemoveBookmark(book.id)} />
					) : (
					  <Button text="Bookmark" borderRadius={"5px"} padding={"10px 20px"} fontSize={"16px"} onClick={() => handleBookmark(book.id)} />
					)}
					  <Button text="Save Author" borderRadius={"5px"} padding={"10px 20px"} fontSize={"16px"} onClick={() => handleSaveAuthor(book.authors)} />
					</div>
				  </div>
				))}
			</div>
		</div>
		</div>
			)}
		</div>
	);
};

export default Search;
