import accountManager from "./AccountManager";

let instance;

class BookmarkManager {
  constructor() {
    if (instance) {
      throw new Error("A bookmark manager has already been initialized");
    }
    instance = this;

    let allBookmarks = sessionStorage.getItem("book_marked");

    if (!allBookmarks) {
      sessionStorage.setItem("book_marked", JSON.stringify({}));
    }
  }

  getInstance() {
    return this;
  }

  #getStoredBookmarks = () => {
    return JSON.parse(sessionStorage.getItem("book_marked")) || {};
  };

  #getUserStoredBookmarks = () => {
    let allBookmarks = this.#getStoredBookmarks();
    return allBookmarks[accountManager.getUser().id] || [];
  };  

  #updateBookmarks = (value) => {
    sessionStorage.setItem("book_marked", JSON.stringify(value));
  };

  addBookmark = accountManager.requireAuth((book_id) => {
    let allBookmarks = this.#getStoredBookmarks();
    let userBookmarks = this.#getUserStoredBookmarks();

    if (userBookmarks && !userBookmarks.includes(book_id)) {
      userBookmarks.push(book_id);
      allBookmarks[accountManager.getUser().id] = userBookmarks;

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
    let userBookmarks = allBookmarks[accountManager.getUser().id];

    if (userBookmarks && userBookmarks.includes(book_id)) {
      const index = userBookmarks.indexOf(book_id);
      userBookmarks.splice(index, 1);

      allBookmarks[accountManager.getUser().id] = userBookmarks;

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

  // Returns if a user currently has a book bookmarked
  isBookmarked = accountManager.requireAuth((book_id) => {
    let bookmarks = this.#getStoredBookmarks();

    return this.#getUserStoredBookmarks(bookmarks).includes(book_id);
  });

  // Returns all bookmarks for currently signed in user
  getAllBookmarks = accountManager.requireAuth(() => {
    let bookmarks = this.#getStoredBookmarks();

    return bookmarks[accountManager.getUser().id] || [];
  });
}

const bookmarkManager = new BookmarkManager();
export default bookmarkManager;
