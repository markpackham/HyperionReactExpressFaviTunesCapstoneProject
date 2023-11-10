const FooterSitewide = () => {
  const currentYear = new Date(Date.now());

  return (
    <footer className="sticky-bottom mt-2">
      <p className="fst-italic">
        Copyright Mark Packham {currentYear.getFullYear()}
      </p>
    </footer>
  );
};

export default FooterSitewide;
