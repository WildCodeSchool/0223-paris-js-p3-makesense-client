import { useState } from "react";

export default function DropdownCreator() {
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
        <h3 className={open ? "open" : "c-blue "}>Manuel du créateur</h3>
      </button>
      <li style={{ display: open ? "block" : "none" }} className="c-blue">
        <h4>Bienvenue ! </h4>
        <p>
          Voici le manuel du créateur de Make_Sense ! Ce guide vous
          aidera à créer un post efficace pour initier des projets internes au
          sein de notre entreprise. Les posts jouent un rôle crucial dans le
          processus de décision, car ils permettent de présenter de nouveaux
          projets aux autres membres de l'entreprise, de partager des
          informations clés, de discuter des bénéfices et des risques, et de
          recueillir des votes pour décider de l'avenir du projet. Suivez ces
          étapes pour créer un post réussi :
        </p>
        <h4>1. Titre du Post :</h4>
        <p>
          Choisissez un titre clair et accrocheur qui résume le projet de
          manière concise.{" "}
        </p>
        <h4>2. Descriptif du Projet :</h4>
        <p>
          {" "}
          Dans cette section, expliquez en détail le projet que vous souhaitez
          initier. Décrivez son objectif, son contexte et sa finalité.
          Assurez-vous de fournir suffisamment d'informations pour que les
          autres membres comprennent clairement le projet.
        </p>
        <h4>3. Bénéfices du Projet :</h4>
        <p>
          Identifiez et mettez en évidence les avantages potentiels du projet.
          En quoi ce projet est-il bénéfique pour l'entreprise, les équipes, les
          clients ou d'autres parties prenantes ? Expliquez comment il peut
          améliorer nos opérations, notre efficacité, ou créer de nouvelles
          opportunités.
        </p>
        <h4>4. Risques et Mitigations :</h4>
        <p>
          {" "}
          N'oubliez pas de discuter honnêtement des risques potentiels liés au
          projet. Identifiez les défis et les obstacles qui pourraient survenir.
          Ensuite, proposez des stratégies d'atténuation pour chacun de ces
          risques.{" "}
        </p>
        <h4>5. Personnes Impactées :</h4>
        <p>
          {" "}
          Listez les parties prenantes internes et externes qui seront
          directement ou indirectement impactées par le projet. Cela inclut les
          équipes, les départements, les clients ou les partenaires concernés.
          Mentionnez également les personnes qui seront responsables de la mise
          en œuvre du projet.{" "}
        </p>
        <h4>6. Experts Impliqués :</h4>
        <p>
          {" "}
          Si certains experts jouent un rôle clé dans ce projet, assurez-vous de
          les mentionner. Indiquez comment leur expertise contribue à la
          réussite du projet.{" "}
        </p>
        <h4>7. Vote pour ou contre :</h4>
        <p>
          {" "}
          Invite les autres membres à voter pour ou contre le projet. Cette
          étape est cruciale pour évaluer l'acceptation générale du projet et
          pour prendre des décisions informées.{" "}
        </p>
        <h4>8. Format et Mise en page :</h4>
        <p>
          {" "}
          Organisez votre post de manière claire et structurée. Utilisez des
          paragraphes courts, des puces et des titres pour faciliter la lecture
          et la compréhension. N'hésitez pas à utiliser des éléments visuels
          (graphiques, images) si cela aide à la présentation du projet.{" "}
        </p>
        <h4>8. Format et Mise en page :</h4>
        <p>
          {" "}
          Organisez votre post de manière claire et structurée. Utilisez des
          paragraphes courts, des puces et des titres pour faciliter la lecture
          et la compréhension. N'hésitez pas à utiliser des éléments visuels
          (graphiques, images) si cela aide à la présentation du projet.{" "}
        </p>
        <h4>9. Révision et Correction :</h4>
        <p>
          {" "}
          Avant de publier votre post, relisez-vous attentivement pour corriger
          les erreurs éventuelles et vous assurer que toutes les informations
          essentielles sont incluses.{" "}
        </p>
        <h4>10. Publication et Suivi :</h4>
        <p>
          {" "}
          Une fois votre post publié, suivez les commentaires et les votes.
          Soyez prêt à répondre aux questions et à fournir des clarifications si
          nécessaire. En suivant ces étapes, vous serez en mesure de créer un
          post complet et convaincant pour présenter vos projets internes à
          Make_Sense.{" "}
        </p>
        <p>
          {" "}
          Nous vous encourageons à utiliser cette plateforme pour partager vos
          idées novatrices et contribuer à l'évolution de notre entreprise.
          Bonne création de post !{" "}
        </p>
      </li>
    </section>
  );
}
