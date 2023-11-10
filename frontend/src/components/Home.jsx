import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h2>Store All Your Fav Music & Books Right Here!</h2>
      <p>
        Please make sure that you have first{" "}
        <Link to="/register">registered</Link> and then{" "}
        <Link to="/login">login</Link> to use this site.
      </p>
    </div>
  );
};

export default Home;
