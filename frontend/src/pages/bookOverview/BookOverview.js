import React from "react";
import Search from "../../components/Search/Search";
import Button from "../../components/Button/Button";

const BookOverview = ({ }) => {
	return (
		<div>
			<Search buttonName={"Filter"} />
			<div className="book-overview">
				<div className="book-overview-image">
				</div>
			</div>
			<div className="book-overview-checkout">

			</div>
		</div>
	);
}

export default BookOverview;