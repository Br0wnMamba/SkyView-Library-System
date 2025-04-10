import accountManager from "./AccountManager";
import { Holds } from "../data/Holds";

let instance;

class HoldManager {
  constructor() {
    if (instance) {
      throw new Error("A cart manager has already been initialized");
    }
    instance = this;

    let storedHolds = sessionStorage.getItem("holds");

    if (storedHolds === null) {
      storedHolds = Holds;
      sessionStorage.setItem("holds", JSON.stringify(storedHolds));
    }
  }
  getInstance() {
    return this;
  }

  #getHolds = () => {
    return JSON.parse(sessionStorage.getItem("holds") || "{}");
  };

  getUserHolds = () => {
    const holds = this.#getHolds();
    const userHolds = holds[accountManager.getCardNumber()];

    if (!userHolds) {
      return [];
    }

    return userHolds;
  };

  add = accountManager.requireAuth((book_id) => {
    const RECEIVEDATE = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    let holds = this.#getHolds();
    let userHolds = this.getUserHolds();

    const existing = userHolds.find((hold) => hold.id === book_id);
    if (!existing) {
      userHolds.push({
        id: book_id,
        addedtoholddate: new Date().toISOString().split("T")[0],
        receivedate: RECEIVEDATE,
      });

      holds[accountManager.getCardNumber()] = userHolds;
      sessionStorage.setItem("holds", JSON.stringify(holds));
    }
  });

  remove = accountManager.requireAuth((book_id) => {
    let holds = this.#getHolds();
    let userHolds = this.getUserHolds();

    const updatedHolds = userHolds.filter((hold) => hold.id !== book_id);

    holds[accountManager.getCardNumber()] = updatedHolds;
    sessionStorage.setItem("holds", JSON.stringify(holds));

    return updatedHolds;
  });

  getHolds = accountManager.requireAuth(() => {
    return this.getUserHolds();
  });
}

const holdManager = new HoldManager();
export default holdManager;
