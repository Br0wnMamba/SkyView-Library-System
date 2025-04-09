import React from "react";
import Button from '@mui/material/Button';
import HistoryIcon from '@mui/icons-material/History';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { RiBookShelfFill } from 'react-icons/ri';
import "./ProfileSidebar.css";
import  {useNavigate } from "react-router-dom";
import ProfilePicture from "../../assets/bookoverview-user-profile.svg";

const ProfileSidebar = ({ is_my_library, is_history, is_on_hold, is_bookmark }) => {
	const navigate = useNavigate();

	return (
		<div className="profileSidebar-container">
			<div className="profileSidebar-header">
				<img src={ProfilePicture} alt="Profile" width={"25px"} height={"25px"} />
				<h3>Profile</h3>
			</div>
			<hr />
			<div className="profileSidebar-buttons">
				<Button
					variant="outlined"
					startIcon={<RiBookShelfFill />}
					fullWidth
					disabled={is_my_library}
					onClick={() => navigate("/bookShelf")}
				>
					My Library
				</Button>
				<Button
					variant="outlined"
					startIcon={<HistoryIcon />}
					fullWidth
					disabled={is_history}
					onClick={() => navigate("/history")}
				>
					History
				</Button>
				<Button
					variant="outlined"
					startIcon={<PauseCircleOutlineIcon />}
					fullWidth
					disabled={is_on_hold}
					onClick={() => navigate("/onHold")}
				>
					On Hold
				</Button>
				<Button
					variant="outlined"
					startIcon={<BookmarkBorderOutlinedIcon />}
					fullWidth
					disabled={is_bookmark}
					onClick={() => navigate("/bookmarks")}
				>
					Bookmarked
				</Button>
			</div>
		</div>
	);
};

export default ProfileSidebar;
