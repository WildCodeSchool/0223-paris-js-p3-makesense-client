import ScrollingGuide from "../../components/ScrollingGuide/ScrollingGuide";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { useSelector } from "react-redux";

export default function CreationGuide() {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.user) {
      navigate("/login");
    }
  }, []);
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
