import { History } from "../data/History";
import accountManager from "./AccountManager";

class HistoryManager {
  constructor() {
    if (HistoryManager.instance) {
      throw new Error("A history manager has already been initialized");
    }
    HistoryManager.instance = this;

    let storedHistory = sessionStorage.getItem("history");

    if (storedHistory === null) {
      storedHistory = History;
      sessionStorage.setItem("history", JSON.stringify(storedHistory));
    }
  }
  getInstance() {
    return this;
  }

  #getAllHistory = () => {
    return JSON.parse(sessionStorage.getItem("history") || "{}");
  };

  #getUserHistory = () => {
    const history = this.#getAllHistory();
    const userHistory = history[accountManager.getCardNumber()];

    if (!userHistory) {
      return {};
    }

    return userHistory;
  };

  getUserHistory = () => {
    return this.#getUserHistory();
  };
  
  #updateHistory = (value) => {
    sessionStorage.setItem("history", JSON.stringify(value));
  }

  //for when i implement "return" button in the bookshelf
  addHistory = accountManager.requireAuth((book_id, action) => {
    let history = this.#getAllHistory();
    let userHistory = this.#getUserHistory();

    if (!userHistory[book_id]) {
      userHistory[book_id] = [];
      history[accountManager.getCardNumber()] = userHistory;
      this.#updateHistory(history);
      return{
        status: 200,
        message: "Successfully updated",
      }
    }

    return {
      status: 400,
      message: "Book already updated",
    };
  }
  );
}

const historyManager = new HistoryManager();
export default historyManager;
