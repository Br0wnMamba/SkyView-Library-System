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