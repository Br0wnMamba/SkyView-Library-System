import React from "react";
import "./NavBar.css";
import { GiOpenBook } from "react-icons/gi";
import { RiHome2Line } from "react-icons/ri";
import { RiBookShelfLine } from "react-icons/ri";
import { BsCart3 } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

const NavBar = () => {
      return (
        <nav class="navbar-container">
        <div class="nav-container navbar-left">
          
            <div className="SkyViewLogo-Container">
                <GiOpenBook className="icon-skyViewLogo"/>
            <div className="skyView-Name-Container">
                <p className="p-skyViewLogo">
                SkyView Library
                </p>
            </div>
            </div>

        </div>

        <div className="navbar-center">
        <div className="search-container">
            <FaMagnifyingGlass className="search-icon" />
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search for a book or author..."
                />
            </div>
        </div>
      
        <div class="navbar-right">
            <div className="nav-container home-container">
                <RiHome2Line className="icon-home"/>
            </div>

            <div className="nav-container bookshelf-container">
                <RiBookShelfLine className="icon-reservations"/>
            </div>

            <div className="nav-container cart-container">
                <BsCart3 className="icon-cart"/>
            </div>

            <div className="nav-container profile-container">
                <FaRegUser className="icon-user"/>
            </div>
          
        </div>
      </nav>
  );
};

export default NavBar;