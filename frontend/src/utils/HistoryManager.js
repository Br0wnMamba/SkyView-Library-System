import accountManager from "./AccountManager";

let instance;

class HistoryManager {
  constructor() {
    if (instance) {
      throw new Error("A history manager has already been initialized");
    }
    instance = this;

    let storedHistory = sessionStorage.getItem("history");

    if (storedHistory === null) {
      storedHistory = {};

      sessionStorage.setItem("history", JSON.stringify(storedHistory));
    }
  }

  getInstance() {
    return this;
  }

  #getHistory = () => {
    return JSON.parse(sessionStorage.getItem("history") || "{}");
  };

  #getUserHistory = () => {
    const history = this.#getHistory();
    const userHistory = history[accountManager.getUser().id];

    if (!userHistory) {
      return [];
    }

    return userHistory;
  };

  add = accountManager.requireAuth((book_id, type, quantity, checked_out_date) => {
    if (quantity <= 0) {
      return;
    }

    let history = this.#getHistory();
    let userHistory = this.#getUserHistory();

    userHistory.push({
      id: book_id,
      type: type,
      quantity: quantity,
      checked_out_date: checked_out_date,
	  return_date: new Date().toLocaleDateString(),
    });

    history[accountManager.getUser().id] = userHistory;
    sessionStorage.setItem("history", JSON.stringify(history));
  });

  getHistory = accountManager.requireAuth(() => {
    return this.#getUserHistory();
  });
}

const historyManager = new HistoryManager();
export default historyManager;
