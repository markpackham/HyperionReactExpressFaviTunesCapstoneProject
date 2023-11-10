import PropTypes from "prop-types";

const RemoveBook = ({ book, onRemove }) => {
  return (
    <button className="btn btn-danger" onClick={() => onRemove(book)}>
      Remove
    </button>
  );
};

RemoveBook.propTypes = {
  book: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default RemoveBook;
