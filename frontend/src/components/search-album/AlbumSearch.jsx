import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";
import { albumUrlPath } from "../../global";

const AlbumSearch = () => {
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
          albumName: DOMPurify.sanitize(formik.values.albumName),
          artistName: DOMPurify.sanitize(formik.values.artistName),
        })
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: res.data,
              icon: "success",
            });
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
      <form
        onSubmit={formik.handleSubmit}
        className="form-group col-sm-12 col-md-6"
      >
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

        <label htmlFor="artistName">Artist Name:</label>
        <input
          id="artistName"
          type="password"
          className="form-control"
          {...formik.getFieldProps("artistName")}
        />

        {formik.touched.password && formik.errors.password ? (
          <div className="fw-bold text-danger mb-1">
            {formik.errors.artistName}
          </div>
        ) : null}

        <button type="submit" className="btn btn-success">
          Search
        </button>
      </form>
    </div>
  );
};

export default AlbumSearch;
