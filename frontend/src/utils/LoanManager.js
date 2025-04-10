import accountManager from "./AccountManager";
import bookManager from "./BookManager";
import { Loans } from "../data/Loans";

let instance;

// Handles users checked out books
class LoanManager {
  constructor() {
    if (instance) {
      throw new Error("A cart manager has already been initialized");
    }
    instance = this;

    let storedLoans = sessionStorage.getItem("loans");

    if (storedLoans === null) {
      storedLoans = Loans;

      sessionStorage.setItem("loans", JSON.stringify(storedLoans));
    }
  }
  getInstance() {
    return this;
  }

  #getLoans = () => {
    return JSON.parse(sessionStorage.getItem("loans") || "{}");
  };

  #getUserLoans = () => {
    const loans = this.#getLoans();
    const userLoans = loans[accountManager.getCardNumber()];

    if (!userLoans) {
      return [];
    }

    return userLoans;
  };

  getUserLoans = () => {
    return this.#getUserLoans();
  };

  checkoutBook = accountManager.requireAuth((book_id, type, quantity) => {
    if (quantity <= 0) {
      return;
    }

    if (bookManager.getBook(book_id).availability[type] >= quantity) {
      const RETURN_DATE = new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toLocaleDateString();

      let loans = this.#getLoans();
      let userLoans = this.#getUserLoans();

      for (let i = 0; i < quantity; i++) {
        userLoans.push({
          id: book_id,
          type: type,
          quantity: quantity,
          checked_out_date: new Date().toLocaleDateString(),
          return_date: RETURN_DATE,
        });

        bookManager.updateCopies(
          book_id,
          type,
          bookManager.getBook(book_id).availability[type] - quantity
        );
      }

      loans[accountManager.getUser().id] = userLoans;
      sessionStorage.setItem("loans", JSON.stringify(loans));
    }
  });

  checkoutCart = accountManager.requireAuth((cart) => {
    cart.forEach((book) => {
      this.checkoutBook(book.id, book.type, book.quantity);
    });
  });
}

const loanManager = new LoanManager();
export default loanManager;
