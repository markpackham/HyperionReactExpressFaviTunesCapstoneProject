import PropTypes from "prop-types";

const AddBook = ({ book, onAdd }) => {
  return (
    <button className="btn btn-primary" onClick={() => onAdd(book)}>
      Add
    </button>
  );
};

AddBook.propTypes = {
  book: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default AddBook;
