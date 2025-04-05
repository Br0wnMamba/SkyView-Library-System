import React from "react";
import "./Layout.css";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout-container">
      {/* Top nav or header */}
      <header className="layout-header">
        SkyView Public Library
      </header>

      {/* Main content from routing */}
      <main className="layout-content">
        <Outlet />
      </main>

      {/* Optional footer */}
      <footer className="layout-footer">
        &copy; 2025 SkyView Library System
      </footer>
    </div>
  );
};

export default Layout;
