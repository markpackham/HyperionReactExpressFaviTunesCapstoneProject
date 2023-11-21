import { Link } from "react-router-dom";

const FooterSitewide = () => {
  const currentYear = new Date(Date.now());

  return (
    <footer className="sticky-bottom">
      <p id="footerCopyright" className="fst-italic">
        Copyright{" "}
        <Link
          to="https://github.com/markpackham"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mark Packham
        </Link>{" "}
        {currentYear.getFullYear()}
      </p>
    </footer>
  );
};

export default FooterSitewide;
