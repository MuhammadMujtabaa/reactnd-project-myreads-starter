export const sortBooks = (current, read, want, userBooks) => {
  userBooks.forEach(book => {
    switch (book.shelf) {
      case "currentlyReading":
        current.push(book);
        break;
      case "wantToRead":
        want.push(book);
        break;
      case "read":
        read.push(book);
        break;
      default:
        break;
    }
  });
};

export const updateShelves = (current, read, want, book, newShelf) => {
  book.shelf = newShelf;
  switch (newShelf) {
    case "currentlyReading":
      current.push(book);
      break;
    case "wantToRead":
      want.push(book);
      break;
    case "read":
      read.push(book);
      break;
    default:
      break;
  }
};

export const removeFromShelf = (current, read, want, book, oldShelf) => {
  switch (oldShelf) {
    case "currentlyReading":
      current.splice(current.map(book => book.id).indexOf(book.id), 1);
      break;
    case "wantToRead":
      want.splice(want.map(book => book.id).indexOf(book.id), 1);
      break;
    case "read":
      read.splice(read.map(book => book.id).indexOf(book.id), 1);
      break;
    default:
      break;
  }
};
