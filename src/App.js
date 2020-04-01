import React from "react";
import "./App.css";
import Header from "./ components/header";
import BookShelf from "./ components/bookshelf";
import { getAll, update } from "./BooksAPI";
import { sortBooks, updateShelves, removeFromShelf } from "./utils/sortbook";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Search from "./ components/search";
import NotFound from "./ components/notfound";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    currentlyReading: [],
    wantToRead: [],
    read: []
  };

  componentDidMount() {
    this.getAndSortBooks();
  }

  getAndSortBooks = async () => {
    try {
      const { currentlyReading, read, wantToRead } = this.state;
      const userBooks = await getAll();
      sortBooks(currentlyReading, read, wantToRead, userBooks);
      this.setState({
        currentlyReading,
        read,
        wantToRead
      });
    } catch (error) {
      console.log(error);
    }
  };

  moveBookTo = async (book, newShelf, oldShelf) => {
    const { currentlyReading, read, wantToRead } = this.state;
    // TODO: add new book to relevent shelf
    updateShelves(currentlyReading, read, wantToRead, book, newShelf);
    // TODO: remove book from previous shelf
    removeFromShelf(currentlyReading, read, wantToRead, book, oldShelf);
    // TODO: update state
    this.setState({
      currentlyReading,
      read,
      wantToRead
    });
    // TODO: update server
    await update(book, newShelf);
  };

  render() {
    const { currentlyReading, read, wantToRead } = this.state;
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route
              exact
              path="/search"
              render={() => {
                return (
                  <Search
                    moveBookTo={this.moveBookTo}
                    booksOnShelves={[
                      ...currentlyReading,
                      ...read,
                      ...wantToRead
                    ]}
                  />
                );
              }}
            />
            <Route
              exact
              path="/"
              render={() => {
                return (
                  <div className="list-books">
                    <Header heading="MyReads" />
                    <div className="list-books-content">
                      <div>
                        <BookShelf
                          moveBookTo={this.moveBookTo}
                          books={currentlyReading}
                          shelfHeading="Currently Reading"
                        />
                        <BookShelf
                          moveBookTo={this.moveBookTo}
                          books={wantToRead}
                          shelfHeading="Want to Read"
                        />
                        <BookShelf
                          moveBookTo={this.moveBookTo}
                          books={read}
                          shelfHeading="Read"
                        />
                      </div>
                    </div>
                    <div className="open-search">
                      <Link to="/search">
                        <button>Add a book</button>
                      </Link>
                    </div>
                  </div>
                );
              }}
            />
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default BooksApp;
