import React, { useState } from "react";
import Search from "../../components/Search/Search";
import Button from "../../components/Button/Button";
import PhysicalBookLogo from "../../assets/physical-book.svg";
import EBookLogo from "../../assets/ebook.svg";
import AuthorProfile from "../../assets/bookoverview-user-profile.svg";
import { useParams } from "react-router-dom";
import "./BookOverview.css";
import bookImages from "../../components/utils/loadBookImages";

const BookOverview = ({ name, authors, number_of_physical_copies_available, is_ebook_available, published_date, description }) => {
	const { bookId: id } = useParams();
	const [bookTypeCheckout, setBookTypeCheckout] = useState("physical");
	const [quantity, setQuantity] = useState(1);

	const handleAddToCart = () => {
		const cart = JSON.parse(sessionStorage.getItem("cart")) || {};
		const bookKey = id;
		if (!cart[bookKey]) {
			cart[bookKey] = {
				name: name,
				authors: authors,
				is_physical: bookTypeCheckout === "physical",
				quantity: bookTypeCheckout === "physical" ? quantity : 1,
				is_ebook_available: is_ebook_available,
				return_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
			};
		} else {
			if (cart[bookKey].is_physical !== (bookTypeCheckout === "physical")) {
				cart[bookKey].is_physical = bookTypeCheckout === "physical";
			}
			cart[bookKey].quantity += bookTypeCheckout === "physical" ? quantity : 1;
			cart[bookKey].return_date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString();
		}

		sessionStorage.setItem("cart", JSON.stringify(cart));
	};

	const handleCheckout = () => {
		const my_library = JSON.parse(sessionStorage.getItem("my_library")) || {};
		const bookKey = id;

		if (!my_library[bookKey]) {
			my_library[bookKey] = {
				name: name,
				authors: authors,
				is_physical: bookTypeCheckout === "physical",
				checked_out_date: new Date().toLocaleDateString(),
				return_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
			};
		} else {
			if (my_library[bookKey].is_physical !== (bookTypeCheckout === "physical")) {
				my_library[bookKey].is_physical = bookTypeCheckout === "physical";
			}
			my_library[bookKey].checked_out_date = new Date().toLocaleDateString();
			my_library[bookKey].return_date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString();
		}

		sessionStorage.setItem("my_library", JSON.stringify(my_library));
	};

	return (
		<div>
			<Search buttonName={"Filter"} />
			<div className="book-overview-container">
				<div className="book-overview">
					<div className="book-overview-image-container">
						<div className="book-overview-image">
							<img src={bookImages[id]} alt="Book Cover" />
						</div>
						<div className="book-sample-info-buttons">
							<button>
								Read Sample
							</button>
							<i class="bi bi-play-fill"></i>
							<button>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
									<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
								</svg> Audible Sample
							</button>
						</div>
					</div>
					<div className="book-overview-info">
						<div className="book-overview-info-title">
							<div className="book-overview-info-published-date-name">
								<h1>{name}</h1>
								<p> - {published_date}</p>
							</div>
							<div className="book-overview-info-authors">
								<h1>By {authors && authors.length > 0 && authors.map((author, index) => (
									<span key={index}>
										{author}
										{index < authors.length - 1 && ", "}
									</span>
								))}</h1>
							</div>
						</div>
						<hr />
						<div className="book-overview-info-availability">
							<img src={PhysicalBookLogo} alt="Physical Book" />
							<p>Physical: <span className={number_of_physical_copies_available > 0 ? "green" : "red"}>{number_of_physical_copies_available} Left</span></p>
							<img src={EBookLogo} alt="E-Book" />
							<p>E-Book: <span className={is_ebook_available ? "green" : "red"}>{is_ebook_available ? "Available" : "Not Available"}</span></p>
						</div>
						<hr />
						<div className="book-overview-bookmark-save-author-buttons">
							<Button text="Save Author" borderRadius={"0"} onClick={() => {
								const savedAuthors = JSON.parse(sessionStorage.getItem("saved_authors")) || [];
								if (authors && authors.length > 0) {
									authors.forEach((author) => {
										if (!savedAuthors.includes(author)) {
											savedAuthors.push(author);
										}
									});
								}
								sessionStorage.setItem("saved_authors", JSON.stringify(savedAuthors));
							}}
							/>
							<Button text="Bookmark" borderRadius={"0"} onClick={() => {
								const bookmarked = JSON.parse(sessionStorage.getItem("book_marked")) || {};
								if (!bookmarked.includes(id)) {
									bookmarked[id] = {
										name: name,
										authors: authors,
										bookmarked_on: new Date().toLocaleDateString(),
									};
								}
								sessionStorage.setItem("book_marked", JSON.stringify(bookmarked));
							}}
							/>
						</div>
						<hr />
						<div className="book-overview-info-description">
							{description}
						</div>
						<hr />
						<div className="book-overview-info-learn-more">
							<b>Learn more about the authors!</b>
							{authors && authors.length > 0 && authors.map((author, index) => (
								<div className="book-overview-info-author-learn-more" key={index}>
									<img src={AuthorProfile} alt="Author Profile" />
									<p>{author}</p>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="book-overview-checkout">
					<h1>Checkout Book!</h1>
					<div className="book-overview-checkout-buttons">
						<button className={bookTypeCheckout === "physical" ? "book-overview-checkout-book-type selected" : "book-overview-checkout-book-type"} onClick={() => setBookTypeCheckout("physical")} disabled={number_of_physical_copies_available <= 0}>
							Paperback
						</button>
						<button className={bookTypeCheckout === "ebook" ? "book-overview-checkout-book-type selected" : "book-overview-checkout-book-type"} onClick={() => setBookTypeCheckout("ebook")} disabled={!is_ebook_available}>
							E-Book
						</button>
						<button className={bookTypeCheckout === "audio" ? "book-overview-checkout-book-type selected" : "book-overview-checkout-book-type"} onClick={() => setBookTypeCheckout("audio")} disabled={!is_ebook_available}>
							Audiobook
						</button>
					</div>
					<div className="book-overview-checkout-pickup-location">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
							<path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
						</svg>
						Pick up at - 1513 Brookfield Way
					</div>
					<div className="book-overview-checkout-quantity">
						<select
							id="quantity"
							value={quantity}
							onChange={(e) => setQuantity(e.target.value)}
						>
							{Array.from({ length: 10 }, (_, index) => {
								const value = index + 1;
								return (
									<option key={value} value={value}>
										Quantity: {value}
									</option>
								);
							})}
						</select>
					</div>
					<div className="book-overview-checkout-cart-book-now-buttons">
						<Button text="Add to Cart" onClick={handleAddToCart} fontSize={"18px"} backgroundColor={"green"} />
						<Button text="Checkout Book Now" onClick={handleCheckout} fontSize={"18px"} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default BookOverview;