import accountManager from "./AccountManager";
import bookManager from "./BookManager";

let instance;
const OPTIONS = ["physical", "digital"];

class CartManager {
  constructor() {
    if (instance) {
      throw new Error("A cart manager has already been initialized");
    }
    instance = this;

    let storedCarts = sessionStorage.getItem("carts");

    if (storedCarts === null) {
      storedCarts = {};

      sessionStorage.setItem("carts", JSON.stringify(storedCarts));
    }
  }
  getInstance() {
    return this;
  }

  #getCarts = () => {
    return JSON.parse(sessionStorage.getItem("carts") || "{}");
  };

  #getUserCart = () => {
    const carts = this.#getCarts();
    const userCart = carts[accountManager.getUser().id];

    if (!userCart) {
      return [];
    }

    return userCart;
  };

  #updateUserCart = (cart) => {
    let carts = this.#getCarts();

    carts[accountManager.getUser().id] = cart;

    sessionStorage.setItem("carts", JSON.stringify(carts));
  };

  add = accountManager.requireAuth((book_id, type, quantity = 1) => {
    let userCart = this.#getUserCart();

    if (quantity <= 0) {
      return;
    }

    if (!bookManager.getBook(book_id)) {
      return {
        status: 400,
        message: "Cannot add. Book doesn't exist",
      };
    }

    if (OPTIONS.includes(type)) {
      let amount = 0;
      let cartIndex = -1;

      userCart.forEach((item, index) => {
        if (item.type === type && item.book_id === book_id) {
          cartIndex = index;
          amount = userCart[cartIndex].quantity;

          return;
        }
      });

      if (type === OPTIONS[1] && amount > 0) {
        return {
          status: 400,
          message: "Can only add one of a e-book to cart",
        };
      }

      if (
        (type === OPTIONS[0] &&
          amount + quantity <=
            bookManager.getBook(book_id).availability[type]) ||
        (type === OPTIONS[1] &&
          amount + quantity <= bookManager.getBook(book_id).availability[type])
      ) {
        if (cartIndex === -1) {
          userCart.push({ book_id: book_id, type: type, quantity });
        } else {
          userCart[cartIndex] = {
            book_id: book_id,
            type: type,
            quantity: userCart[cartIndex].quantity + quantity,
          };
        }

        this.#updateUserCart(userCart);

        return {
          status: 200,
          message: "Successfully added book to cart",
        };
      } else {
        return {
          status: 400,
          message: "Unable to add book to cart. Not enough books available",
        };
      }
    }
  });

  remove = accountManager.requireAuth((book_id) => {
    let userCart = this.#getUserCart();

    if (userCart && userCart.length > 0) {
      const index = userCart.indexOf(book_id);
      if (index !== -1) {
        userCart.splice(index, 1);

        this.#updateUserCart(userCart);

        return {
          status: 200,
          message: "Successfully removed book from cart",
        };
      } else {
        return {
          status: 400,
          message: "Unable to remove book from cart. Book not in cart",
        };
      }
    }

    return {
      status: 400,
      message: "Unable to remove book from cart. Cart is empty",
    };
  });

  getCart = accountManager.requireAuth(() => {
    let userCart = this.#getUserCart();
    let result = [];

    for (let i = 0; i < userCart.length; i++) {
      result.push(bookManager.getBook(userCart[i]));
    }

    return result;
  });

  canAdd = (book_id, type) => {
    let result = false;
    const book = bookManager.getBook(book_id);

    if (book && OPTIONS.includes(type)) {
      if (type === "digital" && book.availability.digital > 0) {
        result = true;
      } else if (type === "physical" && book.availability.physical > 0) {
        result = true;
      }
    }

    return result;
  };
}

const cartManager = new CartManager();
export default cartManager;
