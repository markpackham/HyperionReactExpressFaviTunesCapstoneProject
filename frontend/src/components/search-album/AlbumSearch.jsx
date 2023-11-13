import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";

import { albumUrlPath } from "../../global";
import { useState } from "react";

const AlbumSearch = () => {
  const [albums, setAlbums] = useState([]);

  //url example `http://localhost:8080/favs/album-info?albumName=Greatest+Hits&artistName=Creed`;
  // First test with single words - Album "War" and artist "U2";

  const formik = useFormik({
    initialValues: {
      albumName: "",
      artistName: "",
    },
    validationSchema: Yup.object({
      albumName: Yup.string().max(140).required("Required"),
      artistName: Yup.string().max(140).required("Required"),
    }),
    onSubmit: () => {
      axios
        .post(`${albumUrlPath}`, {
          albumName: DOMPurify.sanitize(
            // Replaces spaces with +
            formik.values.albumName.split(" ").join("+")
          ),
          artistName: DOMPurify.sanitize(
            formik.values.artistName.split(" ").join("+")
          ),
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
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
              <li key={album.albumName} className="list-group-item mt-2">
                <div className="d-flex align-items-center">
                  <img
                    src={album.albumCoverImage}
                    alt={album.albumName}
                    className="img-fluid"
                  />
                  <div>
                    <h5>{album.albumName}</h5>
                    <p className="mb-0">
                      &nbsp;by {album.artistName} | Released on{" "}
                      {album.releaseDate.substring(0, 10)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlbumSearch;
