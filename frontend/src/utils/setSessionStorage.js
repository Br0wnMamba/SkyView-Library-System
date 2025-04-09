import bookManager from './BookManager';

const returnDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString();

const handleAddToCart = ({ id, bookTypeCheckout, quantity }) => {
	const cart = JSON.parse(sessionStorage.getItem("cart")) || {};

	const bookKey = id;
	if (!cart[bookKey]) {
		cart[bookKey] = {
			is_physical: bookTypeCheckout === "physical",
			quantity: bookTypeCheckout === "physical" ? parseInt(quantity) : 1,
			return_date: returnDate,
		};
	} else {
		if (cart[bookKey].is_physical !== (bookTypeCheckout === "physical")) {
			cart[bookKey].is_physical = bookTypeCheckout === "physical";
		}
		cart[bookKey].quantity = bookTypeCheckout === "physical" ? cart[bookKey].quantity + parseInt(quantity) : 1;
		cart[bookKey].return_date = returnDate;
	}

	bookManager.setBooks(cart);
	return cart;
};

const handleCheckout = ({ id, bookTypeCheckout, quantity }) => {
	const books = JSON.parse(sessionStorage.getItem("books")) || {};
	const my_library = JSON.parse(sessionStorage.getItem("my_library")) || {};
	const bookKey = id;

	if (!my_library[bookKey]) {
		my_library[bookKey] = {
			is_physical: bookTypeCheckout === "physical",
			checked_out_date: new Date().toLocaleDateString(),
			return_date: returnDate,
		};
	} else {
		if (my_library[bookKey].is_physical !== (bookTypeCheckout === "physical")) {
			my_library[bookKey].is_physical = bookTypeCheckout === "physical";
		}
		my_library[bookKey].checked_out_date = new Date().toLocaleDateString();
		my_library[bookKey].return_date = returnDate;
	}

	books[bookKey].number_of_physical_copies_available -= bookTypeCheckout === "physical" ? parseInt(quantity) : 0;

	bookManager.setMyLibrary(my_library);
	bookManager.setBooks(books);
	return my_library;
};

const handleAddBookmark = (id) => {
	const bookmarked = JSON.parse(sessionStorage.getItem("book_marked")) || [];

	if (!bookmarked.includes(id)) {
		bookmarked.push(id);
	}

	bookManager.setBookmarked(bookmarked);
	return bookmarked;
};

const handleRemoveBookmark = (id) => {
	const bookmarked = JSON.parse(sessionStorage.getItem("book_marked")) || [];

	if (bookmarked.includes(id)) {
		const index = bookmarked.indexOf(id);
		bookmarked.splice(index, 1);
	}
	bookManager.setBookmarked(bookmarked);

	return bookmarked;
};

const handlePlaceOnHold = ({ id, bookTypeCheckout }) => {
	// need to complete
};

const handleRemoveHold = (id) => {};

export { handleAddToCart, handleCheckout, handleAddBookmark, handleRemoveBookmark, handlePlaceOnHold, handleRemoveHold };

export { handleAddToCart, handleCheckout, handleAddBookmark, handleRemoveBookmark, handlePlaceOnHold, handleRemoveHold };