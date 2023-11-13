import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const [show, setShowMoreInfo] = useState(false);

  return (
    <>
      <h2>Store All Your Fav Music, Movies & Books Right Here!</h2>
      <p>
        To fully use this site please make sure that you have first{" "}
        <Link to="/register">registered</Link> and then{" "}
        <Link to="/login">login</Link> to use this site.
      </p>
      <div className="lowerImage d-flex justify-content-center">
        <img src="../../../public/music_images/music4.jpg" alt="." />
      </div>

      <p>
        This is a community project where registered users can add all their
        favorite music, movies and books in lists. Or if you do not want to
        register you can search for more detailed info on{" "}
        <Link to="/search-album">albums</Link> you are interest in.
      </p>
      <div className="lowerImage d-flex justify-content-center">
        <img src="../../../public/music_images/recordPlayer3.jpg" alt="." />
      </div>

      <>
        <Button variant="primary" onClick={() => setShowMoreInfo(true)}>
          More Info
        </Button>
        <Modal show={show} onHide={() => setShowMoreInfo(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Body text</p>
            <div className="lowerImage d-flex justify-content-center">
              <img
                src="../../../public/music_images/recordPlayer4.jpg"
                alt="."
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowMoreInfo(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
};

export default Home;
