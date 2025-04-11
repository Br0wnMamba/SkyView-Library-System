import accountManager from "./AccountManager";
import {bookmarked} from "../data/bookmarked";

let instance;

class BookmarkManager {
  constructor() {
    if (instance) {
      throw new Error("A bookmark manager has already been initialized");
    }
    instance = this;

    let allBookmarks = sessionStorage.getItem("book_marked");

    if (!allBookmarks) {
      allBookmarks = bookmarked;
      sessionStorage.setItem("book_marked", JSON.stringify(bookmarked));
    }
  }

  getInstance() {
    return this;
  }

  #getStoredBookmarks = () => {
    return JSON.parse(sessionStorage.getItem("book_marked")) || {};
  };

  getUserStoredBookmarks = () => {
    let allBookmarks = this.#getStoredBookmarks();
    return allBookmarks[accountManager.getCardNumber()] || {};
  };

  #updateBookmarks = (value) => {
    sessionStorage.setItem("book_marked", JSON.stringify(value));
  };

  addBookmark = accountManager.requireAuth((book_id) => {
    let allBookmarks = this.#getStoredBookmarks();
    let userBookmarks = this.getUserStoredBookmarks();

    if (!userBookmarks[book_id]) {
      userBookmarks[book_id] = { bookmarked_on: new Date().toISOString().split("T")[0] };
      allBookmarks[accountManager.getCardNumber()] = userBookmarks;

      this.#updateBookmarks(allBookmarks);

      return {
        status: 200,
        message: "Successfully bookmarked",
      };
    }

    return {
      status: 400,
      message: "Book already bookmarked",
    };
  });

  removeBookmark = accountManager.requireAuth((book_id) => {
    let allBookmarks = this.#getStoredBookmarks();
    let userBookmarks = allBookmarks[accountManager.getCardNumber()];

    if (userBookmarks && userBookmarks[book_id]) {
      delete userBookmarks[book_id];
      allBookmarks[accountManager.getCardNumber()] = userBookmarks;
      this.#updateBookmarks(allBookmarks);

      return {
        status: 200,
        message: "Successfully removed bookmark",
      };
    }

    return {
      status: 400,
      message: "Unable to remove bookmark",
    };
  });

  isBookmarked = accountManager.requireAuth((book_id) => {
    let bookmarks = this.#getStoredBookmarks();

    return !!this.getUserStoredBookmarks()[book_id];
  });

  getAllBookmarks = accountManager.requireAuth(() => {
    let bookmarks = this.#getStoredBookmarks();

    return bookmarks[accountManager.getCardNumber()] || {};
  });
}

const bookmarkManager = new BookmarkManager();
export default bookmarkManager;
