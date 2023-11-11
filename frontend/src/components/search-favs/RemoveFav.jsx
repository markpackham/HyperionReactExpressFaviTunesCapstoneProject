import PropTypes from "prop-types";

const RemoveFav = ({ item, onRemove }) => {
  return (
    <button className="btn btn-danger" onClick={() => onRemove(item.trackId)}>
      Remove
    </button>
  );
};

RemoveFav.propTypes = {
  item: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default RemoveFav;
