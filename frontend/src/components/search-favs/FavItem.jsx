import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import Swal from "sweetalert2";

import { urlPath } from "../../global";
import RemoveFav from "./RemoveFav";

const FavItem = ({ item }) => {
  const [show, setShowMoreInfo] = useState(false);
  const [items, setItems] = useState([]);

  const token_storage = sessionStorage.getItem("jwt_token");

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

  return (
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
          <Button variant="primary" onClick={() => setShowMoreInfo(true)}>
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
  );
};

export default FavItem;
