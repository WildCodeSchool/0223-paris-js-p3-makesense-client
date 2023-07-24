import { useEffect, useState } from "react";
import authService from "../../services/auth";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../store/auth";
import { useSelector, useDispatch } from "react-redux";
import logoWhite from "../../assets/makesense_logo_white.svg";
import logoBlue from "../../assets/makesense_logo_blue.svg";

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      await authService.logout();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log("error", error);
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
      <img
        className="nav_logo"
        src={logoWhite}
        alt="makesense logo"
      />
    </nav>
  ) : (
    <nav className={`navbar ${showLinks ? "show-nav" : "hide-nav"} `}>
      <div className="transparent"></div>
      <img
        className="nav_logo"
        src={logoBlue}
        alt="makesense logo"
      />
      <div className="nav-linksDesktop">
        <ul>
          <li>
            <a href="#">Découvrir les projets</a>
          </li>
          <li>
            <a href="#">Lancer mon projet</a>
          </li>
          <li>
            <a href="#">Comment se lancer</a>
          </li>
        </ul>
      </div>
      <div></div>
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
          alt="default avatar"
          onClick={handleShowDropdown}
        />
      </div>
      {showDropdown ? (
        <div className="dropdown">
          <h3>Mon profil</h3>
          <ul>
            <li>
              <a href="#">Modifier mon profil</a>
            </li>
            <li>
              <a href="#">Mes notifications</a>
            </li>
            <li>
              <a href="#">Aide</a>
            </li>
            <li>
              <Link to="/admin">Adminstration</Link>
            </li>
            <li>
              <a href="#" onClick={handleSubmit}>
                Déconnexion
              </a>
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
            <a href="#">Mon profil</a>
          </li>
          <li>
            <a href="#">Suivi de Projets</a>
          </li>
          <li>
            <a href="#">Gérer les projets</a>
          </li>
          <li>
            <Link to="/admin">Adminstration</Link>
          </li>
          <li>
            <a href="#" onClick={handleSubmit}>
              Déconnexion
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
