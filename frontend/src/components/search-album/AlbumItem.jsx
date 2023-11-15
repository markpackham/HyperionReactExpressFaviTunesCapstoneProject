import PropTypes from "prop-types";

const AlbumItem = ({ album }) => {
  return (
    <li key={album.albumName} className="list-group-item mt-2">
      <div className="d-flex align-items-center">
        <img
          src={album.albumCoverImage}
          alt={album.albumName}
          className="img-fluid"
        />
        <div>
          <h5 className="p-2">{album.albumName}</h5>
          <p className="p-2">
            &nbsp;by <strong>{album.artistName}</strong> | Released on{" "}
            <strong>{album.releaseDate.substring(0, 10)}</strong>
          </p>
        </div>
      </div>
    </li>
  );
};

AlbumItem.propTypes = {
  // What makes up a fav media item
  album: PropTypes.shape({
    albumName: PropTypes.string.isRequired,
    albumCoverImage: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
  }).isRequired,
};

export default AlbumItem;
