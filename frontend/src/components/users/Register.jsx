import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";
import { urlPath } from "../../global";

const token_storage = sessionStorage.getItem("jwt_token");

const Register = () => {
  const navigate = useNavigate();

  // No submission or redirects to login till formik & yup are happy
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      password_confirm: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().email().required("Gmail is required"),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          "Must Contain At Least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        .required("Required"),
      password_confirm: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: () => {
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;

      const user = {
        username: DOMPurify.sanitize(username),
        password: DOMPurify.sanitize(password),
      };

      // Send Post to Express
      fetch(`${urlPath}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => {
          if (res.status === 200) {
            // Registration successful, redirect to login
            Swal.fire({
              title: `You're registered`,
              icon: "success",
            });
            navigate("/login");
          } else {
            console.error("Registration failed:", res.statusText);
            Swal.fire({
              title: "Registration Failed",
              text: res.statusText,
              icon: "error",
            });
          }
        })
        .catch((error) => {
          console.error("Registration error:", error);
          Swal.fire({
            title: "Registration Error",
            text: error.message,
            icon: "error",
          });
        });
    },
  });

  return (
    <>
      <h1>Register</h1>
      {token_storage && (
        <h4 className="text-success mt-4 mb-4">
          If you are registered please go <Link to="/login">Login</Link> with
          your details.
        </h4>
      )}
      <p>
        Username must end in @gmail.com e.g. <strong>bob@gmail.com</strong> and
        password must be at least 8 characters with 1 uppercase, one lower case
        and 1 special character e.g. <strong>Password9#</strong>
      </p>
      <p>When you have registered your will be asked to login.</p>
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

        <label htmlFor="password_confirm">Password Again:</label>
        <input
          id="password_confirm"
          type="password"
          className="form-control"
          {...formik.getFieldProps("password_confirm")}
        />

        {formik.touched.password_confirm && formik.errors.password_confirm ? (
          <div className="fw-bold text-danger mb-1">
            {formik.errors.password_confirm}
          </div>
        ) : null}

        <button type="submit" className="btn btn-success">
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
