const axios = require("axios");

exports.albumInfo = async (req, res) => {
  const { albumName, artistName } = req.body;
  console.log(albumName);

  const url = `https://itunes.apple.com/search?term=${albumName}+${artistName}&entity=album`;
  try {
    const res = await axios.get(url);
    const albums = res.data.results.map((album) => ({
      albumName: album.collectionName,
      artistName: album.artistName,
      albumCoverImage: album.artworkUrl100,
      releaseDate: album.releaseDate,
    }));
    console.log(albums);
    res.send("All good");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
