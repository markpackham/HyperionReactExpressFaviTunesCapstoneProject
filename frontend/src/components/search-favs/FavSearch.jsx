import { useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import AddFav from "./AddFav";
import RemoveFav from "./RemoveFav";

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [items, setItems] = useState([]);

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

  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  const handleRemoveItem = (item) => {
    setItems(items.filter((it) => it.trackId !== it.trackId));
  };

  return (
    <div>
      <h1>Fav Media</h1>
      <h2>Add your fav media to your fav list!</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchTermChange}
        placeholder="Search for something"
      />
      <div className="row">
        <div className="col-sm-12 col-md-6 item-search">
          <ul>
            {searchResults.map((result) => (
              <li key={result.trackId}>
                <a href={result.trackViewUrl} target="_blank" rel="noreferrer">
                  {result.trackName} by {result.artistName}
                </a>
                <AddFav item={result} onAdd={handleAddItem} />
              </li>
            ))}
          </ul>
        </div>
        <div className="col-sm-12 col-md-6 fav-items">
          <h3>Fav Media</h3>
          <ul>
            {items.map((item) => (
              <li key={item.trackId}>
                <a href={item.trackViewUrl} target="_blank" rel="noreferrer">
                  {item.trackName} by {item.artistName}
                </a>
                <RemoveFav item={item} onRemove={handleRemoveItem} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookSearch;
