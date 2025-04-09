import "./Styles/Profile.css";
import "./Styles/BookShelf.css";
import BookCard from "../../components/BookCard/BookCard";

import { covers } from "../../data/covers.js";
import BookCardOnHold from "../../components/BookCard/BookCardOnHold.js";

const books = [
    {
      id: 1,
      title: "Percy Jackson & the Olympians",
      author: "Rick Riordan",
      cover: covers.PercyJackson,
      type: "physical",
      DueDate: "May 6 2024",
      TimeLeft: 4,
      status: "on-hold"
    },
    {
      id: 2,
      title: "The Thirteenth Tale",
      author: "Diane Setterfield",
      cover: covers.ThirteenthTale,
      type: "physical",
      DueDate: "May 6 2024",
      TimeLeft: 4,
      status: "on-hold"
    },
    {
        id: 3,
        title: "My Sister's Keeper",
        author: "Jodi Picoult",
        cover: covers.Laws48,
        availability: ["1", "y"],
        status: "available"
      },
    {
      id: 3,
      title: "My Sister's Keeper",
      author: "Jodi Picoult",
      cover: covers.MySistersKeeper,
      type: "digital",
      DueDate: "May 6 2024",
      TimeLeft: 4,
      status: "on-hold"
    },
    {
        id: 2,
        title: "The Thirteenth Tale",
        author: "Diane Setterfield",
        cover: covers.ThirteenthTale,
        availability: ["6", "y"],
        status: "on-hold"
      },
      
  ];


const BookShelf = () => {


    return (
        <>
            <div className="profile-bookshelf-outlet">
                <div className="profile-bookshelf-container">
                {books.map((book) =>
                    book.status === "on-hold" ? (
                        <BookCardOnHold key={book.id} book={book} />
                    ) : (
                        <BookCard key={book.id} book={book} />
                    )
                    )}
                </div>
            </div>
        </>
    )
}


export default BookShelf;