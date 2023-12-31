import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";

import { iTunesUrlPath } from "../../global";
import { urlPath } from "../../global";
import DropdownSelect from "./DropdownSelect";
import FavItem from "./FavItem";
import SearchItem from "./SearchItem";

const FavSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Fav media items
  const [items, setItems] = useState([]);
  const [media, setMedia] = useState("music");

  // Grab session storage, will be empty for logged out users
  const token_storage = sessionStorage.getItem("jwt_token");

  // Select ebook, movie or music via DropdownSelect component
  const mediaOptions = [
    { value: "all", label: "All" },
    { value: "ebook", label: "Ebook" },
    { value: "music", label: "Music" },
    { value: "movie", label: "Movie" },
    { value: "podcast", label: "Podcast" },
  ];

  // Search Results grabbed from iTunes API
  const fetchSearchResults = async () => {
    const res = await axios.get(iTunesUrlPath, {
      params: {
        term: searchTerm,
        media: media,
        limit: 15,
      },
    });

    // We do not want entries with no trackId & no trackName
    const filteredResults = res.data.results.filter(
      (result) => result.trackId && result.trackName
    );

    setSearchResults(filteredResults);
  };

  // iTunes API entry search
  useEffect(() => {
    fetchSearchResults();
  }, [searchTerm, media]);

  const handleSearchTermChange = (event) => {
    // Prevent script injections
    setSearchTerm(DOMPurify.sanitize(event.target.value));
  };

  // Fav List
  // Fav list data stores in MongoDB which we access via Express
  const fetchFavResults = async () => {
    const res = await axios.get(`${urlPath}`);
    // Show latest additions first
    res.data.reverse();
    setItems(res.data);
  };

  useEffect(() => {
    fetchFavResults();
  }, []);

  // Add item to Fav list - only logged in users can do this
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
        setItems([item, ...items]);
        Swal.fire({
          title: `Fav added to list!`,
          icon: "success",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // DELETE SECURE route (only logged in users can do this)
  // Send message to Express to delete a specific list entry from MongoDB
  // Example of what a url path to Express server looks like http://localhost:8080/favs/search/delete-fav/:trackId
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
        <strong>Media Item Category</strong> click on the button to change the
        category!
      </p>
      {/* Radio button category selection */}
      <DropdownSelect
        options={mediaOptions}
        value={media}
        onChange={handleMediaChange}
        alt="Media Button Category Selector"
      />
      <div className="row mt-2">
        <div className="col-sm-12 col-md-6 item-search card-body">
          <SearchItem
            searchResults={searchResults}
            token_storage={token_storage}
            handleAddItem={handleAddItem}
          />
          <div className="lowerImage d-flex justify-content-center">
            <img src="/music_images/recordPlayer2.jpg" alt="" />
          </div>
        </div>
        <div className="col-sm-12 col-md-6 item-list">
          <h3 className="list-group-item-heading">
            Your fav media list <i className="fa-solid fa-star"></i>
          </h3>
          <ul className="list-group">
            {items.map((item) => (
              <FavItem
                item={item}
                handleRemoveItem={handleRemoveItem}
                key={item.trackId}
              />
            ))}
          </ul>
          <div className="lowerImage d-flex justify-content-center">
            <img src="/book_images/book2.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavSearch;
