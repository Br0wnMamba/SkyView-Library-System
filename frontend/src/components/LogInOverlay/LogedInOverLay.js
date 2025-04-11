import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../routes/AuthContext';
import { GiOpenBook } from "react-icons/gi";
import { RiHistoryFill } from "react-icons/ri";
import { MdPauseCircleFilled, MdLogout } from "react-icons/md";
import { FaBookmark, FaBookOpen } from "react-icons/fa";

const LoggedInOverlay = ({ onClose }) => {
  const { logout, userEmail } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to the home page after logout
  };

  const onNavigate = (path) => {
    navigate(path, { replace: true });
  };

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
        {/* Full-width blue header */}
        <div className="login-overlay-header-container">
          <div className="login-overlay-logo-container">
            <GiOpenBook className="login-overlay-icon-skyViewLogo" />
            <p className='login-overlay-skyView-text'>SkyView Library</p>
          </div>
          <button className="login-overlay-header-close-button" onClick={onClose}>X</button>
        </div>

        {/* Navigation body */}
        <div className="login-overlay-body">
          <div className="login-overlay-title-welcome-information-container">
            <p className="welcome-heading">Hello, {userEmail || 'Reader'}</p>
            <p className="welcome-subtext">Manage your books and account information here</p>
          </div>

          <div className="login-overlay-nav-buttons-group">
            <button className="nav-button" onClick={() => onNavigate("/profile/bookshelf")}> <FaBookOpen className="nav-icon" /> Book Shelf </button>
            <button className="nav-button" onClick={() => onNavigate("/profile/history")}> <RiHistoryFill className="nav-icon" /> History </button>
            <button className="nav-button" onClick={() => onNavigate("/profile/onHold")}> <MdPauseCircleFilled className="nav-icon" /> On Hold </button>
            <button className="nav-button" onClick={() => onNavigate("/profile/bookmarks")}> <FaBookmark className="nav-icon" /> Bookmarked </button>
          </div>

          <div className="login-overlay-logout-button-wrapper">
            <button className="nav-button logout" onClick={handleLogout}> <MdLogout className="nav-icon" /> Log Out </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoggedInOverlay;
