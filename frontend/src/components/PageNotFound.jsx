import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <h1>404 Error</h1>
      <h2>Sorry Page Not Found</h2>
      <Link className="nav-link" to="/">
        <h2 className="m-2">Return Home?</h2>
      </Link>
      <div className="lowerImage d-flex justify-content-center">
        <img src="../../../public/music_images/music3.jpg" alt="" />
      </div>
    </>
  );
};

export default PageNotFound;
