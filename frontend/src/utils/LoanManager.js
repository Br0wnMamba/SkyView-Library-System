import accountManager from "./AccountManager";
import bookManager from "./BookManager";
import cartManager from "./CartManager";

let instance;

// Handles users checked out books
class LoanManager {
  constructor() {
    if (instance) {
      throw new Error("A loan manager has already been initialized");
    }
    instance = this;

    let storedLoans = sessionStorage.getItem("loans");

    if (storedLoans === null) {
      storedLoans = {};

      sessionStorage.setItem("loans", JSON.stringify(storedLoans));
    }
  }
  getInstance() {
    return this;
  }

  #getLoans = () => {
    return JSON.parse(sessionStorage.getItem("loans") || "{}");
  };

  getUserLoans = () => {
    const loans = this.#getLoans();
    const userLoans = loans[accountManager.getUser().id];

    if (!userLoans) {
      return [];
    }

    return userLoans;
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
      let userLoans = this.getUserLoans();
      let bookLoanIndex = -1; // Used to find if user already has book loaned in which case only quantity of the book is updated

      userLoans.forEach((loan, index) => {
        if (loan.type === type && loan.book_id === book_id) {
          bookLoanIndex = index;
          return;
        }
      });

      if (bookLoanIndex === -1) {
        userLoans.push({
          book_id: book_id,
          type: type,
          quantity: quantity,
          checked_out_date: new Date().toLocaleDateString(),
          return_date: RETURN_DATE,
        });
      } else {
        // Update loans quantity and update return date
        userLoans[bookLoanIndex].quantity =
          userLoans[bookLoanIndex].quantity + quantity;
        userLoans[bookLoanIndex].checked_out_date =
          new Date().toLocaleDateString();
        userLoans[bookLoanIndex].return_date = RETURN_DATE;
      }

      // Remove book from user cart
      cartManager.remove(book_id, type, quantity);

      bookManager.updateCopies(
        book_id,
        type,
        bookManager.getBook(book_id).availability[type] - quantity
      );

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
