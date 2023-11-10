const axios = require("axios");

exports.albumInfo = async (req, res) => {
  console.log(req.body);
  const { albumName, artistName } = req.body;
  console.log(albumName);
  console.log(artistName);

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
