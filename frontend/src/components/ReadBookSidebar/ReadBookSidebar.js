import React, { useState } from "react";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import "./ReadBookSidebar.css";
import {
	Radio,
	FormControlLabel,
	FormControl,
	RadioGroup,
	ButtonGroup,
	Button,
	Select,
	MenuItem
} from "@mui/material";

const ReadBookSidebar = ({ onTextColorsChange, onBackgroundColorChange, onTextSizeChange, onChapterChange, totalChapters }) => {
	const [textColor, setTextColor] = useState("black");
	const [backgroundColor, setBackgroundColor] = useState("white");
	const [textSize, setTextSize] = useState(24);
	const [chapter, setChapter] = useState(1);

	const handleTextColorChange = (event) => {
		setTextColor(event.target.value);
		onTextColorsChange(event.target.value);
	};

	const handleBackgroundColorChange = (event) => {
		setBackgroundColor(event.target.value);
		onBackgroundColorChange(event.target.value);
	};

	const handleTextSizeChange = (newSize) => {
		setTextSize(newSize);
		onTextSizeChange(newSize);
	};

	const handleChapterChange = (event) => {
		setChapter(event.target.value);
		onChapterChange(event.target.value);
	};

	return (
		<div className="readBookSidebar-container">
			<div className="readBookSidebar-header">
				<SettingsOutlinedIcon style={{ width: 25, height: 25 }} />
				<h3>Settings</h3>
			</div>
			<hr />
			<div className="readBookSidebar-options">
				<h4>Text Color</h4>
				<FormControl component="fieldset">
					<RadioGroup value={textColor} onChange={handleTextColorChange}>
						{["white", "black", "yellow", "blue", "red", "green"].map(color => (
							<FormControlLabel key={color} value={color} control={<Radio color="default" />} label={color.charAt(0).toUpperCase() + color.slice(1)} />
						))}
					</RadioGroup>
				</FormControl>
				<hr />
				<h4>Background Color</h4>
				<FormControl component="fieldset">
					<RadioGroup value={backgroundColor} onChange={handleBackgroundColorChange}>
						{["white", "black", "yellow", "blue", "red", "green"].map(color => (
							<FormControlLabel key={color} value={color} control={<Radio color="default" />} label={color.charAt(0).toUpperCase() + color.slice(1)} />
						))}
					</RadioGroup>
				</FormControl>
				<hr />
				<div className="text-chapter-container">
					<h4>Text Size</h4>
					<ButtonGroup size="small" aria-label="text size control">
						<Button
							variant="outlined"
							color="default"
							disabled={textSize <= 1}
							onClick={() => handleTextSizeChange(textSize - 1)}
							style={{ borderRight: "1px solid #000" }}
						>-</Button>
						<Button
							variant="outlined"
							color="default"
							disabled
							style={{ borderLeft: "none", borderRight: "none" }}
						>{textSize}</Button>
						<Button
							variant="outlined"
							color="default"
							disabled={textSize >= 50}
							onClick={() => handleTextSizeChange(textSize + 1)}
						>+</Button>
					</ButtonGroup>
				</div>
				<hr />
				<div className="text-chapter-container">
					<h4>Chapter</h4>
					<FormControl variant="outlined" size="small">
						<Select value={chapter} onChange={handleChapterChange} style={{ width: "120px" }}>
							{Array.from({ length: totalChapters }, (_, index) => (
								<MenuItem key={index + 1} value={index + 1}>
									Chapter {index + 1}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
			</div>
		</div>
	);
};

export default ReadBookSidebar;
