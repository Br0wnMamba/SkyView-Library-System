import React from "react";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

const Layout = () => {
      return (
    <div>
        <NavBar/>
      <Outlet/>
      <div>Footer</div>
    </div>
  );
};

export default Layout;
