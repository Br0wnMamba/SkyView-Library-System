import React, { useState, useEffect } from "react";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import BookCard from "../../components/BookCard/BookCard";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import "./profile-all-pages.css";

const History = () => {
	const [history_books, setHistoryBooks] = useState({});
	const [bookmarked_books, setBookmarkedBooks] = useState({});
	const [on_hold_books, setOnHoldBooks] = useState({});
	const navigate = useNavigate();

	const handleBookmark = (id) => {
		const bookmarked_books = JSON.parse(sessionStorage.getItem("bookmarked_books")) || {};
		const bookKey = id;

		bookmarked_books[bookKey] = {
			name: history_books[bookKey].name,
			authors: history_books[bookKey].authors,
			bookmarked_on: new Date().toLocaleDateString(),
			number_of_physical_copies_available: history_books[bookKey].number_of_physical_copies_available,
			is_ebook_available: history_books[bookKey].is_ebook_available,
		};
		sessionStorage.setItem("bookmarked_books", JSON.stringify(bookmarked_books));
		setBookmarkedBooks(bookmarked_books);
	};

	const handleRemoveBookmark = (id) => {
		const bookmarked_books = JSON.parse(sessionStorage.getItem("bookmarked_books")) || {};
		const bookKey = id;

		if (bookmarked_books[bookKey]) {
			delete bookmarked_books[bookKey];
			sessionStorage.setItem("bookmarked_books", JSON.stringify(bookmarked_books));
			setBookmarkedBooks(bookmarked_books);
		}
	}

	useEffect(() => {
		const history_books = JSON.parse(sessionStorage.getItem("history")) || {};
		const bookmarked_books = JSON.parse(sessionStorage.getItem("bookmarked_books")) || {};
		const on_hold_books = JSON.parse(sessionStorage.getItem("on_hold")) || {};

		setHistoryBooks(history_books);
		setBookmarkedBooks(bookmarked_books);
		setOnHoldBooks(on_hold_books);
	}, []);

	return (
		<div className="profile-page-container">
			<ProfileSidebar is_history={true} />
			<div className="profile-page-content-container">
				<div className="profile-page-header">
					<h1 className="profile-page-header-text">History</h1>
				</div>
				<div className="profile-page-cards-container">
					{history_books && Object.keys(history_books).length > 0 ? (
						Object.keys(history_books).map((id) => (
							<BookCard
								id={id}
								authors={history_books[id].authors}
								first_line={`Checked out: ${history_books[id].checked_out_date}`}
								second_line={`Returned on: ${history_books[id].returned_date}`}
								name={history_books[id].name}
								ButtonComponent={() => (
									<div className="card-button-container">
										{on_hold_books && Object.keys(on_hold_books).length > 0 && Object.keys(on_hold_books).includes(id) ? (
											<Button text={"On Hold"} textColor={"white"} backgroundColor={"#D0BD67"} borderRadius={"0px"} padding={"10px 20px"} fontSize={"16px"} />
										) : (
											<Button text={"Add to Cart"} onClick={() => navigate(`/book/${id}`)} textColor={"white"} backgroundColor={"#43B447"} borderRadius={"0px"} padding={"10px 20px"} fontSize={"16px"} />
										)}
										{bookmarked_books && Object.keys(bookmarked_books).length > 0 && Object.keys(bookmarked_books).includes(id) ? (
											<Button text={"Remove Bookmark"} onClick={() => handleRemoveBookmark(id)} textColor={"white"} borderRadius={"0px"} padding={"10px 20px"} fontSize={"16px"} />
										) : (
											<Button text={"Bookmark"} onClick={() => handleBookmark(id)} textColor={"white"} borderRadius={"0px"} padding={"10px 20px"} fontSize={"16px"} />
										)}
									</div>
								)}
							/>
						))
					) : (
						<div>
							<h2 className="no-data-available">No History Available!!!</h2>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default History;