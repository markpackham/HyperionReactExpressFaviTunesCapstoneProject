import { useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify";

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const response = await axios.get("https://itunes.apple.com/search", {
        params: {
          term: searchTerm,
          media: "ebook",
          entity: "ebook",
          limit: 7,
        },
      });
      setSearchResults(response.data.results);
    };
    fetchSearchResults();
  }, [searchTerm]);

  const handleSearchTermChange = (event) => {
    // Prevent script injections
    setSearchTerm(DOMPurify.sanitize(event.target.value));
  };

  const handleAddBook = (book) => {
    setBooks([...books, book]);
  };

  const handleRemoveBook = (book) => {
    setBooks(books.filter((b) => b.trackId !== book.trackId));
  };

  return (
    <div>
      <h1>Books</h1>
      <h2>Add your fav books to your fav list!</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchTermChange}
        placeholder="Search for a book"
      />
      <div className="row">
        <div className="col-sm-12 col-md-6 book-search">
          <ul>
            {searchResults.map((result) => (
              <li key={result.trackId}>
                <a href={result.trackViewUrl} target="_blank" rel="noreferrer">
                  {result.trackName} by {result.artistName}
                </a>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddBook(result)}
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-sm-12 col-md-6 fav-books">
          <h3>Fav Books</h3>
          <ul>
            {books.map((book) => (
              <li key={book.trackId}>
                <a href={book.trackViewUrl} target="_blank" rel="noreferrer">
                  {book.trackName} by {book.artistName}
                </a>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveBook(book)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookSearch;
