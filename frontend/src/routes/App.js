// App.js
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes"; // Adjust path as needed

export default function App() {
  return (
    // BrowserRouter wraps the routing logic for a Single Page Application (SPA)
    <>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    </>
    
  );
}