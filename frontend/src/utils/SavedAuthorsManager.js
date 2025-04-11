import accountManager from "./AccountManager";
import { Authors } from '../data/Authors';
let instance;

class SavedAuthorsManager {
  constructor() {
    if (instance) {
      throw new Error("A saved authors manager has already been initialized");
    }
    instance = this;

    let allAuthors = sessionStorage.getItem("saved_authors");

    if (!allAuthors) {
      allAuthors = Authors;
      sessionStorage.setItem("saved_authors", JSON.stringify(Authors));
    }
  }

  getInstance() {
    return this;
  }

  #getStoredAuthors = () => {
    return JSON.parse(sessionStorage.getItem("saved_authors")) || {};
  };

  getUserStoredAuthors = () => {
    let allAuthors = this.#getStoredAuthors();
    console.log("[DEBUG] allAuthors (raw):", allAuthors);
    const userId = accountManager.getCardNumber();
    const userAuthors = allAuthors?.[userId];
    if (!Array.isArray(userAuthors)) {
      console.warn("[WARN] No authors found for user ID:", userId);
    }
    console.log("[DEBUG] savedAuthors (raw):", userAuthors);
    return Array.isArray(userAuthors) ? userAuthors : [];
  };

  #updateAuthors = (value) => {
    sessionStorage.setItem("saved_authors", JSON.stringify(value));
  };

  addAuthor = accountManager.requireAuth((author) => {
    let allAuthors = this.#getStoredAuthors();
    const userId = accountManager.getCardNumber();
    let userSavedAuthors = Array.isArray(allAuthors[userId])
      ? allAuthors[userId]
      : [];

    if (!userSavedAuthors.includes(author)) {
      userSavedAuthors.push(author);
      allAuthors[userId] = userSavedAuthors;
      this.#updateAuthors(allAuthors);

      return {
        status: 200,
        message: "Successfully added",
      };
    }

    return {
      status: 400,
      message: "Author already saved",
    };
  });

  removeAuthor = accountManager.requireAuth((author) => {
    let allAuthors = this.#getStoredAuthors();
    const userId = accountManager.getCardNumber();
    let userSavedAuthors = Array.isArray(allAuthors[userId])
      ? allAuthors[userId]
      : [];

    const updatedAuthors = userSavedAuthors.filter((a) => a !== author);
    if (updatedAuthors.length !== userSavedAuthors.length) {
      allAuthors[userId] = updatedAuthors;
      this.#updateAuthors(allAuthors);

      return {
        status: 200,
        message: "Successfully removed",
      };
    }

    return {
      status: 404,
      message: "Author not found",
    };
  });

  isSavedAuthor = accountManager.requireAuth((author) => {
    const allAuthors = this.#getStoredAuthors();
    const userId = accountManager.getCardNumber();
    const userSavedAuthors = allAuthors[userId] || [];

    return userSavedAuthors.includes(author);
  });
}

const savedAuthorsManager = new SavedAuthorsManager();
export default savedAuthorsManager;
