import React, { useState } from "react";
import ReadBookSidebar from "../../components/ReadBookSidebar/ReadBookSidebar.js";

const ReadBook = () => {
	const [textColor, setTextColor] = useState("black");
	const [backgroundColor, setBackgroundColor] = useState("white");
	const [textSize, setTextSize] = useState(12);
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

	return (
		<div className="read-book-container">
			<ReadBookSidebar onTextSizeChange={handleTextSizeChange} onTextColorsChange={handleTextColorChange} onBackgroundColorChange={handleBackgroundColorChange} onChapterChange={handleChapterChange} />
			<div className="read-book-content" style={{ color: textColor, backgroundColor: backgroundColor }}>
				<h1>{"Book name"} - Chapter {chapter}</h1>
				<p style={{ fontSize: `${textSize}px` }}>This is where the book reading functionality will be implemented.This is where the book reading functionality will be implemented.This is where the book reading functionality will be implemented.This is where the book reading functionality will be implemented.This is where the book reading functionality will be implemented.This is where the book reading functionality will be implemented.This is where the book reading functionality will be implemented.This is where the book reading functionality will be implemented.This is where the book reading functionality will be implemented.This is where the book reading functionality will be implemented.This is where the book reading functionality will be implemented.This is where the book reading functionality will be implemented.This is where the book reading functionality will be implemented.This is where the book reading functionality will be implemented.This is where the book reading functionality will be implemented.This is where the book reading functionality will be implemented.This is where the book reading functionality will be implemented.This is where the book reading functionality will be implemented.This is where the book reading functionality will be implemented.This is where the book reading functionality will be implemented.This is where the book reading functionality will be implemented.This is where the book reading functionality will be implemented.This is where the book reading functionality will be implemented.This is where the book reading functionality will be implemented.</p>
			</div>
		</div>
	);
};

export default ReadBook;
