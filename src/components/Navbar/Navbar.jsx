import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/auth";
import authService from "../../services/auth";
import logoWhite from "../../assets/makesense_logo_white.svg";
import logoBlue from "../../assets/makesense_logo_blue.svg";

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };
  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return !auth.user ? (
    <nav className="nav2">
      <img className="nav_logo" src={logoWhite} alt="makesense logo" />
    </nav>
  ) : (
    <nav className={`navbar ${showLinks ? "show-nav" : "hide-nav"} `}>
      <div className="transparent" />
      <img className="nav_logo" src={logoBlue} alt="makesense logo" />
      <div className="nav-linksDesktop">
        <ul>
          <li>
            <a href="/">Découvrir les projets</a>
          </li>
          <li>
            <a href="/titleproject">Lancer mon projet</a>
          </li>
          <li>
            <a href="/guide">Comment se lancer</a>
          </li>
        </ul>
      </div>
      <img className="nav_bell" src="../src/assets/bell.svg" alt="bell" />
      <div className="burgerAvatar">
        <img
          className="menu"
          src="../src/assets/menu.png"
          alt="menu"
          onClick={handleShowLinks}
        />
        <img
          className="nav_avatar_default"
          src="../src/assets/default_user.png"
          alt="user avatar"
          onClick={handleShowDropdown}
        />
      </div>
      {showDropdown ? (
        <div className="dropdown">
          <ul>
            <li>
              <Link href="/monprofil">Mon profil</Link>
            </li>
            <li>
              <Link href="/suiviprojet">Suivi de Projets</Link>
            </li>
            <li>
              <Link to="/admin">Adminstration</Link>
            </li>
            <li>
              <Link href="/login" onClick={handleSubmit}>
                Déconnexion
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
      <img
        className="cross"
        src="../src/assets/Cross.png"
        alt="cross"
        onClick={handleShowLinks}
      />
      <div className="nav-links">
        <img
          className="nav_avatar_big"
          src="../src/assets/default_user.png"
          alt="big avatar"
        />
        <ul>
          <li>
            <Link href="/monprofil">Mon profil</Link>
          </li>
          <li>
            <Link href="/suiviprojet">Suivi de Projets</Link>
          </li>
          <li>
            <Link to="/admin">Adminstration</Link>
          </li>
          <li>
            <Link href="/login" onClick={handleSubmit}>
              Déconnexion
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
