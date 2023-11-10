import { useState, useEffect } from "react";
import axios from "axios";

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
    setSearchTerm(event.target.value);
  };

  return (
    <div>
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookSearch;
