import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
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
  const [media, setMedia] = useState("all");
  const [show, setShowMoreInfo] = useState(false);

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
      trackId: item.trackId,
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
          <h3 className="list-group-item-heading">Your fav list</h3>
          <ul className="list-group">
            {items.map((item) => (
              <li className="list-group-item mt-1" key={item.trackId}>
                <h5>
                  <a href={item.trackViewUrl} target="_blank" rel="noreferrer">
                    {item.trackName} by {item.artistName}
                  </a>
                </h5>

                <p className="list-group-item-text">
                  <strong>Media Kind: </strong>
                  {item.kind}
                </p>
                {item.longDescription && (
                  <>
                    <Button
                      variant="primary"
                      onClick={() => setShowMoreInfo(true)}
                    >
                      More Info
                    </Button>
                    <Modal show={show} onHide={() => setShowMoreInfo(false)}>
                      <Modal.Header closeButton>
                        <Modal.Title>{item.trackName}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>{item.longDescription}</Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="secondary"
                          onClick={() => setShowMoreInfo(false)}
                        >
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </>
                )}

                <p className="mt-2">
                  <strong>Released:</strong> {item.releaseDate.substring(0, 10)}
                </p>
                {token_storage && (
                  <RemoveFav item={item} handleRemoveItem={handleRemoveItem} />
                )}
              </li>
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
