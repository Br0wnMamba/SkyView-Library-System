import { covers } from "./covers";


export const DisplayContent = [
    {
      title: "Recently Added",
      books: [
        {
          id: 1,
          title: "Percy Jackson & the Olympians",
          author: "Rick Riordan",
          cover: covers.PercyJackson,
          availability: ["4", "n"],
        },
        {
          id: 2,
          title: "The Thirteenth Tale",
          author: "Diane Setterfield",
          cover: covers.ThirteenthTale,
          availability: ["6", "y"],
        },
        {
          id: 3,
          title: "My Sister's Keeper",
          author: "Jodi Picoult",
          cover: covers.MySistersKeeper,
          availability: ["1", "y"],
        },
      ],
    },
    {
      title: "Top Picks",
      books: [
        {
          id: 4,
          title: "The Kite Runner",
          author: "Khaled Hosseini",
          cover: covers.KiteRunner,
          availability: ["0", "n"],
        },
        {
          id: 5,
          title: "The 48 Laws of Power",
          author: "Robert Greene",
          cover: covers.Laws48,
          availability: ["2","n"],
        },
      ],
    },
  ];

export const Books = {
  1: {
    title: "Percy Jackson & the Olympians",
    authors: ["Rick Riordan"],
    cover: covers.PercyJackson,
    availability: {
      physical: 4,
      digital: 0,
    },
    desc: "Percy Jackson & the Olympians is a fantasy novel series",
    content: { 1: "chapter - 1", 2: "chapter - 2", 3: "chapter - 3" }, // To be updated by reading book designer
  },
  2: {
    title: "The Thirteenth Tale",
    authors: ["Diane Setterfield"],
    cover: covers.ThirteenthTale,
    availability: {
      physical: 6,
      digital: 4,
    },
    desc: "From Diane Setterfields series",
    content: { 1: "chapter - 1", 2: "chapter - 2", 3: "chapter - 3" }, // To be updated by reading book designer
  },
  3: {
    title: "My Sister's Keeper",
    authors: ["Jodi Picoult", "Mark Fisher"],
    cover: covers.MySistersKeeper,
    availability: {
      physical: 2,
      digital: 3,
    },
    desc: "Based upon Anissa and Marissa Ayala",
    content: { 1: "chapter - 1", 2: "chapter - 2", 3: "chapter - 3" }, // To be updated by reading book designer
  },
  4: {
    title: "The Kite Runner",
    authors: ["Khaled Hosseini"],
    cover: covers.KiteRunner,
    availability: {
      physical: 0,
      digital: 0,
    },
    desc: "The Kite Runner is a coming of age story about redemption",
    content: { 1: "chapter - 1", 2: "chapter - 2", 3: "chapter - 3" }, // To be updated by reading book designer
  },
  5: {
    title: "The 48 Laws of Power",
    authors: ["Robert Greene"],
    cover: covers.Laws48,
    availability: {
      physical: 2,
      digital: 0,
    },
    desc: "48 Laws of Power details the laws for attaining power in life, business, and more, and gives historical examples of each law in practice.",
    content: { 1: "chapter - 1", 2: "chapter - 2", 3: "chapter - 3" }, // To be updated by reading book designer
  },
};