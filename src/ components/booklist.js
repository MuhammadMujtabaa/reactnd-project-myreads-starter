import React from "react";
import PropTypes from "prop-types";
import BookPreview from "./bookpreview";

const BookList = ({ books, moveBookTo }) => {
  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map(book => {
          return (
            <BookPreview moveBookTo={moveBookTo} key={book.id} book={book} />
          );
        })}
      </ol>
    </div>
  );
};

BookList.prototype = {
  books: PropTypes.array.isRequired
};

export default BookList;
