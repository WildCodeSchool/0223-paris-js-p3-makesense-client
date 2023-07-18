import React, { useEffect, useState } from "react";
import logoWhite from "../../assets/makesense_logo_white.svg";

function Footer() {
  const [isFixed, setIsFixed] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrollable =
        document.documentElement.scrollHeight > window.innerHeight ||
        window.pageYOffset > 0;
      setIsFixed(!isScrollable);
    };

    const handlePageChange = handleScroll;

    const handleResize = handlePageChange;

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("pageshow", handlePageChange);
    window.addEventListener("resize", handleResize);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pageshow", handlePageChange);
      window.removeEventListener("resize", handleResize);
    };
  }, [refresh]);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      setRefresh((prevRefresh) => !prevRefresh);
    }, 500);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  return (
    <footer className={isFixed ? "fixed-bottom" : ""}>
      <div className="contenu-footer">
        <div className="bloc-footer">
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

        <div className="bloc-footer">
          <h1>Contact</h1>
          <ul className="contact">
            <li>
              <a href="#">Makesense dans le monde</a>
            </li>
          </ul>
        </div>

        <div className="bloc-footer">
          <ul className="iconesfooter">
            <li>
              <a href="#">
                <img
                  src="../src/assets/facebook.png"
                  className="iconefacebook"
                  alt="icone facebook"
                />
              </a>
            </li>
            <li>
              <a href="#">
                <img
                  src="../src/assets/instagram.png"
                  className="iconeinsta"
                  alt="icone instagram"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <img
        className="logofooter"
        src={logoWhite}
        alt="makesense logo"
      />
    </footer>
  );
}

export default Footer;
