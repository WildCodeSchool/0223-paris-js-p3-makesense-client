import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import ProjectDescription from "./ProjectDescription";
import ProjectInfluences from "./ProjectInfluences";
import ProjectAvis from "./ProjectAvis";
import { getAllAvis } from "../../services/avis";

export default function ProjectNav({ post }) {
  const [actif, setActif] = useState("description");
  const [postAvis, setPostAvis] = useState([]);
  const { id } = useParams();

  const toggleActif = (onglet) => {
    if (onglet !== actif) {
      setActif(onglet);
    }
  };
  const dataUser = async () => {
    try {
      const getpostAvis = await getAllAvis(id);
      setPostAvis(getpostAvis?.data);
    } catch (err) {
      console.error("err", err);
    }
  };

  useEffect(() => {
    dataUser();
  }, []);

  return (
    <div id="container">
      <ul className="onglets">
        <li
          className={`onglet ${actif === "description" ? "actif" : ""}`}
          onClick={() => toggleActif("description")}
        >
          Description
        </li>
        <li
          className={`onglet ${actif === "influences" ? "actif" : ""}`}
          onClick={() => toggleActif("influences")}
        >
          Influences
        </li>
        <li
          className={`onglet ${actif === "avis" ? "actif" : ""}`}
          onClick={() => toggleActif("avis")}
        >
          Avis({postAvis?.length})
        </li>
      </ul>
      <div
        className={`contenu ${actif === "description" ? "actif" : ""}`}
        onClick={() => toggleActif("description")}
      >
        <ProjectDescription post={post} />
      </div>
      <div
        className={`contenu ${actif === "influences" ? "actif" : ""}`}
        onClick={() => toggleActif("influences")}
      >
        <ProjectInfluences post={post} />
      </div>
      <div
        className={`contenu ${actif === "avis" ? "actif" : ""}`}
        onClick={() => toggleActif("avis")}
      >
        <ProjectAvis avis={postAvis} />
      </div>
    </div>
  );
}

ProjectNav.propTypes = {
  post: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    photo: PropTypes.string,
    text: PropTypes.string,
    map: PropTypes.func,
    description: PropTypes.string,
    profit: PropTypes.string,
    risk: PropTypes.string,
  }).isRequired,
};
