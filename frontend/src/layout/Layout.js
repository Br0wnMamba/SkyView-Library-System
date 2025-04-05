import React from "react";
import "./Layout.css";
import { Outlet } from "react-router-dom";

const Layout = () => {
      return (
    <div>
        <div>layout</div>
      <Outlet/>
      <div>layout</div>
    </div>
  );
};

export default Layout;