import React from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
	const q = new URLSearchParams(window.location.search).get("q");
	const [value, setValue] = React.useState(q || "");
  const navigate = useNavigate();

  const handleSearch = () => {
	if (value.trim() !== "") {
	  navigate(`/search?q=${encodeURIComponent(value)}`);
	}
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "700px",
        mx: "auto",
      }}
    >
      <TextField
        size="small"
        variant="standard"
        placeholder="Search books..."
		value={value}
		onChange={(e) => setValue(e.target.value)}
		onKeyDown={(e) => {
			if (e.key === "Enter") {
				handleSearch();
			}
		}}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start" onClick={() => {
				handleSearch();
			}} style={{ cursor: "pointer" }}>
              <SearchOutlinedIcon style={{ color: "#16273e" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          width: "100%",
          height: "40px",
          backgroundColor: "white",
          border: "none",
          boxShadow: "none",
          outline: "none",
          "& .MuiInputBase-root": {
            padding: 0,
            pl: 1,
            border: "none",
            boxShadow: "none",
            outline: "none",
          },
          "& .MuiInputBase-input": {
            padding: "8px",
            color: "#16273e",
            border: "none",
            boxShadow: "none",
            outline: "none",
          },
          "& .Mui-focused": {
            border: "none",
            boxShadow: "none",
            outline: "none",
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
