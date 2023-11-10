import PropTypes from "prop-types";

const AddFav = ({ item, onAdd }) => {
  return (
    <button className="btn btn-primary" onClick={() => onAdd(item)}>
      Add
    </button>
  );
};

AddFav.propTypes = {
  item: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default AddFav;
