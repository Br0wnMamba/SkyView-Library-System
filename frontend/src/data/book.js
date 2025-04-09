import { covers } from "./covers";

export const Books = {
  1: {
    title: "Percy Jackson & the Olympians",
    authors: ["Rick Riordan"],
    cover: covers.PercyJackson,
    availability: {
      physical: 4,
      digital: 0,
    },
  },
  2: {
    title: "The Thirteenth Tale",
    author: "Diane Setterfield",
    cover: covers.ThirteenthTale,
    availability: {
      physical: 6,
      digital: 4,
    },
  },
  3: {
    title: "My Sister's Keeper",
    author: "Jodi Picoult",
    cover: covers.MySistersKeeper,
    availability: {
      physical: 1,
      digital: 3,
    },
  },
  4: {
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    cover: covers.KiteRunner,
    availability: {
      physical: 0,
      digital: 0,
    },
  },
  5: {
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    cover: covers.Laws48,
    availability: {
      physical: 2,
      digital: 0,
    },
  },
};

export const DisplayContent = [
  {
    title: "Recently Added",
    books: [1, 2, 3],
  },
  {
    title: "Top Picks",
    books: [4, 5],
  },
];
