import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";

import { iTunesUrlPath } from "../../global";
import { urlPath } from "../../global";
import AddFav from "./AddFav";
import DropdownSelect from "./DropdownSelect";
import RemoveFav from "./RemoveFav";

const FavSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // Fav media items
  const [items, setItems] = useState([]);
  const [media, setMedia] = useState("ebook");

  // Grab session storage, will be empty for logged out users
  const token_storage = sessionStorage.getItem("jwt_token");

  // Select ebook, movie or music via DropdownSelect component
  const mediaOptions = [
    { value: "all", label: "All" },
    { value: "ebook", label: "Ebook" },
    { value: "music", label: "Music" },
    { value: "movie", label: "Movie" },
  ];

  useEffect(() => {
    const fetchSearchResults = async () => {
      const res = await axios.get(iTunesUrlPath, {
        params: {
          term: searchTerm,
          media: media,
          limit: 10,
        },
      });
      console.log(res.data);
      setSearchResults(res.data.results);
    };
    fetchSearchResults();
  }, [searchTerm, media]);

  const handleSearchTermChange = (event) => {
    // Prevent script injections
    setSearchTerm(DOMPurify.sanitize(event.target.value));
  };

  const handleAddItem = (item) => {
    // Escape function if item already in list
    const result = items.find(({ trackId }) => trackId === item.trackId);
    if (result) {
      return;
    }

    const newItem = {
      trackId: item.trackId,
      trackName: item.trackName,
      artistName: item.artistName,
      kind: item.kind,
      trackViewUrl: item.trackViewUrl,
      longsDescription: item.longDescription,
      releaseDate: item.releaseDate,
      token_storage: token_storage,
    };

    console.log(newItem);

    // POST SECURE route
    // http://localhost:8080/favs/search/add
    fetch(`${urlPath}search/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((res) => {
        console.log(res);
        setItems([...items, item]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // DELETE SECURE route
  // http://localhost:8080/favs/search/delete-fav/:trackId
  const handleRemoveItem = async (trackIdToRemove) => {
    const url = `${urlPath}search/delete-fav/${trackIdToRemove}`;

    // Add token to body
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token_storage }),
    });

    if (res.ok) {
      Swal.fire({
        title: `Fav removed.`,
        icon: "warning",
      });
      setItems(items.filter((item) => item.trackId !== trackIdToRemove));
    } else {
      console.error(`Failed to delete fav`);
    }
  };

  const handleMediaChange = (value) => {
    setMedia(value);
  };

  return (
    <div>
      <h1>Fav Media Search</h1>

      {!token_storage && (
        <h3>
          Please <Link to="/login">login</Link> to add your fav media to your
          fav list!
        </h3>
      )}

      <div className="form-group col-sm-12 col-md-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder="Search for something"
          className="form-control"
        />
      </div>
      <p className="mt-2">
        <strong>Item Category</strong>
      </p>
      <DropdownSelect
        options={mediaOptions}
        value={media}
        onChange={handleMediaChange}
      />
      <p className="mt-2">
        <strong>Sub Category</strong> (eg Music Track or Music Video)
      </p>
      <div className="row">
        <div className="col-sm-12 col-md-6 item-search">
          <ul>
            {searchResults.map((result) => (
              <li key={result.trackId}>
                <a href={result.trackViewUrl} target="_blank" rel="noreferrer">
                  {result.trackName} by {result.artistName}
                </a>
                {token_storage && (
                  <AddFav item={result} handleAddItem={handleAddItem} />
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-sm-12 col-md-6 item-list">
          <h3>Your fav list</h3>
          <ul>
            {items.map((item) => (
              <li key={item.trackId}>
                <a href={item.trackViewUrl} target="_blank" rel="noreferrer">
                  {item.trackName} by {item.artistName}
                </a>
                <p>Media Kind: {item.kind}</p>
                <p>{item.longDescription}</p>
                <p>Released: {item.releaseDate.substring(0, 10)}</p>
                {token_storage && (
                  <RemoveFav item={item} handleRemoveItem={handleRemoveItem} />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FavSearch;
