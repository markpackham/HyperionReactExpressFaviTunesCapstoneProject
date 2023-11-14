import PropTypes from "prop-types";

import AddFav from "./AddFav";

const SearchItem = ({ searchResults, token_storage, handleAddItem }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Content Name</th>
          <th>Artist Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {searchResults.map((result) => (
          <tr key={result.trackId}>
            <td>
              <a href={result.trackViewUrl} target="_blank" rel="noreferrer">
                {result.trackName}
              </a>
            </td>
            <td>{result.artistName}</td>
            <td>
              {token_storage && (
                <AddFav item={result} handleAddItem={handleAddItem} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

SearchItem.propTypes = {
  searchResults: PropTypes.arrayOf(
    PropTypes.shape({
      trackId: PropTypes.number.isRequired,
      trackName: PropTypes.string.isRequired,
    })
  ),
  token_storage: PropTypes.string,
  handleAddItem: PropTypes.func.isRequired,
};

export default SearchItem;
