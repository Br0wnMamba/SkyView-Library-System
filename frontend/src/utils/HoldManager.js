import accountManager from "./AccountManager";
import bookManager from "./BookManager";

let instance;

class HoldManager {
  constructor() {
    if (instance) {
      throw new Error("A hold manager has already been initialized");
    }
    instance = this;

    let storedHolds = sessionStorage.getItem("holds");

    if (storedHolds === null) {
      storedHolds = {};

      sessionStorage.setItem("holds", JSON.stringify(storedHolds));
    }
  }

  getInstance() {
    return this;
  }

  #getHolds = () => {
    return JSON.parse(sessionStorage.getItem("holds") || "{}");
  };

  #getUserHolds = () => {
    const holds = this.#getHolds();
    const userHolds = holds[accountManager.getUser().id];

    if (!userHolds) {
      return [];
    }

    return userHolds;
  };

  add = accountManager.requireAuth((book_id, type, quantity) => {
    if (quantity <= 0) {
      return;
    }

    if (bookManager.getBook(book_id).availability[type] >= quantity) {
      const HOLD_TILL = new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toLocaleDateString();

      let holds = this.#getHolds();
      let userHolds = this.#getUserHolds();
      let holdIndex = -1;

      userHolds.forEach((hold, index) => {
        if (hold.type === type && hold.id === book_id) {
          holdIndex = index;
          return;
        }
      });

      if (holdIndex === -1) {
        userHolds.push({
          id: book_id,
          type: type,
          quantity: quantity,
          hold_date: new Date().toLocaleDateString(),
          hold_till: HOLD_TILL,
        });
      } else {
        userHolds[holdIndex].quantity += quantity;
      }

      bookManager.updateCopies(
        book_id,
        type,
        bookManager.getBook(book_id).availability[type] - quantity
      );

      holds[accountManager.getUser().id] = userHolds;
      sessionStorage.setItem("holds", JSON.stringify(holds));
    }
  });

  remove = accountManager.requireAuth((book_id, type) => {
    let holds = this.#getHolds();
    let userHolds = this.#getUserHolds();
    let holdIndex = -1;

    userHolds.forEach((hold, index) => {
      if (hold.type === type && hold.id === book_id) {
        holdIndex = index;
        return;
      }
    });

    if (holdIndex !== -1) {
      const removedAmount = userHolds[holdIndex].quantity;
      userHolds.splice(holdIndex, 1);

      bookManager.updateCopies(
        book_id,
        type,
        bookManager.getBook(book_id).availability[type] + removedAmount // Add the books user held back
      );

      // Update and store the new holds
      holds[accountManager.getUser().id] = userHolds;
      sessionStorage.setItem("holds", JSON.stringify(holds));
    }
  });

  getHolds = accountManager.requireAuth(() => {
    return this.#getUserHolds();
  });
}

const holdManager = new HoldManager();
export default holdManager;
