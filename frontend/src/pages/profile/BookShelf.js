import React from "react";
import "./profile-all-pages.css";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import BookCard from "../../components/BookCard/BookCard";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const BookShelf = () => {
	const navigate = useNavigate();
	const my_library = JSON.parse(sessionStorage.getItem("my_library")) || {};

	return (
		<div className="profile-page-container">
			<ProfileSidebar is_my_library={true} />
			<div className="profile-page-content-container">
				<div className="profile-page-header">
					<h1 className="profile-page-header-text">My Library</h1>
				</div>
				<div className="profile-page-cards-container">
					{my_library && Object.keys(my_library).length > 0 ? (
						Object.keys(my_library).map((id) => (
							<BookCard
								key={id}
								id={id}
								name={my_library[id].name}
								authors={my_library[id].authors}
								first_line={"Checked out: " + my_library[id].checked_out_date}
								second_line={"Access Until: " + my_library[id].return_date}
								ButtonComponent={() => (
									<div className="card-button-container">
										{my_library[id].is_physical === "true" ? (
											<p>Physical Book</p>
										) : (
											<Button text={"Read this Book"} borderRadius={"0"} textColor={"white"} backgroundColor={"#434EB4"} onClick={() => navigate("/bookShelf/" + id)} />
										)}
									</div>
								)}
							/>
						))
					) : (
						<p>No books available in your library.</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default BookShelf;
