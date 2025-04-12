import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./Search.css";
import SearchSidebar from "../../components/SearchSidebar/SearchSidebar";
import bookManager from "../../utils/BookManager";
import { IoMdPhonePortrait } from "react-icons/io";
import { FaBook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import authorManager from "../../utils/AuthorManager";
import accountManager from "../../utils/AccountManager";
import AddToCart from "../../components/AddToCart/AddToCart";
import { Snackbar, Alert } from "@mui/material";

const genreOptions = [
	"Fiction", "Non-Fiction", "History", "Mystery", "Science Fiction", "Romance", "Thriller", "Horror Fiction", "Biography"
];

const mediaFormatOptions = ["Physical", "eBook"];

const Search = () => {
	const navigate = useNavigate();
	const query = new URLSearchParams(window.location.search).get("q")?.toLowerCase() || "";
	const allBooks = useMemo(() => bookManager.getAllBooks(), []);

	const [selectedGenre, setSelectedGenre] = useState([]);
	const [selectedMediaFormat, setSelectedMediaFormat] = useState([]);
	const [selectedSaveAuthors, setSelectedSaveAuthors] = useState([]);
	const [saveAuthors, setSaveAuthors] = useState(authorManager.getUserSavedAuthors());
	const [filteredBooks, setFilteredBooks] = useState(allBooks);
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: "",
		severity: "success",
	});

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
			const matchGenre = selectedGenre.length > 0 ? 
				selectedGenre.some((genre) => book.genre.toLowerCase() === genre.toLowerCase()) : true;
			const matchAuthor = selectedSaveAuthors.length > 0 ? selectedSaveAuthors.some((author) =>
				book.authors.some((bookAuthor) => bookAuthor.toLowerCase().includes(author.toLowerCase()))
			) : true;
			const matchFormat = selectedMediaFormat.length > 0 ? 
				((selectedMediaFormat.includes("Physical") && book.availability?.physical > 0) ||
				(selectedMediaFormat.includes("eBook") && book.availability?.digital > 0)) : true;

		   if (matchQuery) {
				return matchGenre && matchAuthor && matchFormat;
		   } else {
				return false;
		   }
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

	const handleSaveAuthor = (authors) => {
		const user = accountManager.getUser();
		if (!user) {
			setSnackbar({
				open: true,
				message: "You must be logged in to save authors.",
				severity: "error",
			});
			return;
		}

		authors.map((author) => {
			authorManager.addAuthor(author);
		});

		setSnackbar({
			open: true,
			message: "Authors saved successfully.",
			severity: "success",
		});
		setSelectedSaveAuthors(authorManager.getUserSavedAuthors());
	};

	useEffect(() => {
		filterBooks();
	}, [filterBooks]);

	useEffect(() => {
		const user = accountManager.getUser();
		if (user) {
			const savedAuthors = authorManager.getUserSavedAuthors();
			setSaveAuthors(savedAuthors);
		}
	}, []);

	return (
		<div className="search-container">
			<SearchSidebar
				genreOptions={genreOptions}
				mediaFormatOptions={mediaFormatOptions}
				savedAuthorOptions={saveAuthors}
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
						<AddToCart
						id={book.id}
						type="physical"
						/>
						<AddToCart
						id={book.id}
						type="digital"
						/>
					  <button className="add-to-cart-button" onClick={() => handleSaveAuthor(book.authors)}>
          				Save Authors
        			  </button>
					</div>
				  </div>
				))}
			</div>
		</div>
		<Snackbar
					open={snackbar.open}
					autoHideDuration={3000}
					onClose={() => setSnackbar({ ...snackbar, open: false })}
				>
					<Alert severity={snackbar.severity} sx={{ width: "100%" }}>
					{snackbar.message}
					</Alert>
				</Snackbar>
		</div>
	);
};

export default Search;
