import { useState } from "react";

export default function DropdownQA() {
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
        <h3 className={open ? "open" : "c-blue "}>F.A.Q</h3>
      </button>
      <li style={{ display: open ? "block" : "none" }} className="c-blue">
        <h4>1. Qu'est-ce que Make_Sense ? </h4>
        <p>
          Make_Sense est une plateforme interne de notre entreprise qui permet
          aux collaborateurs de proposer, discuter, et voter sur des projets
          internes. C'est un espace d'échange pour stimuler l'innovation et la
          collaboration au sein de notre entreprise.
        </p>
        <h4>2. Comment créer un post sur Make_Sense ? </h4>
        <p>
          Pour créer un post, connectez-vous à votre compte et accédez à la
          section "Créer un post". Suivez les étapes décrites dans le manuel du
          créateur pour rédiger votre proposition de projet.
        </p>
        <h4>3. Qui peut voir mes posts ? </h4>
        <p>
          Vos posts sont visibles par tous les collaborateurs de l'entreprise
          ayant accès à la plateforme Make_Sense. Cela favorise la transparence
          et la participation de l'ensemble de la communauté.
        </p>
        <h4>4. Comment fonctionne le vote pour ou contre un projet ?</h4>
        <p>
          Les autres utilisateurs peuvent voter pour ou contre votre projet en
          utilisant les options de vote disponibles. Le vote permet d'évaluer
          l'acceptation générale du projet et d'aider à la prise de décision.
        </p>
        <h4>5. Quels sont les éléments clés d'un post réussi ? </h4>
        <p>
          Un post réussi comporte un titre accrocheur, un descriptif clair du
          projet, les bénéfices attendus, les risques identifiés, les personnes
          impactées et les experts impliqués. Assurez-vous également de
          respecter les règles de bienséance et de fournir des informations
          précises.
        </p>
        <h4>6. Puis-je modifier mon post une fois qu'il est publié ? </h4>
        <p>
          Oui, vous pouvez modifier votre post après sa publication. Cependant,
          assurez-vous de fournir une justification claire pour les
          modifications apportées.
        </p>
        <h4>7. Comment puis-je contribuer à un post existant ? </h4>
        <p>
          Vous pouvez contribuer à un post existant en ajoutant des commentaires
          constructifs, des suggestions ou en posant des questions. La
          contribution active est encouragée pour améliorer la qualité des
          projets proposés.
        </p>
        <h4>
          8. Puis-je proposer un projet en dehors du domaine de l'entreprise ?{" "}
        </h4>
        <p>
          Non, la plateforme Make_Sense est destinée uniquement aux projets
          internes de l'entreprise. Les projets proposés doivent être en rapport
          avec les activités de notre entreprise.
        </p>
        <h4>
          9. Que faire en cas de problème avec un autre utilisateur ou un post ?{" "}
        </h4>
        <p>
          Si vous rencontrez un problème avec un autre utilisateur ou un post,
          veuillez le signaler à l'administrateur de la plateforme. Nous
          prendrons les mesures appropriées pour résoudre le problème.
        </p>
        <h4>10. Les posts sont-ils soumis à une modération ?</h4>
        <p>
          Oui, les posts sont soumis à une modération pour garantir le respect
          des règles de bienséance et de conduite. Les contenus inappropriés ou
          hors-sujet peuvent être supprimés.
        </p>
        <p>
          N'hésitez pas à consulter cette FAQ chaque fois que vous avez des
          questions sur l'utilisation de Make_Sense. Si vous avez des
          interrogations supplémentaires, n'hésitez pas à contacter l'équipe de
          support ou les administrateurs de la plateforme. Nous sommes là pour
          vous aider et encourager votre participation active sur Make_Sense !{" "}
        </p>
      </li>
    </section>
  );
}
