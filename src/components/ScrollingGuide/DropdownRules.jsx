import { useState } from "react";

export default function DropdownRules() {
  const [open, setOpen] = useState(false);

  return (
    <section>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="dropdownButtonGuide"
      >
        <button
          type="button"
          className={open ? "arrow-icon open" : "arrow-icon"}
        >
          <span className="left-bar" />
          <span className="right-bar" />
        </button>
        <h3 className={open ? "open" : "c-blue "}>Nos règles</h3>
      </button>
      <li style={{ display: open ? "block" : "none" }} className="c-blue">
        <h4>Respect et Courtoisie :</h4>
        <p>
          Faites preuve de respect envers tous les membres de la communauté
          Make_Sense. Évitez tout langage offensant, harcèlement, ou propos
          discriminatoires. Les désaccords sont normaux, mais exprimez-les de
          manière constructive et respectueuse.
        </p>
        <h4>Thème et Pertinence :</h4>
        <p>
          Assurez-vous que votre post est en rapport avec les activités de
          Make_Sense et qu'il s'aligne sur les valeurs de l'entreprise. Les
          sujets inappropriés ou hors-sujet ne seront pas tolérés.{" "}
        </p>
        <h4>Clarté et Précision :</h4>
        <p>
          Rédigez votre post de manière claire, compréhensible et sans
          ambiguïté. Utilisez un langage professionnel et évitez les
          abréviations excessives.
        </p>
        <h4>Respect des Règles de Confidentialité :</h4>
        <p>
          Ne partagez pas d'informations confidentielles, sensibles ou protégées
          par des accords de confidentialité dans vos posts.{" "}
        </p>
        <h4>Authenticité :</h4>
        <p>
          Assurez-vous que les informations que vous partagez sont véridiques et
          vérifiables. Ne publiez pas de fausses informations ou de spéculations
          non fondées.
        </p>
        <h4>Inclusivité :</h4>
        <p>
          Encouragez la participation de tous les membres de la communauté, en
          veillant à ce que personne ne se sente exclu ou marginalisé.{" "}
        </p>
        <h4>Pas de Spam :</h4>
        <p>
          Évitez de publier plusieurs fois le même contenu ou de faire de la
          publicité non sollicitée.{" "}
        </p>
        <h4>Langues Utilisées :</h4>
        <p>
          Les posts doivent être rédigés dans les langues acceptées sur la
          plateforme de Make_Sense, afin que tout le monde puisse comprendre et
          participer.{" "}
        </p>
        <h4>Pas de Manipulation des Votes :</h4>
        <p>
          Ne sollicitez pas de votes en manipulant ou en incitant d'une manière
          inappropriée les autres membres de la communauté.{" "}
        </p>

        <h4>Modération :</h4>
        <p>
          Les administrateurs se réservent le droit de modérer les posts et de
          supprimer tout contenu qui enfreint les règles de bienséance ou les
          conditions d'utilisation de la plateforme.
        </p>
        <p>
          En suivant ces règles de bienséance, vous contribuez à maintenir un
          environnement respectueux et collaboratif au sein de Make_Sense. Nous
          comptons sur vous pour créer un espace où chacun se sente à l'aise de
          partager ses idées et de contribuer positivement à la communauté.{" "}
        </p>
      </li>
    </section>
  );
}
