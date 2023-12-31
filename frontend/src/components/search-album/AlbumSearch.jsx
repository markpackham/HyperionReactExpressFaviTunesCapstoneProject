// External module imports at the top
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";

// My custom code imports
import { albumUrlPath } from "../../global";
import { useState } from "react";
import AlbumItem from "./AlbumItem";

const AlbumSearch = () => {
  const [albums, setAlbums] = useState([]);

  //url example `http://localhost:8080/favs/album-info?albumName=Greatest+Hits&artistName=Creed`;
  const formik = useFormik({
    initialValues: {
      albumName: "",
      artistName: "",
    },
    validationSchema: Yup.object({
      albumName: Yup.string().max(140).required("Required"),
      artistName: Yup.string().max(140).required("Required"),
    }),

    // Users posts what they want to look for to Express which consults the iTunes API
    // results are then sent back to React
    onSubmit: () => {
      axios
        .post(`${albumUrlPath}`, {
          albumName: DOMPurify.sanitize(
            // Replaces spaces with +
            formik.values.albumName.trim().split(" ").join("+")
          ),
          // Learned trim to remove surrounding whitespace from
          // MozDevNet (no date) String.prototype.trim() - javascript: MDN, MDN Web Docs.
          // Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim (Accessed: 15 November 2023).
          artistName: DOMPurify.sanitize(
            formik.values.artistName.trim().split(" ").join("+")
          ),
        })
        .then((res) => {
          if (res.status === 200) {
            // See if album cannot be found
            if (res.data.length === 0) {
              Swal.fire({
                title: "Album does not exist in iTunes",
                text: res.data,
                icon: "error",
              });
            }
            setAlbums(res.data);
          } else {
            Swal.fire({
              title: "Search Failed",
              text: res.data,
              icon: "error",
            });
          }
        })
        .catch((error) => {
          console.error("Search error:", error);
          Swal.fire({
            title: "Search Error",
            text: error.message,
            icon: "error",
          });
        });
    },
  });

  return (
    <div>
      <h1>Album Info Search</h1>
      <hr />
      <p>
        An example artist name:<strong>U2</strong> album name:
        <strong>War</strong>.
      </p>
      <form
        onSubmit={formik.handleSubmit}
        className="form-group col-sm-12 col-md-6"
      >
        <label htmlFor="artistName">Artist Name:</label>
        <input
          id="artistName"
          type="text"
          className="form-control"
          {...formik.getFieldProps("artistName")}
        />

        {formik.touched.password && formik.errors.password ? (
          <div className="fw-bold text-danger mb-1">
            {formik.errors.artistName}
          </div>
        ) : null}

        <label htmlFor="albumName">Album Name:</label>
        <input
          id="albumName"
          type="text"
          className="form-control"
          {...formik.getFieldProps("albumName")}
        />

        {formik.touched.albumName && formik.errors.albumName ? (
          <div className="fw-bold text-danger mb-1">
            {formik.errors.albumName}
          </div>
        ) : null}

        <button type="submit" className="btn btn-success">
          Search
        </button>
      </form>

      <div className="row">
        <div className="col-sm-12 col-md-6">
          <ul className="list-group">
            {albums.map((album) => (
              <AlbumItem album={album} key={album.albumName} />
            ))}
          </ul>
        </div>
      </div>
      <div className="lowerImage d-flex justify-content-center">
        <img src="/music_images/recordPlayer1.jpg" alt="" />
      </div>
    </div>
  );
};

export default AlbumSearch;
