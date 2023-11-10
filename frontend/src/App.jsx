import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import FooterSitewide from "./components/sitewide/FooterSitewide";
import HeaderSitewide from "./components/sitewide/HeaderSitewide";
import Home from "./components/Home";
import Login from "./components/users/Login";
import NavbarSitewide from "./components/sitewide/NavbarSitewide";
import PageNotFound from "./components/PageNotFound";
import Register from "./components/users/Register";
import MusicSearch from "./components/music/MusicSearch";
import BookSearch from "./components/books/BookSearch";

function App() {
  return (
    <div className="container">
      <HeaderSitewide />
      <NavbarSitewide />
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/book-search" element={<BookSearch />} />
          <Route path="/music-search" element={<MusicSearch />} />
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
