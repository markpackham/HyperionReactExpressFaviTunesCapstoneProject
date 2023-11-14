import PropTypes from "prop-types";

import AddFav from "./AddFav";

const SearchItem = ({ searchResults, token_storage, handleAddItem }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Track Name</th>
          <th>Artist Name</th>
          <th>Add to list</th>
        </tr>
      </thead>
      <tbody>
        {searchResults
          .filter((result) => result.trackId && result.trackName)
          .map((result) => (
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
