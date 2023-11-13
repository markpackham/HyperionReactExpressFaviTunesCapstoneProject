import PropTypes from "prop-types";

const AddFav = ({ item, handleAddItem }) => {
  return (
    <button className="btn btn-primary" onClick={() => handleAddItem(item)}>
      Add
    </button>
  );
};

AddFav.propTypes = {
  item: PropTypes.object.isRequired,
  handleAddItem: PropTypes.func.isRequired,
};

export default AddFav;
