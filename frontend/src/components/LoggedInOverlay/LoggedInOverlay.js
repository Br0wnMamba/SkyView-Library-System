import React from "react";
import Button from '@mui/material/Button';
import HistoryIcon from '@mui/icons-material/History';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { RiBookShelfFill } from 'react-icons/ri';
import { IoBookOutline } from 'react-icons/io5';
import { useNavigate } from "react-router-dom";
import "./LoggedInOverlay.css";
import accountManager from '../../utils/AccountManager';

const LoggedInOverlay = ({ is_my_library, is_history, is_on_hold, is_bookmark, onClose, setSnackbar }) => {
	const navigate = useNavigate();

	return (
		<div className="profileSidebarContainer">
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
					startIcon={<RiBookShelfFill style={{ fontSize: 20 }} />}
					fullWidth
					onClick={() => {
						navigate("/bookshelf");
						onClose();
					}}
				>
					My Library
				</Button>
				<Button
					variant="outlined"
					startIcon={<HistoryIcon style={{ fontSize: 20 }} />}
					fullWidth
					onClick={() => {
						navigate("/history");
						onClose();
					}}
				>
					History
				</Button>
				<Button
					variant="outlined"
					startIcon={<PauseCircleOutlineIcon style={{ fontSize: 20 }} />}
					fullWidth
					onClick={() => {
						navigate("/onHold");
						onClose();
					}}
				>
					On Hold
				</Button>
				<Button
					variant="outlined"
					startIcon={<BookmarkBorderOutlinedIcon style={{ fontSize: 20 }} />}
					fullWidth
					onClick={() => {
						navigate("/bookmarks");
						onClose();
					}}
				>
					Bookmarks
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
					}}
				>
					LOG OUT
				</Button>
			</div>
		</div>
	);
};

export default LoggedInOverlay;
