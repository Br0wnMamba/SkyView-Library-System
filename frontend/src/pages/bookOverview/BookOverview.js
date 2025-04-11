// Import react components
import { useState } from "react";

// Import css
import "./BookOverview.css";

// Temporarily import a book cover
import bookCover from "../../assets/bookCovers/48Laws.png";

// Import Icons
import { FaPlay, FaUserCircle, FaBook } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { IoMdPhonePortrait } from "react-icons/io";

const BookOverView = () => {
  return (
    <div className="book-overview-page-container">
      <div className="book-overview-container">

        {/* Left Side: Book Image and Options */}
        <div className="book-overview-img-container">
          <img src={bookCover} alt="Book Cover" className="book-overview-cover-img" />

          <div className="book-overview-additional-options">
            <button className="book-overview-option-button">
                Read Sample
            </button>
            <button className="book-overview-option-button">
                <FaPlay /> 
                Audible Sample
            </button>
          </div>
        </div>

        {/* Middle Section: Metadata */}
        <div className="book-overview-metadata-container">
          <div className="book-overview-title-author">
            <h1 className="book-title">The 48 Laws of Power</h1>
            <p className="book-authors">Robert Greene, Joost Elffers</p>
          </div>

          <div className="book-overview-availability-container">
            <div className="availability-item">
              <FaBook className="availability-icon" /> <p>Available</p>
            </div>
            <div className="availability-item">
              <IoMdPhonePortrait className="availability-icon" /> <p>Available</p>
            </div>
          </div>

          <div className="book-overview-description">
            <div className="book-overview-accolades-container">
                <p> 
                    The New York Times Bestseller
                </p>
            </div>

            <div className="book-overview-review-summary-container">
                <p> 
                Amoral, cunning ruthless, and instructive, The 48 Laws of Power is the definite manual for anyone interested in gaining, observing, or defending against ultimate control
                </p>
            </div>

            <div className="book-overview-summary-container">
                <p> 
                In the book that People magazine proclaimed “beguiling” and “fascinating,” Robert Greene and Joost Elffers have distilled three thousand years of the history of power into 48 essential laws by drawing from the philosophies of Machiavelli, Sun Tzu, and Carl Von Clausewitz and also from the lives of figures ranging from Henry Kissinger to P.T. Barnum.
                </p>
            </div>

            <div className="book-overview-summary-container">
                <p> 
                Some laws teach the need for prudence (“Law 1: Never Outshine the Master”), others teach the value of confidence (“Law 28: Enter Action with Boldness”), and many recommend absolute self-preservation (“Law 15: Crush Your Enemy Totally”). Every law, though, has one thing in common: an interest in total domination. In a bold and arresting two-color package, The 48 Laws of Power is ideal whether your aim is conquest, self-defense, or simply to understand the rules of the game.
                </p>
            </div>
          </div>

          <div className="book-overview-authors-section">
            <h2>Learn about the authors</h2>
            <div className="author-entry">
              <FaUserCircle className="author-icon" /> <p>Robert Greene</p>
            </div>
            <div className="author-entry">
              <FaUserCircle className="author-icon" /> <p>Joost Elffers</p>
            </div>
          </div>
        </div>

        <div className="gap">

        </div>

        {/* Right Section: Checkout */}
        <div className="book-overview-checkout-container">
          <h2 className="checkout-title">Checkout</h2>

          <div className="book-overview-checkout-formats">
            <button className="checkout-format-button">Physical</button>
            <button className="checkout-format-button">Digital</button>
          </div>

          <div className="book-overview-pickup-location">
            <CiLocationOn className="pickup-icon" /> <p>Pickup Location</p>
          </div>

          <div className="book-overview-checkout-actions">
            <div className="quantity-label">Quantity</div>
            <button className="checkout-button">Add to Cart</button>
            <button className="checkout-button">Checkout</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookOverView;
