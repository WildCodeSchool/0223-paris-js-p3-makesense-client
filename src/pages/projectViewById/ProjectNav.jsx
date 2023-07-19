import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ProjectDescription from "./ProjectDescription";
import ProjectInfluences from "./ProjectInfluences";
import ProjectAvis from "./ProjectAvis";
// import { getVoteFromUser, getPostFromUser } from "../../services/post";
export default function ProjectNav({ post }) {
  const [actif, setActif] = useState("projets");
  const [userPosts, setUserPosts] = useState([]);
  const [userVotes, setUserVotes] = useState([]);

  const toggleActif = (onglet) => {
    if (onglet !== actif) {
      setActif(onglet);
    }
  };
  const dataUser = async () => {
    try {
      //   const userPost = await getPostFromUser();
      //   const userVote = await getVoteFromUser();
      //   setUserPosts(userPost.data);
      //   setUserVotes(userVote?.data);
    } catch (err) {
      console.log("err", err);
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
          Avis(4)
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
        <ProjectInfluences />
      </div>
      <div
        className={`contenu ${actif === "avis" ? "actif" : ""}`}
        onClick={() => toggleActif("avis")}
      >
        <ProjectAvis />
      </div>
    </div>
  );
}

ProjectNav.propTypes = {
  post: PropTypes.shape({}).isRequired,
};
