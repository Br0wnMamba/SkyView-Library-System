import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

const Search = ({ buttonName, onFilterChange }) => {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");
	const [showFilters, setShowFilters] = useState(false);
	const filterRef = useRef(null);
	const [showFilterOptions, setShowFilterOptions] = useState({
		"Genre": true,
		"Media Format": true,
		"Saved Authors": true,
	});
	const [filters, setFilters] = useState({
		"Genre": {
			"Fiction": false,
			"Non-Fiction": false,
			"History": false,
			"Mystery": false,
			"Science Fiction": false,
			"Romantic": false,
			"Thriller": false,
			"Horror Fiction": false,
			"Biography": false,
		},
		"Media Format": {
			"Physical": false,
			"Digital": false,
		},
		"Saved Authors": {},
	})

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (filterRef.current && !filterRef.current.contains(event.target)) {
				setShowFilters(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		const saved_authors = sessionStorage.getItem("saved_authors") || "[]";
		const parsed_authors = JSON.parse(saved_authors);

		if (parsed_authors.length > 0) {
			setFilters((prev) => ({
				...prev,
				"Saved Authors": parsed_authors.reduce((acc, author) => {
					acc[author] = false;
					return acc;
				}, {}),
			}));
		};
	}, []);

	const handleFilterChange = (category, value) => {
		setFilters((prev) => {
			const updatedFilters = {
				...prev,
				[category]: {
					...prev[category],
					[value]: !prev[category][value],
				},
			};

			if (onFilterChange) {
				onFilterChange(updatedFilters);
			} else {
				const params = new URLSearchParams();
				Object.keys(updatedFilters).forEach((key) => {
					Object.keys(updatedFilters[key]).forEach((subKey) => {
						if (updatedFilters[key][subKey]) {
							params.append(key.toLowerCase().replace(/ /g, "_"), subKey);
						}
					});
				});
				navigate(`/search?${params.toString()}`);
			}
			return updatedFilters;
		});
	};

	return (
		<div className="search-container">
			<div className="search-button">
				<button className="dropdown-button" onClick={() => setShowFilters(!showFilters)}>{
					buttonName ? buttonName : "All"
				} &nbsp;&nbsp; <b>⌵</b></button>
			</div>
			<div className="search-bar">
				<input
					type="text"
					placeholder="Search for books!"
					onChange={(e) => setSearchTerm(e.target.value)}
					onKeyDown={
						(e) => {
							if (e.key === "Enter") {
								if (onFilterChange) {
									onFilterChange(searchTerm);
								} else {
									const params = new URLSearchParams();
									params.append("search", searchTerm);
									navigate(`/search?${params.toString()}`);
								}
							}
						}
					}
				/>
			</div>
			{showFilters && (
				<div className="filter-container" ref={filterRef}>
					<div className="filter">
						<h4 onClick={() => setShowFilterOptions((prev) => ({
							...prev,
							"Genre": !prev["Genre"],
						}))}> Genre &nbsp;&nbsp; <b>{showFilterOptions["Genre"] ? "^" : "⌵"}</b></h4>
						{showFilterOptions["Genre"] && (
							<div className="filter-options">
								{Object.keys(filters["Genre"]).map((genre) => (
									<label key={genre}>
										<input
											type="checkbox"
											checked={filters["Genre"][genre]}
											onChange={() => handleFilterChange("Genre", genre)}
										/>
										{genre}
									</label>
								))}
							</div>
						)}
					</div>
					<div className="filter">
						<h4 onClick={() => setShowFilterOptions((prev) => ({
							...prev,
							"Media Format": !prev["Media Format"],
						}))}> Media Format &nbsp;&nbsp; <b>{showFilterOptions["Media Format"] ? "^" : "⌵"}</b></h4>
						{showFilterOptions["Media Format"] && (
							<div className="filter-options">
								{Object.keys(filters["Media Format"]).map((format) => (
									<label key={format}>
										<input
											type="checkbox"
											checked={filters["Media Format"][format]}
											onChange={() => {
												handleFilterChange("Media Format", format);
											}}
										/>
										{format}
									</label>
								))}
							</div>
						)}
					</div>
					<div className="filter">
						<h4 onClick={() => setShowFilterOptions((prev) => ({
							...prev,
							"Saved Authors": !prev["Saved Authors"],
						}))}> Saved Authors &nbsp;&nbsp; <b>{showFilterOptions["Saved Authors"] ? "^" : "⌵"}</b></h4>
						{showFilterOptions["Saved Authors"] && (
							<div className="filter-options">
								{Object.keys(filters["Saved Authors"]).map((author) => (
									<label key={author}>
										<input
											type="checkbox"
											checked={filters["Saved Authors"][author]}
											onChange={() => {
												handleFilterChange("Saved Authors", author);
											}}
										/>
										{author}
									</label>
								))}
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default Search;