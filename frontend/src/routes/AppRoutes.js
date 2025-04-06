// AppRoutes.js
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Import all components
import Home from '../pages/home/Home.js';
import Layout from "../layout/Layout.js";
import Search from "../components/Search/Search.js"
import BookOverview from '../pages/bookOverview/BookOverview.js';
import Cart from "../pages/cart/Cart.js"
import Profile from '../pages/profile/Profile.js';
import BookShelf from '../pages/profile/BookShelf.js';
import ReadBook from '../pages/profile/ReadBook.js';
import History from '../pages/profile/History.js';
import OnHold from '../pages/profile/OnHold.js';
import Bookmarks from '../pages/profile/Bookmarks.js';
import Login from '../pages/registration/Login.js';
import Signup from '../pages/registration/Signup.js';


// Define the main App component that sets up the router and routes.
export default function AppRoutes() {

  const location = useLocation();
  const state = location.state;

  return (
    <>
      {/* Routes container to define all possible paths in the application. */}
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Layout />}>                    {/* Renders layout which will include shared UI elements (e.g. navbar, searchbar etc) */}
          <Route index element={<Home />} />                     {/* index is the default child of the "/" path*/}
          <Route path="search" element={<Search />} />
          <Route path="book/:bookId" element={<BookOverview />} />
          <Route path="cart" element={<Cart />} />
          <Route path="profile" element={<Profile />}>
            <Route path="bookshelf" element={<BookShelf />} />
            <Route path="bookshelf/:bookId" element={<ReadBook />} />
            <Route path="history" element={<History />} />
            <Route path="onHold" element={<OnHold />} />
            <Route path="bookmarks" element={<Bookmarks />} />
          </Route>
        </Route>
      </Routes>

      {/* Model login overlay route so that no matter where we are in the application we will stay on the same page when clicking login */}
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </>
  );
}
        





