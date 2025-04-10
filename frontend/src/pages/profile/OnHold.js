import React, { useState } from "react";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import BookCard from "../../components/BookCard/BookCard";
import Button from "../../components/Button/Button";
import holdManager from "../../utils/HoldManager";
import bookManager from "../../utils/BookManager";
import "./profile-all-pages.css";

const OnHold = () => {
	const [onHoldBooksInfo, setOnHoldInfoBooks] = useState(holdManager.getHolds());
	const books = bookManager.getAllBooks();

	const on_hold_books = onHoldBooksInfo.map((book) => {
		const bookDetails = books.find((b) => Number(b.id) === Number(book.id));
		return {
			...book,
			...bookDetails,
		};
	});

	const handleRemoveHold = (book_id, book_type) => {
		holdManager.remove(book_id, book_type);
		setOnHoldInfoBooks(holdManager.getHolds());
	};

	return (
		<div className="profile-page-container">
			<ProfileSidebar is_on_hold={true} />
			<div className="profile-page-content-container">
				<div className="profile-page-header">
					<h1 className="profile-page-header-text">On Hold Books</h1>
				</div>
				<div className="profile-page-cards-container">
					{on_hold_books && on_hold_books.length > 0 ? (
						on_hold_books.map((book) => (
							<BookCard
								key={book.id}
								id={book.id}
								authors={book.authors}
								first_line={`Put on hold: ${book.hold_date}`}
								second_line={`Will get on: ${book.hold_till}`}
								name={book.title}
								ButtonComponent={() => (
									<div className="card-button-container">
										<Button text={"Remove Hold"} onClick={() => handleRemoveHold(book.id, book.type)} textColor={"white"} backgroundColor={"#D0BD67"} borderRadius={"0px"} padding={"10px 20px"} fontSize={"16px"} />
									</div>
								)}
							/>
						))
					) : (
						<div>
							<h2 className="no-data-available">No Books has been placed on hold yet!!!</h2>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default OnHold;
