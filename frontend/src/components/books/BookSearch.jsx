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
          limit: 10,
        },
      });
      setSearchResults(response.data.results);
    };
    fetchSearchResults();
  }, [searchTerm]);

  const handleSearchTermChange = (event) => {
    // Use DOMPurify to prevent script injections
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
  );
};

export default BookSearch;
