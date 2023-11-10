const axios = require("axios");

exports.albumInfo = async (req, res) => {
  const { albumName, artistName } = req.query;
  const url = `https://itunes.apple.com/search?term=${albumName}+${artistName}&entity=album`;
  try {
    const response = await axios.get(url);
    const albums = response.data.results.map((album) => ({
      albumName: album.collectionName,
      artistName: album.artistName,
      albumCoverImage: album.artworkUrl100,
      releaseDate: album.releaseDate,
    }));
    res.send(albums);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
