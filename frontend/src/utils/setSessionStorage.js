const handleAddToCart = ({ id, name, authors, bookTypeCheckout, quantity, number_of_physical_copies_available, is_ebook_available }) => {
	const cart = JSON.parse(sessionStorage.getItem("cart")) || {};
	const bookKey = id;
	if (!cart[bookKey]) {
		cart[bookKey] = {
			name: name,
			authors: authors,
			is_physical: bookTypeCheckout === "physical",
			quantity: bookTypeCheckout === "physical" ? parseInt(quantity) : 1,
			number_of_physical_copies_available: bookTypeCheckout === "physical" ? number_of_physical_copies_available - quantity : number_of_physical_copies_available,
			is_ebook_available: is_ebook_available,
			return_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
		};
	} else {
		if (cart[bookKey].is_physical !== (bookTypeCheckout === "physical")) {
			cart[bookKey].is_physical = bookTypeCheckout === "physical";
		}
		cart[bookKey].quantity = bookTypeCheckout === "physical" ? parseInt(cart[bookKey].quantity) + parseInt(quantity) : 1;
		cart[bookKey].return_date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString();
	}

	sessionStorage.setItem("cart", JSON.stringify(cart));
	return cart;
};

const handleCheckout = ({ id, name, authors, bookTypeCheckout }) => {
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
	return my_library;
};

const handleAddBookmark = ({ id, name, authors, number_of_physical_copies_available, is_ebook_available }) => {
	const bookmarked = JSON.parse(sessionStorage.getItem("book_marked")) || {};
	bookmarked[id] = {
		name: name,
		authors: authors,
		bookmarked_on: new Date().toLocaleDateString(),
		number_of_physical_copies_available: number_of_physical_copies_available,
		is_ebook_available: is_ebook_available,
	};
	sessionStorage.setItem("book_marked", JSON.stringify(bookmarked));

	return bookmarked;
};

const handleRemoveBookmark = (id) => {
	const bookmarked = JSON.parse(sessionStorage.getItem("book_marked")) || {};
	if (bookmarked[id]) {
		delete bookmarked[id];
		sessionStorage.setItem("book_marked", JSON.stringify(bookmarked));
	}

	return bookmarked;
};

const handlePlaceOnHold = ({ id, name, authors, bookType, quantity, number_of_physical_copies_available, is_ebook_available }) => {
	// need to complete
};

export { handleAddToCart, handleCheckout, handleAddBookmark, handleRemoveBookmark, handlePlaceOnHold };
