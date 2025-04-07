let instance;

class AccountManager {
  #user;
  #accounts;
  #libraryMembers;

  constructor() {
    if (instance) {
      throw new Error("An account manager has already been initialized");
    }
    instance = this;

    this.#user = sessionStorage.getItem("user");

    /**
     * Account structure:
     *
     * Every group member has an account:
     * Email-address: "{firstname}@ucalgary.ca"
     * Password: lastname
     *
     */

    // Contains login information only
    let storedAccounts = sessionStorage.getItem("accounts");

    if (storedAccounts === null) {
      storedAccounts = {
        "elizabeth@ucalgary.ca": { password: "Adeyemo", cardNumber: 1 },
        "adarsh@ucalgary.ca": { password: "Dudhat", cardNumber: 2 },
        "ifeanyi@ucalgary.ca": { password: "Ekpemandu", cardNumber: 3 },
        "jad@ucalgary.ca": { password: "Khalil", cardNumber: 4 },
        "noor@ucalgary.ca": { password: "Nawaz", cardNumber: 5 },
      };
      sessionStorage.setItem("accounts", JSON.stringify(storedAccounts));

      this.#accounts = storedAccounts;
    } else {
      this.#accounts = JSON.parse(storedAccounts);
    }

    // Contains more details about the user
    let storedLibraryMembers = sessionStorage.getItem("library_members");

    if (storedLibraryMembers === null) {
      storedLibraryMembers = {
        1: {
          firstName: "Elizabeth",
          lastName: "Adeyemo",
        },
        2: {
          firstName: "Adarsh",
          lastName: "Dudhat",
        },
        3: {
          firstName: "Ifeanyi",
          lastName: "Ekpemandu",
        },
        4: {
          firstName: "Jad",
          lastName: "Khalil",
        },
        5: {
          firstName: "Noor",
          lastName: "Nawaz",
        },
        300: {
          firstName: "Jonathan",
          lastName: "Matthews",
        },
      };

      sessionStorage.setItem(
        "library_members",
        JSON.stringify(storedLibraryMembers)
      );

      this.#libraryMembers = storedLibraryMembers;
    } else {
      this.#libraryMembers = JSON.parse(storedLibraryMembers);
    }
  }

  auth(emailAddress, password) {
    if (!emailAddress || emailAddress === null) {
      return {
        status: 400,
        message: "Enter email address",
      };
    }

    if (!password || password === null) {
      return {
        status: 400,
        message: "Enter password",
      };
    }
    if (
      this.#accounts[emailAddress] &&
      this.#accounts[emailAddress].password === password
    ) {
      const cardNumber = this.#accounts[emailAddress].cardNumber;

      sessionStorage.setItem("user", cardNumber);
      this.#user = cardNumber;

      return {
        status: 200,
        cardNumber: this.getUser(),
        message: "",
      };
    }

    return {
      status: 400,
      message: "Email address or password is incorrect",
    };
  }

  getInstance() {
    return this;
  }

  getUser() {
    if (!this.#user || this.#user === null) {
      return undefined;
    }

    return this.#libraryMembers[this.#user];
  }

  removeUser() {
    sessionStorage.removeItem("user");
    this.#user = undefined;
  }

  addAccount(emailAddress, password, cardNumber) {
    if (this.#canAddAccount(cardNumber)) {
      this.#accounts[emailAddress] = {
        password: password,
        cardNumber: cardNumber,
      };

      sessionStorage.setItem("accounts", JSON.stringify(this.#accounts));
      return { status: 200, message: "Account created successfully!" };
    }

    return {
      status: 400,
      message: "Account already exists or invalid card number.",
    };
  }

  #canAddAccount(cardNumber) {
    // Ensure library member with card number exists
    if (!this.#libraryMembers[cardNumber]) {
      return false;
    }

    // Check if card number is already associated with an account
    let canAdd = true;

    Object.values(this.#accounts).forEach((value) => {
      if (value.cardNumber === cardNumber) {
        canAdd = false;
        return;
      }
    });

    return canAdd;
  }
}

const accountManager = new AccountManager();
export default accountManager;
