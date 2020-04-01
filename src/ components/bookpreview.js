import React from "react";
import PropTypes from "prop-types";

const noImageAvailable =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/No_image_available_450_x_600.svg/768px-No_image_available_450_x_600.svg.png";

const BookPreview = ({ book, moveBookTo }) => {
  return (
    <li key={book.id}>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundSize: "contain",
              backgroundImage: `url(${
                book.imageLinks
                  ? book.imageLinks.smallThumbnail
                  : noImageAvailable
              })`
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              value={book.shelf || "none"}
              onChange={e =>
                moveBookTo(book, e.target.value, book.shelf || "none")
              }
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors &&
          book.authors.map(author => (
            <div key={author} className="book-authors">
              {author}
            </div>
          ))}
      </div>
    </li>
  );
};

BookPreview.prototype = {
  book: {
    previewImageURL: PropTypes.string.isRequired,
    bookTitle: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired
  }
};

export default BookPreview;
