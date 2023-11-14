import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";

import { iTunesUrlPath } from "../../global";
import { urlPath } from "../../global";
import AddFav from "./AddFav";
import DropdownSelect from "./DropdownSelect";
import FavItem from "./FavItem";

const FavSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // Fav media items
  const [items, setItems] = useState([]);
  const [media, setMedia] = useState("all");

  // Grab session storage, will be empty for logged out users
  const token_storage = sessionStorage.getItem("jwt_token");

  // Select ebook, movie or music via DropdownSelect component
  const mediaOptions = [
    { value: "all", label: "All" },
    { value: "ebook", label: "Ebook" },
    { value: "music", label: "Music" },
    { value: "movie", label: "Movie" },
  ];

  // Search Results
  const fetchSearchResults = async () => {
    const res = await axios.get(iTunesUrlPath, {
      params: {
        term: searchTerm,
        media: media,
        limit: 15,
      },
    });
    console.log(res.data);
    setSearchResults(res.data.results);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [searchTerm, media]);

  const handleSearchTermChange = (event) => {
    // Prevent script injections
    setSearchTerm(DOMPurify.sanitize(event.target.value));
  };

  // Fav List
  const fetchFavResults = async () => {
    const res = await axios.get(`${urlPath}`);
    setItems(res.data);
  };

  useEffect(() => {
    fetchFavResults();
  }, []);

  const handleAddItem = (item) => {
    // Escape function if item already in list
    const result = items.find(({ trackId }) => trackId === item.trackId);
    if (result) {
      Swal.fire({
        title: `Sorry, already in fav list.`,
        icon: "warning",
      });
      return;
    }

    const newItem = {
      trackId: item.trackId.toString(),
      trackName: item.trackName,
      artistName: item.artistName,
      kind: item.kind,
      trackViewUrl: item.trackViewUrl,
      longDescription: item.longDescription,
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

  const handleMediaChange = (value) => {
    setMedia(value);
  };

  return (
    <div>
      <h1>Fav Media Search</h1>
      <hr />

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
        <div className="col-sm-12 col-md-6 item-search card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Track Name</th>
                <th>Artist Name</th>
                <th>Add to list</th>
              </tr>
            </thead>
            <tbody>
              {searchResults
                // We only care about items with trackIds and trackNames
                .filter((result) => result.trackId && result.trackName)
                .map((result) => (
                  <tr key={result.trackId}>
                    <td>
                      <a
                        href={result.trackViewUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {result.trackName}
                      </a>
                    </td>
                    <td>{result.artistName}</td>
                    <td>
                      {token_storage && (
                        <AddFav item={result} handleAddItem={handleAddItem} />
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="col-sm-12 col-md-6 item-list">
          <h3 className="list-group-item-heading">Your fav list</h3>
          <ul className="list-group">
            {items.map((item) => (
              <FavItem item={item} key={item.trackId} />
            ))}
          </ul>
        </div>
      </div>
      <div className="lowerImage d-flex justify-content-center">
        <img src="../../../public/music_images/recordPlayer2.jpg" alt="" />
      </div>
    </div>
  );
};

export default FavSearch;
