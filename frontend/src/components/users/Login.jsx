import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";
import { urlPath } from "../../global";
import { useState } from "react";

const Login = () => {
  const token_storage = sessionStorage.getItem("jwt_token");
  const [token, setToken] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().email().max(140).required("Gmail is required"),
      password: Yup.string()
        .max(140)
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          "Must Contain At Least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        .required("Required"),
    }),
    onSubmit: () => {
      axios
        .post(`${urlPath}login`, {
          username: DOMPurify.sanitize(formik.values.username),
          password: DOMPurify.sanitize(formik.values.password),
        })
        .then((res) => {
          if (res.status === 200 && res.data != "Incorrect user credentials") {
            Swal.fire({
              title: res.data.message,
              icon: "success",
            });

            // Set user up with their token
            setToken[res.data.token];
            sessionStorage.setItem("jwt_token", res.data.token);
          } else {
            Swal.fire({
              title: "Login Failed",
              text: res.data,
              icon: "error",
            });
          }
        })
        .catch((error) => {
          console.error("Login error:", error);
          Swal.fire({
            title: "Login Error",
            text: error.message,
            icon: "error",
          });
        });
    },
  });

  return (
    <>
      <h1>Login</h1>
      {token_storage && (
        <h4 className="text-success mt-4 mb-4">
          Congrats, you are logged in and can add music & books to your favs.
        </h4>
      )}
      <p>
        Example username & password: <strong>bob@gmail.com</strong> -{" "}
        <strong>Password9#</strong>
      </p>
      <form
        onSubmit={formik.handleSubmit}
        className="form-group col-sm-12 col-md-6"
      >
        <label htmlFor="username">Username Gmail Account:</label>
        <input
          id="username"
          type="text"
          className="form-control"
          {...formik.getFieldProps("username")}
        />

        {formik.touched.username && formik.errors.username ? (
          <div className="fw-bold text-danger mb-1">
            {formik.errors.username}
          </div>
        ) : null}

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          className="form-control"
          {...formik.getFieldProps("password")}
        />

        {formik.touched.password && formik.errors.password ? (
          <div className="fw-bold text-danger mb-1">
            {formik.errors.password}
          </div>
        ) : null}

        <button type="submit" className="btn btn-success">
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
