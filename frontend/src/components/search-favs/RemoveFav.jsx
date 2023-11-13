import PropTypes from "prop-types";

const RemoveFav = ({ item, handleRemoveItem }) => {
  return (
    <button
      className="btn btn-danger"
      onClick={() => handleRemoveItem(item.trackId)}
    >
      Remove
    </button>
  );
};

RemoveFav.propTypes = {
  item: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default RemoveFav;
