import React from "react";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer"

const Layout = () => {
      return (
    <div>
      <NavBar/>
        <Outlet/>
      <Footer/>
    </div>
  );
};

export default Layout;