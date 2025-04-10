import { Books } from "../data/Book";

let instance;

class BookManager {
  constructor() {
    if (instance) {
      throw new Error("A bookmark manager has already been initialized");
    }
    instance = this;

    let storedBooks = sessionStorage.getItem("books");

    if (storedBooks === null) {
      storedBooks = Books;

      sessionStorage.setItem("books", JSON.stringify(storedBooks));
    }
  }

  getInstance() {
    return this;
  }

  #getStoredBooks = () => {
    return JSON.parse(sessionStorage.getItem("books")) || {};
  };

  #updateStoredBooks = (books) => {
    return sessionStorage.setItem("books", JSON.stringify(books));
  };

  getBook = (book_id) => {
    const books = JSON.parse(sessionStorage.getItem("books"));

    if (books && books[book_id]) {
      return {
        id: book_id,
        ...books[book_id],
      };
    }

    return null;
  };

  getAllBooks = () => {
    let books = JSON.parse(sessionStorage.getItem("books"));
    let result = [];

    Object.entries(books).forEach(([id, book]) => {
      result.push({
        id: id,
        ...book,
      });
    });

    return result;
  };

  updateCopies = (book_id, type, quantity) => {
    let books = this.#getStoredBooks();
    let options = ["digital", "physical"];

    if (books[book_id] && quantity >= 0 && options.includes(type)) {
      books[book_id].availability[type] = quantity;

      this.#updateStoredBooks(books);
    }
  };
}

const bookManager = new BookManager();
export default bookManager;