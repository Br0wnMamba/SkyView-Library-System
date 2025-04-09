import BookCard from "../../components/BookCard/BookCard";
import "./Styles/Profile.css";
import "./Styles/BookShelf.css";

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
    },
    {
      id: 2,
      title: "The Thirteenth Tale",
      author: "Diane Setterfield",
      cover: covers.ThirteenthTale,
      type: "physical",
      DueDate: "May 6 2024",
      TimeLeft: 4,
    },
    {
      id: 3,
      title: "My Sister's Keeper",
      author: "Jodi Picoult",
      cover: covers.MySistersKeeper,
      type: "digital",
      DueDate: "May 6 2024",
      TimeLeft: 4,
    },
  ];

const BookShelf = () => {


    return (
        <>
            <div className="profile-bookshelf-outlet">
                <div className="profile-bookshelf-container">
                    {books.map((book) => (
                        <BookCardOnHold key={book.id} book={book} />
                    ))}
                </div>
            </div>
        </>
    )
}


export default BookShelf;