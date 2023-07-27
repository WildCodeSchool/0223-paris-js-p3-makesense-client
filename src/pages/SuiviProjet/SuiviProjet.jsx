import React, { useState, useEffect } from "react";
import { getVoteFromUser, getPostFromUser } from "../../services/post";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import ProjectViewById from "../projectViewById/projectViewById";

function SuiviProjet() {
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
      const userPost = await getPostFromUser();
      const userVote = await getVoteFromUser();
      console.log("userPost", userPost);
      console.log("userVote", userVote);
      setUserPosts(userPost.data);
      setUserVotes(userVote?.data);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    dataUser();
  }, []);

  return (
    <>
      <section id="headersuiviprojet">
        <h1>Suivi de Projet</h1>
        <img
          className="imgheader"
          src="../../assets/pills/Pills_desktop_project_guide.png"
          alt=""
        />
      </section>
      <div id="container">
        <div className="onglets">
          <div
            className={`onglet ${actif === "projets" ? "actif" : ""}`}
            onClick={() => toggleActif("projets")}
          >
            Mes projets
          </div>
          <div
            className={`onglet ${actif === "votes" ? "actif" : ""}`}
            onClick={() => toggleActif("votes")}
          >
            Mes votes
          </div>
        </div>
        <div
        className={`contenu ${actif === "projets" ? "actif" : ""}`}
        onClick={() => toggleActif("projets")}
      >
       
        <ul className="fetchPosts">
          {userPosts.map((data) => (
            <ProjectCard post={data} key={data.id} />
          ))}
        </ul>
      </div>
      <div
        className={`contenu ${actif === "votes" ? "actif" : ""}`}
        onClick={() => toggleActif("votes")}
      >
        
        <ul className="fetchPosts">
          {userVotes.map((post) => (
            <ProjectCard post={post} key={post.id} />
          ))}
        </ul> 
      </div>
      </div>
    </>
  );
}

export default SuiviProjet;
