import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import AlbumSearch from "./components/search-album/AlbumSearch";
import Contact from "./components/Contact";
import FavSearch from "./components/search-favs/FavSearch";
import FooterSitewide from "./components/sitewide/FooterSitewide";
import HeaderSitewide from "./components/sitewide/HeaderSitewide";
import Home from "./components/Home";
import Login from "./components/users/Login";
import NavbarSitewide from "./components/sitewide/NavbarSitewide";
import PageNotFound from "./components/PageNotFound";
import Register from "./components/users/Register";

function App() {
  return (
    <div className="container">
      <HeaderSitewide />
      <NavbarSitewide />
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route path="/search" element={<FavSearch />} />
          <Route path="/search-album" element={<AlbumSearch />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </main>
      <FooterSitewide />
    </div>
  );
}

export default App;
