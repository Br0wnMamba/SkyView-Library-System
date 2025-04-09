import { Outlet, NavLink } from "react-router-dom";
import "./Styles/Profile.css";
import { RiBookShelfLine } from "react-icons/ri";
import { RiBookmarkLine } from "react-icons/ri";
import { RiHistoryFill } from "react-icons/ri";
import { RiPauseCircleLine } from "react-icons/ri";


const ProfileLayout = () => {

    const profileLinks = [
        { name: "Book Shelf", path: "bookshelf", icon: RiBookShelfLine },
        { name: "History", path: "history", icon:RiHistoryFill },
        { name: "On Hold", path: "onHold", icon: RiPauseCircleLine },
        { name: "BookMarks", path: "bookmarks", icon: RiBookmarkLine },
      ];

    return (
        <>
            <div className="site-container">
                {/* Main Overlay for profile page split into two sections */}
                <div className="profile-page-container">

                    <div className="profile-navbar">

                        <div className="profile-navbar-title-container">
                            <h2 className="profile-navbar-title">Profile Settings</h2>
                        </div>
                        <div className="profile-list-settings">
                            {profileLinks.map((item) => (
                                <NavLink
                                key={item.path}
                                to={`/profile/${item.path}`}
                                className={({ isActive }) =>
                                    `profile-link ${isActive ? "active" : ""}`
                                }
                                >
                                 {({ isActive }) => {
                                    const IconComponent = item.icon;
                                    return (
                                    <div className="profile-link-content">
                                        <IconComponent className={`profile-icon ${isActive ? "profile-icon-active" : ""}`} />
                                        <span>{item.name}</span>
                                    </div>
                                    );
                                }}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    <div className="profile-outlet">
                        <Outlet/> 
                    </div>
                </div>
            </div>         
        </>
    )
}



export default ProfileLayout;