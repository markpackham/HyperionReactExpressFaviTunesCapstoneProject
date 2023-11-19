import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Access username from Redux so can be viewed sitewide
import { setUserName } from "../../store/userSlice";

const NavbarSitewide = () => {
  const navigate = useNavigate();
  const token_storage = sessionStorage.getItem("jwt_token");
  const userName = useSelector((state) => state.userName.userName);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setUserName(userName));
    // Delete token
    sessionStorage.setItem("jwt_token", "");
    navigate("/login");
  };

  return (
    <div id="nav-section" className="sticky-top mt-1">
      <nav className="navbar navbar-expand-lg mb-1 rounded">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home /About <i className="fa-solid fa-house" />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact <i className="fa-solid fa-address-book"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search">
                Media Search <i className="fa-solid fa-book"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search-album">
                Album Info <i className="fa-solid fa-record-vinyl"></i>
              </Link>
            </li>
            {/* Hide if user has jwt token */}
            {!token_storage && (
              <>
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
              </>
            )}
            {/* Show if user has jwt token */}
            {token_storage && (
              <>
                <li className="nav-item">
                  <a onClick={handleLogout} className="nav-link" to="/register">
                    Logout <i className="fa-solid fa-right-from-bracket"></i>
                  </a>
                </li>

                <li id="navUsername" className="nav-item">
                  <span className="nav-link">
                    <strong>
                      Username <i className="fa-solid fa-user"></i>&nbsp;
                    </strong>{" "}
                    {userName}
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <hr />
    </div>
  );
};

export default NavbarSitewide;
