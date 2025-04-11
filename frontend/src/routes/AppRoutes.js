// AppRoutes.js
import {React} from "react";
import {Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext.js';

// Import all components
import Home from '../pages/home/Home.js';
import Layout from "../layout/Layout.js";
import BookOverview from '../pages/bookOverview/BookOverview.js';
import Cart from "../pages/cart/Cart.js"
import BookShelf from '../pages/profile/BookShelf.js';
import ReadBook from '../pages/profile/ReadBook.js';
import History from '../pages/profile/History.js';
import OnHold from '../pages/profile/OnHold.js';
import Bookmarks from '../pages/profile/Bookmarks.js';
import LogIn from "../components/LogInOverlay/LogIn.js";
import Search from "../components/Search/Search.js";
import ProfileLayout from "../pages/profile/ProfileLayout.js";
import SearchResults from "../pages/SearchResults/SearchResults.js";
import LoggedInOverlay from "../components/LogInOverlay/LogedInOverLay.js";


// Define the main App component that sets up the router and routes.
export default function AppRoutes() {

  const location = useLocation();
  const state = location.state;
  let routeNavigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* Routes container to define all possible paths in the application. */}
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Layout />}>                    {/* Renders layout which will include shared UI elements (e.g. navbar, searchbar etc) */}
          <Route index element={<Home />} />                     {/* index is the default child of the "/" path*/}
          <Route path="search" element={<SearchResults />} />
          <Route path="book/:bookId" element={<BookOverview />} />
          <Route path="cart" element={<Cart />} />
          <Route path="profile" element={<ProfileLayout />}>
            <Route index element={<BookShelf />} />  
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
          <Route
            path="/login"
            element={
              isAuthenticated
                ? <LoggedInOverlay onClose={() => routeNavigate(-1)} />
                : <LogIn onClose={() => routeNavigate(-1)} />
            }
          />
        </Routes>
      )}
    </>
  );
}
        





