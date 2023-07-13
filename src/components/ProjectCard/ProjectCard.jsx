import { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "../../assets/default_user.png";
import Background from "../../assets/default_background_project.jpg";

export default function ProjectCard() {
  const [posts, setPosts] = useState([]);
  console.log(posts, "les posts");

  useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <>
      <figure>
        <img src={Background} className="backgroundProject" alt="projet" />
        <figcaption>
          <h3 className="c-blue ">Mon super Titre</h3>
          <div className="tagsProject">
            <p className="tag-blue">tag n°1</p>
            <p className="tag-red">tag n°2</p>
          </div>
          <div className="userInfosDate">
            <div className="userProjectInfos">
              <img
                src={Avatar}
                alt="profil utilisateur"
                className="avatarProject"
              />
              <p className="c-blue ">
                par<span className="c-blue "> Prénom Nom</span>
              </p>
            </div>
            <div className="calendar">
              <strong>7</strong>
            </div>
          </div>
        </figcaption>
      </figure>
    </>
  );
}
