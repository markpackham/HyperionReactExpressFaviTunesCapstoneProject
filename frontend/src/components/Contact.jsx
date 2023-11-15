import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <>
      <h1>Contact Me</h1>
      <div className="card mb-1">
        <div className="card-body">
          <ul>
            <li className="mb-2">
              {" "}
              <Link
                to="https://github.com/markpackham"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github <i className="fa-brands fa-github"></i>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="https://www.linkedin.com/in/mark-packham"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <i className="fa-brands fa-linkedin"></i>
              </Link>
            </li>
            <li className="mb-2">
              <Link to="tel:111111111">
                Fake Phone<i className="fa-solid fa-phone"></i>
              </Link>
            </li>
            <li>
              <Link to="mailto:fakeEmail@example.com">
                Fake Email <i className="fa-solid fa-envelope"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="lowerImage d-flex justify-content-center">
        <img src="/book_images/bookShelf1.jpg" alt="" />
      </div>
    </>
  );
};

export default Contact;
