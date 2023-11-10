const axios = require("axios");

exports.albumInfo = async (req, res) => {
  const { albumName, artistName } = req.body;

  const url = `https://itunes.apple.com/search?term=${albumName}+${artistName}&entity=album`;
  try {
    const axiosResponse = await axios.get(url);
    //Obtain all album info
    const albums = axiosResponse.data.results.map((album) => ({
      albumName: album.collectionName,
      artistName: album.artistName,
      albumCoverImage: album.artworkUrl100,
      releaseDate: album.releaseDate,
    }));
    res.status(200).send(albums);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
