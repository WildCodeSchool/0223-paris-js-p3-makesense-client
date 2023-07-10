import {useState} from "react"
function Navbar() {
  const [showLinks, setShowLinks]= useState(false)
  const [showDropdown, setShowDropdown]= useState(false)
  const handleShowLinks = () => {
    setShowLinks(!showLinks)
  }
  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown)
  }
  return (
    <nav class={`navbar ${showLinks ?  "show-nav" : "hide-nav"} `} > 
    <div class="transparent"></div>
      <img class="logo" src="../src/assets/makesense_logo_bleu.png" alt="makesense logo"/>
      <div class="nav-linksDesktop">
        <ul>
          <li><a href="#">Découvrir les projets</a></li>
          <li><a href="#">Lancer mon projet</a></li>
          <li><a href="#">Comment se lancer</a></li>
        </ul>
      </div>
      <img class="bell" src="../src/assets/bell.png" alt="bell"/>
      <div class="burgerAvatar">
      <img class="menu" src="../src/assets/menu.png" alt="menu" onClick={handleShowLinks}/>
      <img class="avatar_default" src="../src/assets/default_user.png" alt="default avatar" onClick={handleShowDropdown}/>
      </div>
      {showDropdown ?
      <div class="dropdown">
        <h3>Mon profil</h3>
        <ul>
          <li><a href="#">Modifier mon profil</a></li>
          <li><a href="#">Mes notifications</a></li>
          <li><a href="#">Aide</a></li>
          <li><a href="#">Déconnexion</a></li>
        </ul>
      </div>
      :
      ""}
      <img class="cross" src="../src/assets/Cross.png" alt="cross" onClick={handleShowLinks}/>
      <div class="nav-links">
      <img class="avatar_big" src="../src/assets/default_user.png" alt="big avatar"/>
        <ul>
          <li><a href="#">Mon profil</a></li>
          <li><a href="#">Suivi de Projets</a></li>
          <li><a href="#">Gérer les projets</a></li>
          <li><a href="#">Déconnexion</a></li>
        </ul>
        </div>
    </nav>
  );
}

export default Navbar;
