import React from "react";
import Button from '@mui/material/Button';
import HistoryIcon from '@mui/icons-material/History';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { RiBookShelfFill } from 'react-icons/ri';
import { IoBookOutline } from 'react-icons/io5';
import { useNavigate, useLocation } from "react-router-dom";
import "./LoggedInOverlay.css";
import accountManager from '../../utils/AccountManager';

const LoggedInOverlay = ({ onClose, setSnackbar }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const currentPath = location.pathname;

	return (
		<div className="profileSidebarContainer">
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <button
          onClick={onClose}
          className="closeButton"
        >
          <ClearOutlinedIcon className="closeButtonIcon" />
        </button>
      </div>
			<div className="profileSidebarHeaderLarge">
				<IoBookOutline className="profileSidebarPictureLarge"/>
				<h4 className="profileSidebarSubtitle">Skyview Library</h4>
				<h2 className="profileSidebarWelcome">Welcome Back!</h2>
				<p className="profileSidebarDescription">Manage your books and account information here</p>
			</div>
			<hr />
			<div className="profileSidebarButtons">
				<Button
					variant="outlined"
					startIcon={<RiBookShelfFill />}
					fullWidth
					disabled={currentPath === "/bookshelf"}
					onClick={() => {
						navigate("/bookshelf");
						onClose();
					}}
				>
					My Library
				</Button>
				<Button
					variant="outlined"
					startIcon={<HistoryIcon />}
					fullWidth
					disabled={currentPath === "/history"}
					onClick={() => {
						navigate("/history");
						onClose();
					}}
				>
					History
				</Button>
				<Button
					variant="outlined"
					startIcon={<PauseCircleOutlineIcon />}
					fullWidth
					disabled={currentPath === "/onHold"}
					onClick={() => {
						navigate("/onHold");
						onClose();
					}}
				>
					On Hold
				</Button>
				<Button
					variant="outlined"
					startIcon={<BookmarkBorderOutlinedIcon />}
					fullWidth
					disabled={currentPath === "/bookmarks"}
					onClick={() => {
						navigate("/bookmarks");
						onClose();
					}}
				>
					Bookmarked
				</Button>
        
				<Button
					variant="contained"
					startIcon={<LogoutOutlinedIcon />}
					fullWidth
					className="logoutButton"
					onClick={() => {
						accountManager.removeUser();
						setSnackbar({ open: true, message: "Logout successful!", severity: "success" });
						onClose();
            navigate("/");
					}}
				>
					LOG OUT
				</Button>
			</div>
		</div>
	);
};

export default LoggedInOverlay;
