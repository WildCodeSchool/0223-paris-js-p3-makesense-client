function Footer() {
    return (
        <footer>
            <div class="contenu-footer">
                <div class= "bloc footer">
                    <h1>Liens utiles</h1>
                    <ul class="useful links">
                        <li><a href="#">Rapport d'activité</a></li>
                        <li><a href="#">Mentions légales</a></li>
                    </ul>
                </div>

                <div class= "bloc footer">
                    <h1>Contact</h1>
                    <ul class="contact">
                        <li><a href="#">Makesense dans le monde</a></li>
                    </ul>
                </div>

                <div class= "bloc footer">
                    <ul class="iconesfooter">
                    <li><a href="#"><img src="../src/assets/facebook.png" alt="icone facebook"/></a></li>
                        <li><a href="#"><img src="../src/assets/instagram.png" alt="icone instagram"/></a></li>
                    </ul>
                </div>

            </div>
            <img class="logofooter" src="../src/assets/makesense_logo_white.png" alt="makesense logo"/>
        </footer>
    );
}




export default Footer;
