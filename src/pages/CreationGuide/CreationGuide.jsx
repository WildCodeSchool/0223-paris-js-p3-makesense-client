import ScrollingGuide from "../../components/ScrollingGuide/ScrollingGuide";

export default function CreationGuide() {
  return (
    <>
      <article>
        <div className="articleText">
          <h2 className="c-blue">Guide de création</h2>
          <p className="c-blue">
            Vous trouverez ci-dessous l’ensemble des ressources pour vous
            accompagner au mieux dans la création d’un nouveau projet !
          </p>
        </div>
        <hr />
      </article>
      <ScrollingGuide />
    </>
  );
}
