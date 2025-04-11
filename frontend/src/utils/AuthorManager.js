import accountManager from "./AccountManager";
import {authors} from "../data/authors";

let instance;

class AuthorManager {
  constructor() {
    if (instance) {
      throw new Error("SavedAuthorManager already initialized");
    }
    instance = this;

    let allSavedAuthors = sessionStorage.getItem("saved_authors");

    if (!allSavedAuthors) {
	  allSavedAuthors = authors;
      sessionStorage.setItem("saved_authors", JSON.stringify({}));
    }
  }

  getInstance() {
    return this;
  }

  #getStoredAuthors = () => {
    return JSON.parse(sessionStorage.getItem("saved_authors")) || {};
  };

  getUserSavedAuthors = () => {
    const allAuthors = this.#getStoredAuthors();
    return allAuthors[accountManager.getCardNumber()] || [];
  };

  #updateAuthors = (value) => {
    sessionStorage.setItem("saved_authors", JSON.stringify(value));
  };

  addAuthor = accountManager.requireAuth((authorName) => {
    let allAuthors = this.#getStoredAuthors();
    let userAuthors = this.getUserSavedAuthors();

    if (!userAuthors.includes(authorName)) {
      userAuthors.push(authorName);
      allAuthors[accountManager.getCardNumber()] = userAuthors;

      this.#updateAuthors(allAuthors);

      return {
        status: 200,
        message: "Author saved successfully",
      };
    }

    return {
      status: 400,
      message: "Author already saved",
    };
  });

  removeAuthor = accountManager.requireAuth((authorName) => {
    let allAuthors = this.#getStoredAuthors();
    let userAuthors = allAuthors[accountManager.getCardNumber()] || [];

    const index = userAuthors.indexOf(authorName);
    if (index > -1) {
      userAuthors.splice(index, 1);
      allAuthors[accountManager.getCardNumber()] = userAuthors;

      this.#updateAuthors(allAuthors);

      return {
        status: 200,
        message: "Author removed successfully",
      };
    }

    return {
      status: 400,
      message: "Author not found",
    };
  });

  isAuthorSaved = accountManager.requireAuth((authorName) => {
    const userAuthors = this.getUserSavedAuthors();
    return userAuthors.includes(authorName);
  });

  getAllSavedAuthors = accountManager.requireAuth(() => {
    return this.getUserSavedAuthors();
  });
}

const savedAuthorManager = new AuthorManager();
export default savedAuthorManager;
