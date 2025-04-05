import React from "react";
import ProfilePicture from "../../assets/userProfile.png";
import HistoryLogo from "../../assets/profile-sidebar-history.svg";
import MyLibraryLogo from "../../assets/profile-sidebar-library.svg";
import OnHoldLogo from "../../assets/profile-sidebar-hold.svg";
import BookmarksLogo from "../../assets/profile-sidebar-bookmark.svg";
import { useNavigate } from "react-router-dom";
import "./ProfileSidebar.css";

const ProfileSidebar = ({ is_my_library, is_history, is_on_hold, is_bookmark }) => {
	const navigate = useNavigate();

	return (
		<div className="profileSidebar-container">
			<div className="profileSidebar-header">
				<img src={ProfilePicture} alt="Profile" className="profileSidebar-picture" width={"25px"} height={"25px"} />
				<h3 className="profileSidebar-name">Profile</h3>
			</div>
			<hr />
			<div className="profileSidebar-buttons">
				<button className={`profileSidebar-button ${is_my_library ? "active" : ""}`} onClick={() => navigate("/bookShelf")}>
					<img src={MyLibraryLogo} alt="My Library" className="profileSidebar-icon" />
					My Library
				</button>
				<button className={`profileSidebar-button ${is_history ? "active" : ""}`} onClick={() => navigate("/history")}>
					<img src={HistoryLogo} alt="History" className="profileSidebar-icon" />
					History
				</button>
				<button className={`profileSidebar-button ${is_on_hold ? "active" : ""}`} onClick={() => navigate("/onHold")}>
					<img src={OnHoldLogo} alt="On Hold" className="profileSidebar-icon" />
					On Hold
				</button>
				<button className={`profileSidebar-button ${is_bookmark ? "active" : ""}`} onClick={() => navigate("/bookmarks")}>
					<img src={BookmarksLogo} alt="Bookmarks" className="profileSidebar-icon" />
					Bookmarks
				</button>
			</div>
		</div>
	);
};

export default ProfileSidebar;
