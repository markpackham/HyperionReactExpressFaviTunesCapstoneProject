const FooterSitewide = () => {
  const currentYear = new Date(Date.now());

  return (
    <footer className="sticky-bottom">
      <p className="fst-italic">
        Copyright Mark Packham {currentYear.getFullYear()}
      </p>
    </footer>
  );
};

export default FooterSitewide;
