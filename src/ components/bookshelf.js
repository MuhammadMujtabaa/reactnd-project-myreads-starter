import React from "react";
import PropTypes from "prop-types";
import BookList from "./booklist";

const BookShelf = ({ shelfHeading, books, moveBookTo }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfHeading}</h2>
      <BookList moveBookTo={moveBookTo} books={books} />
    </div>
  );
};

BookShelf.prototype = {
  shelfHeading: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired
};

export default BookShelf;
