import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookList from "./booklist";
import { search, getAll } from "../BooksAPI";
import PropTypes from "prop-types";

const INTIAL_STATE = {
  books: [],
  noResults: false,
  booksToSetStatus: [],
  query: ""
};

class Search extends Component {
  static propTypes = {
    booksOnShelves: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { ...INTIAL_STATE };
  }

  async componentDidMount() {
    const { booksOnShelves } = this.props;
    if (booksOnShelves.length === 0) {
      try {
        const books = await getAll();
        this.setBooksToSetStatus([...books]);
      } catch (error) {
        console.log(error);
      }
    } else {
      this.setBooksToSetStatus([...booksOnShelves]);
    }
  }

  setBooksToSetStatus = booksToSetStatus => {
    this.setState({
      booksToSetStatus
    });
  };

  search = query => {
    this.setState(
      {
        query: query
      },
      async () => {
        try {
          const results = await search(query.trim());
          this.setState(() => {
            if (results !== undefined && !results.error) {
              return {
                books: results.filter(book =>
                  this.state.booksToSetStatus.map(shelfBook => {
                    if (shelfBook.id === book.id) {
                      return (book.shelf = shelfBook.shelf);
                    }
                    return book;
                  })
                ),
                noResults: false
              };
            }
            return {
              books: [],
              noResults: true
            };
          });
        } catch (error) {
          console.log("results", error);
        }
      }
    );
  };

  render() {
    const { books, noResults, query } = this.state;
    const { moveBookTo } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={query}
              onChange={e => this.search(e.target.value)}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          {noResults && query !== "" ? (
            <p className="no-results">No results found...</p>
          ) : (
            <BookList moveBookTo={moveBookTo} books={books} />
          )}
        </div>
      </div>
    );
  }
}

export default Search;
