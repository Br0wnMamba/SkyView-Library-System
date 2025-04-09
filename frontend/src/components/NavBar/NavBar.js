import React, { useState } from "react";
import "./NavBar.css";
import { GiOpenBook } from "react-icons/gi";
import { RiHome2Line } from "react-icons/ri";
import { RiBookShelfLine } from "react-icons/ri";
import { BsCart3 } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Search from "../Search/Search.js";

const NavBar = () => {

  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

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
            <Search
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            />
        </div>
      
        <div class="navbar-right">
            <div className="nav-container bookshelf-container" onClick={() => navigate("/profile/bookshelf")}>
                <RiBookShelfLine className="icon-reservations"/>
            </div>

            <div className="nav-container home-container" onClick={() => navigate("/")}>
                <RiHome2Line className="icon-home"/>
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