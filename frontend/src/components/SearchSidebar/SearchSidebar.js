import React, { useState } from "react";
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import "./SearchSidebar.css";

const SearchSidebar = ({
	onGenreUpdate,
	onMediaFormatUpdate,
	onSaveAuthorsUpdate,
	genreOptions,
	mediaFormatOptions,
	savedAuthorOptions
}) => {
	const [genreOptionsOpen, setGenreOptionsOpen] = useState(true);
	const [mediaFormatOptionsOpen, setMediaFormatOptionsOpen] = useState(true);
	const [saveAuthorsOptionsOpen, setSaveAuthorsOptionsOpen] = useState(true);

	const [selectedGenre, setSelectedGenre] = useState([]);
	const [selectedMediaFormat, setSelectedMediaFormat] = useState([]);
	const [selectedSaveAuthors, setSelectedSaveAuthors] = useState([]);

	const handleChange = (value, selectedList, setList, onUpdate) => {
		onUpdate(value);
		if (selectedList.includes(value)) {
			setList(selectedList.filter((v) => v !== value));
		} else {
			setList([...selectedList, value]);
		}
	};

	return (
		<div className="search-sidebar-container">
			<div className="search-sidebar-header">
				<FilterListOutlinedIcon style={{ width: 25, height: 25 }} />
				<h3>Filters</h3>
			</div>
			<hr />
			<div className="filter">
				<h4 onClick={() => setGenreOptionsOpen(!genreOptionsOpen)}>
					Genre &nbsp; &nbsp; <b>{genreOptionsOpen ? "^" : "⌵"}</b>
				</h4>
				{genreOptionsOpen && (
					<div className="filter-options">
						{genreOptions.map((option) => (
							<label key={option}>
								<input
									type="checkbox"
									value={option}
									onChange={() =>
										handleChange(option, selectedGenre, setSelectedGenre, onGenreUpdate)
									}
									checked={selectedGenre.includes(option)}
								/>
								{option}
							</label>
						))}
					</div>
				)}
			</div>
			<hr />
			<div className="filter">
				<h4 onClick={() => setMediaFormatOptionsOpen(!mediaFormatOptionsOpen)}>
					Media Format &nbsp; &nbsp; <b>{mediaFormatOptionsOpen ? "^" : "⌵"}</b>
				</h4>
				{mediaFormatOptionsOpen && (
					<div className="filter-options">
						{mediaFormatOptions.map((option) => (
							<label key={option}>
								<input
									type="checkbox"
									value={option}
									onChange={() =>
										handleChange(option, selectedMediaFormat, setSelectedMediaFormat, onMediaFormatUpdate)
									}
									checked={selectedMediaFormat.includes(option)}
								/>
								{option}
							</label>
						))}
					</div>
				)}
			</div>
			<hr />
			<div className="filter">
				<h4 onClick={() => setSaveAuthorsOptionsOpen(!saveAuthorsOptionsOpen)}>
					Saved Authors &nbsp; &nbsp; <b>{saveAuthorsOptionsOpen ? "^" : "⌵"}</b>
				</h4>
				{saveAuthorsOptionsOpen && (
					<div className="filter-options">
						{savedAuthorOptions.map((option) => (
							<label key={option}>
								<input
									type="checkbox"
									value={option}
									onChange={() =>
										handleChange(option, selectedSaveAuthors, setSelectedSaveAuthors, onSaveAuthorsUpdate)
									}
									checked={selectedSaveAuthors.includes(option)}
								/>
								{option}
							</label>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default SearchSidebar;
