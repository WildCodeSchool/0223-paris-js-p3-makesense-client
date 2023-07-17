import React, { useState, useEffect } from "react";
import axios from "axios";

function SuiviProjet() {
    const [actif, setActif] = useState("projets");
    const [userPosts, setUserPosts] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
      const authenticatedUserId = async () => {
        try {
          const response = await axios.get('/api/user/:id');
          setUserId(response.data.id);
        } catch (error) {
          console.error(error);
        }
      };

      authenticatedUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchUserPosts = async () => {
        try {
          const response = await axios.get(`/api/posts?userId=${userId}`);
          setUserPosts(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchUserPosts();
    }
  }, [userId]);

  const toggleActif = (onglet) => {
    if (onglet !== actif) {
      setActif(onglet);
    }
  };

  return (
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
        <p className="containprojet">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus
          aliquam enim asperiores, eum sequi nemo placeat, est distinctio,
          dignissimos recusandae molestias delectus saepe exercitationem
          similique minima eius repudiandae nulla modi?
        </p>
        {userPosts.map((post) => (
        <div key={post?.id}>
          <h2>{post?.title}</h2>
          <p>{post?.description}</p>
          <img src={post?.user_id} alt="Avatar de l'utilisateur" />
          <p>{post?.user_id}</p>
        </div>
      ))}
      </div>
      <div
        className={`contenu ${actif === "votes" ? "actif" : ""}`}
        onClick={() => toggleActif("votes")}
      >
        <p className="containprojet">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
          ratione numquam distinctio temporibus molestias eius! Sed error
          distinctio provident? Natus beatae libero dolores assumenda aliquam
          dignissimos animi similique, incidunt corporis.
        </p>
      </div>
    </div>
  );
};

export default SuiviProjet;
