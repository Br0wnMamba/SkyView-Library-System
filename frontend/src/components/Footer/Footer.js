import React from "react";
import "./Footer.css";
import { FaBookOpen } from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-top">
				<a href="#top" className="back-to-top">Back to top</a>
			</div>
			<div className="footer-main">
				<div className="footer-column logo-column">
					<FaBookOpen className="footer-logo" />
					<p>Skyview Library</p>
				</div>
				<div className="footer-column">
					<p><a href="/bookshelf">My Library</a></p>
					<p><a href="/history">History</a></p>
				</div>
				<div className="footer-column">
					<p><a href="/onHold">On Hold</a></p>
					<p><a href="/bookmarks">Bookmarks</a></p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
