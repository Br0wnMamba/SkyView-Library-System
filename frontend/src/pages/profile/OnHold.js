import React, { useState, useEffect } from "react";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import BookCard from "../../components/BookCard/BookCard";
import Button from "../../components/Button/Button";
import accountManager from "../../utils/AccountManager";
import "./profile-all-pages.css";

const OnHold = () => {
	const userId = accountManager.getCardNumber();
	const [on_hold_books, setOnHoldBooks] = useState({});
	const books = JSON.parse(sessionStorage.getItem("books")) || {};

	const handleRemoveHold = (id) => {
	};

	useEffect(() => {
		const onHoldBooks = JSON.parse(sessionStorage.getItem("on_hold")) || {};
		if (onHoldBooks[userId]) {
			setOnHoldBooks(onHoldBooks[userId]);
		}
	}, [userId]);

	return (
		<div className="profile-page-container">
			<ProfileSidebar is_on_hold={true} />
			<div className="profile-page-content-container">
				<div className="profile-page-header">
					<h1 className="profile-page-header-text">On Hold Books</h1>
				</div>
				<div className="profile-page-cards-container">
					{on_hold_books && Object.keys(on_hold_books).length > 0 ? (
						Object.keys(on_hold_books).map((id) => (
							<BookCard
								key={id}
								id={id}
								authors={books[id].authors}
								first_line={`Put on hold: ${on_hold_books[id].on_hold_date}`}
								second_line={`Will get on: ${on_hold_books[id].will_get_on}`}
								name={books[id].name}
								ButtonComponent={() => (
									<div className="card-button-container">
										<Button text={"Remove Hold"} onClick={() => handleRemoveHold(id)} textColor={"white"} backgroundColor={"#D0BD67"} borderRadius={"0px"} padding={"10px 20px"} fontSize={"16px"} />
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
