import React, { useEffect, useState } from "react";
import ReadBookSidebar from "../../components/ReadBookSidebar/ReadBookSidebar.js";
import { useParams, useNavigate } from "react-router-dom";
import loanManager from "../../utils/LoanManager.js";
import bookManager from "../../utils/BookManager.js";

const ReadBook = () => {
	const navigate = useNavigate();
	const { bookId } = useParams();
	const [textColor, setTextColor] = useState("black");
	const [backgroundColor, setBackgroundColor] = useState("white");
	const [textSize, setTextSize] = useState(24);
	const [chapter, setChapter] = useState(1);

	const handleTextColorChange = (color) => {
		setTextColor(color);
	};

	const handleBackgroundColorChange = (color) => {
		setBackgroundColor(color);
	};

	const handleTextSizeChange = (size) => {
		setTextSize(size);
	};

	const handleChapterChange = (chapter) => {
		setChapter(chapter);
	};

	const book = bookManager.getBook(bookId);

	return (
		<div className="read-book-container">
			<ReadBookSidebar onTextSizeChange={handleTextSizeChange} onTextColorsChange={handleTextColorChange} onBackgroundColorChange={handleBackgroundColorChange} onChapterChange={handleChapterChange} totalChapters={Object.keys(book.content).length} />
			<div className="read-book-content" style={{ color: textColor, backgroundColor: backgroundColor }}>
				<h1>{book.title} - Chapter {chapter}</h1>
				<p style={{ fontSize: `${textSize}px` }}>{book.content[chapter]}</p>
			</div>
		</div>
	);
};

export default ReadBook;
