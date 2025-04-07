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
          <p>Library Name</p>
        </div>

        <div className="footer-column">
          <p><a href="#">Contact us</a></p>
          <p><a href="#">Careers</a></p>
        </div>

        <div className="footer-column">
          <p><a href="#">Contact us</a></p>
          <p><a href="#">Hours & Locations</a></p>
        </div>

        <div className="footer-column">
          <p><a href="#">Our Mission</a></p>
          <p><a href="#">Support the library</a></p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Library name</p>
        <span className="divider" />
        <a href="#">Accessibility</a>
        <span className="divider" />
        <a href="#">Library Services Agreement</a>
        <span className="divider" />
        <a href="#">Privacy</a>
        <span className="divider" />
        <a href="#">Terms of Use</a>
      </div>
    </footer>
  );
};

export default Footer;
