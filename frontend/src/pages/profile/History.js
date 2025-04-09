import React, { useState, useEffect } from "react";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import BookCard from "../../components/BookCard/BookCard";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { handleAddBookmark, handleRemoveBookmark as handleRemoveBookmarkFunction } from "../../utils/setSessionStorage";
import "./profile-all-pages.css";
import accountManager from "../../utils/AccountManager";

const History = () => {
	const userId = accountManager.getCardNumber();
	const [bookmarked_books, setBookmarkedBooks] = useState([]);
	const [on_hold_books, setOnHoldBooks] = useState({});
	const history_books_all_users = JSON.parse(sessionStorage.getItem("history")) || {};
	const history_books = history_books_all_users[userId] || {};
	const books = JSON.parse(sessionStorage.getItem("books")) || {};
	const navigate = useNavigate();

	const handleBookmark = (id) => {
		const res = handleAddBookmark(id);
		setBookmarkedBooks(res);
	};

	const handleRemoveBookmark = (id) => {
		const res = handleRemoveBookmarkFunction(id);
		setBookmarkedBooks(res);
	}

	useEffect(() => {
		const bookmarked_books_all_users = JSON.parse(sessionStorage.getItem("book_marked")) || {};
		const on_hold_books_all_users = JSON.parse(sessionStorage.getItem("on_hold")) || {};

		setBookmarkedBooks(bookmarked_books_all_users[userId] || []);
		setOnHoldBooks(on_hold_books_all_users[userId] || {});
	}, [userId]);

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
								key={id}
								id={id}
								authors={books[id].authors}
								first_line={`Checked out: ${history_books[id].checked_out_date}`}
								second_line={`Returned on: ${history_books[id].returned_date}`}
								name={books[id].name}
								ButtonComponent={() => (
									<div className="card-button-container">
										{on_hold_books && Object.keys(on_hold_books).length > 0 && Object.keys(on_hold_books).includes(id) ? (
											<Button text={"On Hold"} textColor={"white"} backgroundColor={"#D0BD67"} borderRadius={"0px"} padding={"10px 20px"} fontSize={"16px"} disabled={true} />
										) : (
											<Button text={"Add to Cart"} onClick={() => navigate(`/book/${id}`)} textColor={"white"} backgroundColor={"#43B447"} borderRadius={"0px"} padding={"10px 20px"} fontSize={"16px"} />
										)}
										{bookmarked_books && bookmarked_books.length > 0 && bookmarked_books.includes(id) ? (
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