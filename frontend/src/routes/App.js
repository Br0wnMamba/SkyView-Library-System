// App.js
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes"; // Adjust path as needed
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App() {
  return (
    // BrowserRouter wraps the routing logic for a Single Page Application (SPA)
    <>
      <GoogleOAuthProvider clientId="1028188316400-b2ni8lsfm1drh16tbrbjuvlafpvhummb.apps.googleusercontent.com">
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
}
