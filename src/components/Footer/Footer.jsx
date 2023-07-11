function Footer() {
  return (
    <footer>
      <div className="contenu-footer">
        <div className="bloc footer">
          <h1>Liens utiles</h1>
          <ul className="useful links">
            <li>
              <a href="#">Rapport d'activité</a>
            </li>
            <li>
              <a href="#">Mentions légales</a>
            </li>
          </ul>
        </div>

        <div className="bloc footer">
          <h1>Contact</h1>
          <ul className="contact">
            <li>
              <a href="#">Makesense dans le monde</a>
            </li>
          </ul>
        </div>

        <div className="bloc footer">
          <ul className="iconesfooter">
            <li>
              <a href="#">
                <img src="../src/assets/facebook.png" alt="icone facebook" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="../src/assets/instagram.png" alt="icone instagram" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <img
        className="logofooter"
        src="../src/assets/makesense_logo_white.png"
        alt="makesense logo"
      />
    </footer>
  );
}

export default Footer;
