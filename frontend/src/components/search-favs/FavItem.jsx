import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import PropTypes from "prop-types";

import RemoveFav from "./RemoveFav";

const FavItem = ({ item, handleRemoveItem }) => {
  const [show, setShowMoreInfo] = useState(false);

  const token_storage = sessionStorage.getItem("jwt_token");

  return (
    <li className="list-group-item mb-1">
      <h5>
        <a href={item.trackViewUrl} target="_blank" rel="noreferrer">
          {item.trackName} by {item.artistName}
        </a>
      </h5>

      <p className="list-group-item-text">
        Media Kind: <strong>{item.kind}</strong>
      </p>

      <p>
        Released: <strong>{item.releaseDate.substring(0, 10)}</strong>
      </p>
      {/* Modal for very long movie descriptions */}
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
      {token_storage && (
        <RemoveFav item={item} handleRemoveItem={handleRemoveItem} />
      )}
    </li>
  );
};

FavItem.propTypes = {
  // What makes up a fav media item
  item: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired,
    kind: PropTypes.string.isRequired,
    trackViewUrl: PropTypes.string.isRequired,
    longDescription: PropTypes.string,
    releaseDate: PropTypes.string.isRequired,
  }).isRequired,
  handleRemoveItem: PropTypes.func.isRequired,
};

export default FavItem;
