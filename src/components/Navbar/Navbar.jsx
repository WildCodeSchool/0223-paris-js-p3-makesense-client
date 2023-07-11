import { useEffect, useState } from "react";
import authService from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/auth";
import { useSelector, useDispatch } from "react-redux";

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.user) {
      navigate("/login");
    }
  }, []);

  const handleSubmit = async (event) => {
    try {
      await authService.logout();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };
  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <nav className={`navbar ${showLinks ?  "show-nav" : "hide-nav"} `} > 
    <div className="transparent"></div>
      <img className="nav_logo" src="../src/assets/makesense_logo_bleu.png" alt="makesense logo"/>
      <div className="nav-linksDesktop">
    <nav className={`navbar ${showLinks ? "show-nav" : "hide-nav"} `}>
      <div className="transparent"></div>
      <img
        className="nav_logo"
        src="../src/assets/makesense_logo_bleu.png"
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
      <img classNameName="nav_bell" src="../src/assets/bell.png" alt="bell" />
      <div classNameName="burgerAvatar">
        <img
          classNameName="menu"
          src="../src/assets/menu.png"
          alt="menu"
          onClick={handleShowLinks}
        />
        <img
          classNameName="nav_avatar_default"
          src="../src/assets/default_user.png"
          alt="default avatar"
          onClick={handleShowDropdown}
        />
      </div>
      {showDropdown ? (
        <div classNameName="dropdown">
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
        classNameName="cross"
        src="../src/assets/Cross.png"
        alt="cross"
        onClick={handleShowLinks}
      />
      <div classNameName="nav-links">
        <img
          classNameName="nav_avatar_big"
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
            <a href="#" onClick={handleSubmit}>
              Déconnexion
            </a>
            {/* <a href="#">Déconnexion</a> */}
            {/* <form onSubmit={handleSubmit}>
              <input type="submit" value="Disconnect" />
            </form> */}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
