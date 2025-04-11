import React, { useState } from 'react';
import "./profile-all-pages.css";
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';
import BookCard from '../../components/BookCard/BookCard';
import Button from '../../components/Button/Button';
import bookManager from '../../utils/BookManager';
import bookmarkManager from "../../utils/BookmarkManager"

const Bookmarks = () => {
	const  [bookmarked_books, setBookmarkedBooks] = useState(bookmarkManager.getAllBookmarks());
	const all_books = bookManager.getAllBooks();

	const my_book_mark_books = bookmarked_books.map((id) => {
		const bookDetails = all_books.find((b) => Number(b.id) === Number(id));
		return {
			id: id,
			...bookDetails,
		};
	});

	const handleRemoveBookmark = (book_id) => {
		bookmarkManager.removeBookmark(book_id);
		setBookmarkedBooks(bookmarkManager.getAllBookmarks());
	};

	return (
		<div className="profile-page-container">
		<ProfileSidebar is_bookmark={true} />
		<div className="profile-page-content-container">
			<div className="profile-page-header">
				<h1 className="profile-page-header-text">Bookmarks</h1>
			</div>
			<div className="profile-page-cards-container">
				{my_book_mark_books && my_book_mark_books.length > 0 ? (
					my_book_mark_books.map((book) => (
						<BookCard
							key={book.id}
							id={book.id}
							name={book.title}
							authors={book.authors}
							ButtonComponent={() => (
								<div className="card-button-container">
									<Button
										text={"Remove Bookmark"}
										borderRadius={"0"}
										textColor={"white"}
										backgroundColor={"#434EB4"}
										onClick={() => handleRemoveBookmark(book.id)}
									/>
								</div>
							)}
						/>
					))
				) : (
					<div>
						<h2 className="no-data-available">No books are bookmarked!!!</h2>
					</div>
				)}
			</div>
		</div>
	</div >
  );
};

export default Bookmarks;
