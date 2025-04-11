import React from "react";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer"
import NavBar from "../components/NavBar/NavBar";

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