import { useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import AddFav from "./AddFav";
import RemoveFav from "./RemoveFav";
import DropdownSelect from "./DropdownSelect";
import { iTunesUrlPath } from "../../global";

const FavSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [items, setItems] = useState([]);
  const [media, setMedia] = useState("ebook");
  const [entity, setEntity] = useState("ebook");

  // Select ebook, movie or music via DropdownSelect component
  const mediaOptions = [
    { value: "all", label: "All" },
    { value: "ebook", label: "Ebook" },
    { value: "music", label: "Music" },
    { value: "movie", label: "Movie" },
  ];

  const entityOptions = {
    ebook: [
      { value: "ebook", label: "Ebook" },
      { value: "audiobook", label: "Audiobook" },
    ],
    music: [
      { value: "musicTrack", label: "Music Track" },
      { value: "musicVideo", label: "Music Video" },
    ],
    movie: [
      { value: "movie", label: "Movie" },
      { value: "movieArtist", label: "Movie Artist" },
    ],
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      const res = await axios.get(iTunesUrlPath, {
        params: {
          term: searchTerm,
          media: media,
          //entity: entity,
          limit: 10,
        },
      });
      console.log(res.data);
      setSearchResults(res.data.results);
    };
    fetchSearchResults();
  }, [searchTerm, media, entity]);

  const handleSearchTermChange = (event) => {
    // Prevent script injections
    setSearchTerm(DOMPurify.sanitize(event.target.value));
  };

  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  const handleRemoveItem = () => {
    setItems(items.filter((item) => item.trackId !== item.trackId));
  };

  const handleMediaChange = (value) => {
    setMedia(value);
    setEntity(entityOptions[value][0].value);
  };

  const handleEntityChange = (value) => {
    setEntity(value);
  };

  return (
    <div>
      <h1>Fav Media Search</h1>
      <h2>Add your fav media to your fav list!</h2>
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
      {/* <DropdownSelect
        options={entityOptions[media]}
        value={entity}
        onChange={handleEntityChange}
      /> */}
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
        <div className="col-sm-12 col-md-6 item-list">
          <h3>Your fav list</h3>
          <ul>
            {items.map((item) => (
              <li key={item.trackId}>
                <a href={item.trackViewUrl} target="_blank" rel="noreferrer">
                  {item.trackName} by {item.artistName}
                </a>
                <p>Kind: {item.kind}</p>
                <p>{item.description}</p>
                <RemoveFav item={item} onRemove={handleRemoveItem} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FavSearch;
