import { Link, useNavigate } from "react-router-dom";

const NavbarSitewide = () => {
  const navigate = useNavigate();
  const token_storage = sessionStorage.getItem("jwt_token");

  const handleLogout = () => {
    // Delete token
    sessionStorage.setItem("jwt_token", "");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg mb-3 rounded">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home <i className="fa-solid fa-house" />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/book-search">
                Book Search <i className="fa-solid fa-book"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/music-search">
                Music Search <i className="fa-solid fa-music"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login <i className="fa-solid fa-right-to-bracket" />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register <i className="fa-solid fa-registered" />
              </Link>
            </li>
            {token_storage && (
              <li className="nav-item">
                <a onClick={handleLogout} className="nav-link" to="/register">
                  Logout <i className="fa-solid fa-right-from-bracket"></i>
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <hr />
    </>
  );
};

export default NavbarSitewide;
