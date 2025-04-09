import BookCard from "../../components/BookCard/BookCard";
import "./Styles/Profile.css";
import "./Styles/BookShelf.css";

import { covers } from "../../data/covers.js";

const books = [
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
    {
        id: 3,
        title: "My Sister's Keeper",
        author: "Jodi Picoult",
        cover: covers.KiteRunner,
        availability: ["1", "y"],
      },
      {
        id: 3,
        title: "My Sister's Keeper",
        author: "Jodi Picoult",
        cover: covers.Laws48,
        availability: ["1", "y"],
      },
      {
        id: 3,
        title: "My Sister's Keeper",
        author: "Jodi Picoult",
        cover: covers.PercyJackson,
        availability: ["1", "y"],
      },
  ];

const BookShelf = () => {


    return (
        <>
            <div className="profile-bookshelf-outlet">
                <div className="profile-bookshelf-container">
                    {books.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>

            </div>
                    
        
        </>
    )
}


export default BookShelf;